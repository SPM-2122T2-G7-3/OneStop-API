const express = require('express');
const router = express.Router();

const QuizController = require('../controllers/QuizController');


// Create Quiz for a given course and section
router.post('/new', (req, res, next) => {
    const {
        courseCode,
        section,
        timeAllowed,
        quizName,
        questions
    } = req.body;
    
    const quizJSON = {
        "quizName": quizName,
        "questions": questions,
        "timeAllowed": timeAllowed
    };
    
    QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
        res.status(status).json(payload);
    });
});


// Delete quiz within a given course, section and quiz
router.delete('/:quizId', (req, res, next) => {
    const quizId   = req.params.quizId;
    
    QuizController.deleteQuiz(quizId, (status, payload) => {
        res.status(status).json(payload);
    });
});


// Submit quiz attempt for marking
router.post("/:quizId/submit", (req, res, next) => {
    const quizId = req.params.quizId;
    const {
        questions
    } = req.body;
    
    QuizController.markQuiz(quizId, questions, (status, payload) => {
        res.status(status).json(payload);
    });
});


module.exports = router;