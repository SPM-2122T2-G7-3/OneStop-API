const express = require('express');
const router = express.Router();

const ClassController = require('../controllers/ClassController');


router.put('/:classId/learners', (req, res, next) => {
    const classId = req.params.classId;
    const { learners } = req.body;
    
    ClassController.updateClassLearners(classId, learners, (status, payload) => {
        res.status(status).json(payload);
    });
});


module.exports = router;