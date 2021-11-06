const Course = require('../models/CourseModel');


class CourseController {
    static async createCourse(courseCode, courseTitle, preReq, callback = (status, payload) => {}) {
        const validationErrors = [];
        courseCode ? null : validationErrors.push("courseId cannot be empty");
        courseTitle ? null : validationErrors.push("courseTitle cannot be empty");

        
        if (validationErrors.length == 0) {
            try {
                const courseDetails = {
                    courseCode: courseCode,
                    courseTitle: courseTitle,
                    preReq: preReq
                }

                const newCourse = new Course(courseDetails);

                newCourse.save()
                    .then(doc => {
                        callback(200, {
                            "isSuccess": true,
                            "documentId": doc._id,
                            "message": `Course ID ${doc._id} was successfully created`
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        callback(500, {
                            "errors": err.message
                        });
                    });
            } catch (error) {
                console.error(error);
                callback(500, {
                    "error": error.message
                });
            }
        } else {
            callback(400, {
                "errors": validationErrors
            });
        }
    }
    
    
}

module.exports = CourseController;