const mongoose = require('mongoose');
const Quiz = require('../models/QuizModel');
const QuizAttempt = require('../models/QuizAttemptModel');
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
  
    static async updateQuizQuestions(quizId, questions, callback = (status, payload) => { }) {
        const validationErrors = [];
        quizId ? null : validationErrors.push("quizId cannot be empty");

        if (validationErrors.length == 0) {
            try {
                const {
                    allValid,
                    questionsArray,
                    quizMarks
                } = QuizService.checkQuestionsValidity(questions);

                if (allValid) {
                    const originalQuiz = await Quiz.findOne()
                        .where("_id", quizId)
                        .exec();

                    originalQuiz.questions = questionsArray;
                    originalQuiz.quizMarks = quizMarks;

                    originalQuiz.save()
                        .then(doc => {
                            callback(200, {
                                "message": `Quiz ID ${doc._id} was successfully updated`
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
            console.error(error);
            callback(400, {
                "errors": validationErrors
            });
        }
    }
  
    static async markQuiz(quizId, questions, username, callback = (status, payload) => { }) {
        const validationErrors = [];
        quizId ? null : validationErrors.push("quizId cannot be empty");
        username ? null : validationErrors.push("username cannot be empty");


        if (validationErrors.length == 0) {
            try {
                const {
                    allValid,
                    questionsArray
                } = QuizService.checkLearnerAnswerValidity(questions);

                if (allValid) {
                    const modelQnAObj = await Quiz.findOne()
                        .where("_id", quizId)
                        .select({
                            "questions": true
                        })
                        .exec();

                    let answerKey = {};

                    for (const question of modelQnAObj.questions) {
                        answerKey[question._id] = {
                            "answers": question.correctAnswers,
                            "marks": question.questionMarks
                        };
                    }

                    const marking = [];
                    let totalMarks = 0;

                    for (const question of questionsArray) {
                        const answers = answerKey[question.questionId].answers;
                        const markedAnswerArray = [];
                        let correctAnsCount = 0;

                        for (const learnerAnswer of question.answers) {
                            // Students should know which questions they got wrong.
                            // So new field of correct/wrong should be created
                            const markedAnswer = {
                                "answer": learnerAnswer,
                                "isCorrect": answers.includes(learnerAnswer)
                            };

                            correctAnsCount += answers.includes(learnerAnswer) ? 1 : 0;
                            markedAnswerArray.push(markedAnswer);
                        }

                        // All marks or nothing
                        const marksAwarded = correctAnsCount == answers.length ? answerKey[question.questionId].marks : 0;
                        totalMarks += marksAwarded;

                        question["marksAwarded"] = marksAwarded;
                        question["answers"] = markedAnswerArray;
                        marking.push(question);
                    }

                    const markedQuizDetails = {
                        "quizId": quizId,
                        "learner": username,
                        "marksAwarded": totalMarks,
                        "questions": questionsArray
                    };

                    const newQuizAttempt = new QuizAttempt(markedQuizDetails)
                    newQuizAttempt.save()
                        .then(doc => {
                            callback(200, {
                                "message": `Quiz Attempt ID ${doc._id} was successfully created`
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
                        "errors": "There are invalid answers in the list. Please validate the following questions that has issues and submit the quiz again.",
                        "questions": questionsArray
                    });
                }

            } catch (error) {
                console.error(error);
                callback(500, {
                    "errors": error.message
                });
            }
        } else {
            console.error(error);
            callback(400, {
                "errors": validationErrors
            });
        }
    }

    static async getQuizQuestions(quizId, getCorrectAns, callback = (status, payload) => {}) {
        const validationErrors = [];
        quizId ? null : validationErrors.push("quizId cannot be empty");
        
        if (validationErrors.length == 0){
            try {
                const selectParams = {
                    "_id": false
                };
                
                if (!getCorrectAns) {
                    selectParams["questions.correctAnswers"] = false
                }
                
                await Quiz.findOne()
                    .where("_id", quizId)
                    .select(selectParams)
                    .exec()
                    .then( record => {
                        callback(200, {
                            "quiz": record.toObject(),
                        })
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