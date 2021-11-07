const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    questionText: String,
    questionType: String,
    questionMarks: Number,
    answerOptions: [String],
    correctAnswers: [String]
});


const quizSchema = new mongoose.Schema({
    courseCode: String,
    section: Number,
    quizName: String,
    timeAllowed: Number,
    quizMarks: Number,
    questions: [questionSchema]
});


module.exports = mongoose.model("Quiz", quizSchema);