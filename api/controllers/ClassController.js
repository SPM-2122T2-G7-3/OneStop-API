const mongoose = require('mongoose');
const ClassRun = require('../models/ClassModel');

class ClassController {
    static async updateClassLearners(classId, learners, callback = (status, payload) => { }) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        learners.length ? null : validationErrors.push("learners cannot be empty");

        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();

                classRun.learners = learners;
                classRun.save()
                    .then(doc => {
                        callback(200, {
                            "message": `Learners for course ${doc._id} was successfully updated`
                        })
                    });

            } catch (error) {
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

module.exports = ClassController;
