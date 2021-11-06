const express = require('express');
const router = express.Router();

const CourseController = require("../controllers/CourseController");
const UserService = require("../services/UserService")


router.post("/new", (req, res, next) => {
    const {
        courseCode,
        courseTitle,
        preReq
    } = req.body;
    
    CourseController.createCourse(courseCode, courseTitle, preReq, (status, payload) => {
        res.status(status).json(payload);
    });
});


module.exports = router;