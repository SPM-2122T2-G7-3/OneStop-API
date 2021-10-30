const mongoose = require('mongoose');
const Quiz = require('../models/QuizModel');
const QuizAttempt = require('../models/QuizAttemptModel');

class QuizService {
    static checkQuestionsValidity(questions) {
        let allValid = false;
        let validQuestions = [];
        let invalidQuestions = [];

        let quizMarks = 0;

        for (const question of questions) {
            const questionDetails = {
                "questionText": question.questionText,
                "questionType": question.questionType,
                "questionMarks": question.hasOwnProperty("questionMarks") ? question.questionMarks : 1
            };

            if (question.questionType) {
                let questionValid = false;
                switch (question.questionType) {
                    case "TF":
                        questionDetails["answerOptions"] = ["True", "False"];
                        questionDetails["correctAnswers"] = question.correctAnswers[0];
                        questionValid = this.checkTrueFalseAnswer(question.correctAnswers[0]);
                        questionValid ? validQuestions.push(questionDetails) : invalidQuestions.push(question);
                        allValid = questionValid;
                        break;
                    case "MCQ":
                        questionDetails["answerOptions"] = question.answerOptions;
                        questionDetails["correctAnswers"] = question.correctAnswers;
                        questionValid = this.checkMCQAnswer(question.answerOptions, question.correctAnswers);
                        questionValid ? validQuestions.push(questionDetails) : invalidQuestions.push(question);
                        allValid = questionValid;
                        break;
                    default:
                        invalidQuestions.push(question);
                        allValid = false;
                }

                quizMarks += questionValid ? questionDetails.questionMarks : 0;
            }
        }
        
        const questionsArray = allValid ? validQuestions : invalidQuestions;
        return {
            allValid,
            questionsArray,
            quizMarks
        };
    }
    
    static checkTrueFalseAnswer(correctAnswer){
        const standardAns = ["True", "False"];
        return standardAns.includes(correctAnswer);
    }
    
    
    static checkMCQAnswer(answerOptions, correctAnswers){
        for (const answer of correctAnswers){
            if (!answerOptions.includes(answer)){
                return false;
            }
        }
        return true;
    }


    static checkLearnerAnswerValidity(questions) {
        let allValid = true;
        let validQuestions = [];
        let invalidQuestions = [];
        
        for (const question of questions) {
            if (question.hasOwnProperty("questionId") && question.hasOwnProperty('answers')) {
                let answerNoIssue = question.answers.length > 0;
                
                for (const answer in question.answers) {
                    answerNoIssue = answerNoIssue && answer;
                }
                
                if (question.questionId && answerNoIssue) {
                    validQuestions.push(question);
                } else {
                    allValid = false;
                    invalidQuestions.push(question);
                }
            }
        }
        
        const questionsArray = allValid ? validQuestions : invalidQuestions;
        return {
            allValid,
            questionsArray
        };
    }
    
    
    static async markQuiz(quizId, username, questions) {
        const answerKey = await this.createAnswerKey(quizId);

        const marking = [];
        let totalMarks = 0;

        for (const question of questions) {
            const markedQuestion = this.markOneQuestion(answerKey, question);
            totalMarks += markedQuestion.marksAwarded;
            marking.push(markedQuestion);
        }

        const markedQuizDetails = {
            "quizId": quizId,
            "learner": username,
            "marksAwarded": totalMarks,
            "questions": questions
        };

        const newQuizAttempt = new QuizAttempt(markedQuizDetails)
        const savedAttempt = await newQuizAttempt.save();
        
        const result = {
            "success": savedAttempt._id ? true : false
        }
        
        if (result.success) {
            result["attemptId"] = savedAttempt._id;
        } else {
            result["error"] = savedAttempt;
        }
        
        return result;
    }
    
    
    static async createAnswerKey(quizId) {
        const modelQnA = await Quiz.findOne()
            .where("_id", quizId)
            .select({
                "questions": true
            })
            .exec();
        
        const answerKey = {};

        for (const question of modelQnA.questions) {
            answerKey[question._id] = {
                "answers": question.correctAnswers,
                "marks": question.questionMarks
            };
        }
        
        return answerKey;
    }
    
    
    static markOneQuestion(answerKey, question) {
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

        question["marksAwarded"] = marksAwarded;
        question["answers"] = markedAnswerArray;
        return question;
    }
    
    
}

module.exports = QuizService;