const mongoose = require('mongoose');
const Quiz = require('../models/QuizModel');
const QuizService = require('../services/QuizService');


class QuizController {
    static async createQuizBySection(courseCode, section, quizJSON, callback = (status, payload) => { }) {
        const {
            quizName,
            questions,
            timeAllowed
        } = quizJSON;

        const validationErrors = [];
        courseCode ? null : validationErrors.push("courseId cannot be empty");
        section ? null : validationErrors.push("sectionId cannot be empty");
        quizName ? null : validationErrors.push("quizName cannot be empty");

        if (validationErrors.length == 0) {
            try {
                const {
                    allValid,
                    questionsArray,
                    quizMarks
                } = QuizService.checkQuestionsValidity(questions);


                if (allValid) {
                    const quizDetails = {
                        courseCode: courseCode,
                        section: section,
                        questions: questionsArray,
                        quizMarks: quizMarks,
                        timeAllowed: timeAllowed ? timeAllowed : 0, // If timeAllowed is not set, implicit no limit and hence 0.
                        quizMarks: quizMarks
                    };

                    const newQuiz = new Quiz(quizDetails);

                    newQuiz.save()
                        .then(doc => {
                            callback(200, {
                                "isSuccess": true,
                                "documentId": doc._id,
                                "message": `Quiz ID ${doc._id} was successfully created`
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            callback(500, {
                                "errors": err.message
                            });
                        });
                } else {
                    callback(400, {
                        "errors": "There are invalid questions in the list. Please validate the following questions that has issues.",
                        "questions": questionsArray
                    });
                }
            } catch (error) {
                console.error(error);
                callback(500, {
                    "error": error.message
                });
            }
        } else {
            callback(400, {
                "errors": validationErrors
            });
        }
    }
    
    
    static async deleteQuiz(quizId, callback = (status, payload) => {}) {
        const validationErrors = [];
        quizId ? null : validationErrors.push("quizId cannot be empty");
        if (validationErrors.length == 0) {
            try {
                await Quiz.deleteOne()
                    .where("_id", quizId)
                    .exec()
                    .then(ok => {
                        if (ok) {
                            callback(200, {
                                "message": `Quiz ${quizId} deleted successfully`
                            });
                        }
                    });
            } catch (error) {
                callback(500, {
                    "error": error.message
                });
            }
        } else {
            callback(400, {
                "errors": validationErrors
            });
        }
    }
}

module.exports = QuizController;