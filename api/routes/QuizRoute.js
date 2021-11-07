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
    const quizId = req.params.quizId;

    QuizController.deleteQuiz(quizId, (status, payload) => {
        res.status(status).json(payload);
    });
});


// Update questions in a given quiz
router.put('/:quizId/questions', (req, res, next) => {
    const quizId = req.params.quizId;
    const {
        questions
    } = req.body;

    QuizController.updateQuizQuestions(quizId, questions, (status, payload) => {
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


// Get quiz questions given quizId without answers, for quiz attempts
router.get('/:quizId/attempt', (req, res, next) => {
    const quizId = req.params.quizId;

    QuizController.getQuizQuestions(quizId, false, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/attempt/:quizAttemptId', (req, res, next) => {
    const quizAttemptId = req.params.quizAttemptId;

    QuizController.getQuizAttempt(quizAttemptId, (status, payload) => {
        res.status(status).json(payload);
    });
})


module.exports = router;