const express = require('express');
const router = express.Router();

const QuizController = require('../controllers/QuizController');


// Create Quiz for a given course and section
router.post('/new', (req, res, next) => {
    const {
        courseCode,
        section,
        quizName,
        questions
    } = req.body;
    
    const quizJSON = {
        "quizName": quizName,
        "questions": questions,
    };
    
    QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
        res.status(status).json(payload);
    });
});


module.exports = router;