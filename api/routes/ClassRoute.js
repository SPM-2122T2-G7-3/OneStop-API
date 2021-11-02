const express = require('express');
const router = express.Router();

const ClassController = require('../controllers/ClassController');


router.put('/:classId/learners', (req, res, next) => {
    const classId = req.params.classId;
    const {
        learners
    } = req.body;

    ClassController.updateClassLearners(classId, learners, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.put('/:classId/trainers', (req, res, next) => {
    const classId = req.params.classId;
    const {
        trainers
    } = req.body;

    ClassController.updateClassTrainers(classId, trainers, (status, payload) => {
        res.status(status).json(payload);
    });
});

module.exports = router;