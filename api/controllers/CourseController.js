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


    static async updateCourseInfo(oldCourseCode, newCourseCode, courseTitle, callback = (status, payload) => {}) {
        const validationErrors = [];
        oldCourseCode ? null : validationErrors.push("oldCourseCode cannot be empty");
        newCourseCode ? null : validationErrors.push("newCourseCode cannot be empty");
        courseTitle ? null : validationErrors.push("courseTitle cannot be empty");

        if (validationErrors.length == 0) {
            try {

                const course = await Course.findOne()
                    .where("courseCode", oldCourseCode)
                    .exec();

                course.courseCode = newCourseCode;
                course.courseTitle = courseTitle;

                course.save()
                    .then(doc => {
                        callback(200, {
                            "message": `Course ${doc._id} was successfully updated`
                        })
                    });
            } catch (error) {
                console.error(error)
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