const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
    answer: String,
    isCorrect: Boolean
}, { _id: false });


const markedQuestionSchema = new mongoose.Schema({
    questionId: mongoose.Schema.Types.ObjectId,
    markedAwarded: Number,
    answers: [ answerSchema ]
}, { _id: false });


const attemptSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    learner: String,
    marksAwarded: Number,
    passed: Boolean,
    questions: [ markedQuestionSchema ]
})


module.exports = mongoose.model("QuizAttempt", attemptSchema);