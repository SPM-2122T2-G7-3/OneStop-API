const express = require('express');
const router = express.Router();

const ClassController = require('../controllers/ClassController');
const UserService = require('../services/UserService');

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


router.put('/approve', UserService.allowAdmin, (req, res, next) => {
    const {
        username, 
        classId
    } = req.body;
    
    ClassController.approveSelfEnrollment(classId, username, (status, payload) => {
        res.status(status).json(payload);
    })
});


module.exports = router;