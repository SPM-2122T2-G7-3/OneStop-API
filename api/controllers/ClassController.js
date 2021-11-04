const mongoose = require('mongoose');
const ClassRun = require('../models/ClassModel');

class ClassController {
    static async updateClassTrainers(classId, trainers, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        trainers.length ? null : validationErrors.push("trainers cannot be empty");

        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();

                classRun.trainers = trainers;
                classRun.save()
                    .then(doc => {
                        callback(200, {
                            "message": `Trainers for course ${doc._id} was successfully updated`
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


    static async updateClassLearners(classId, learners, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        learners.length ? null : validationErrors.push("learners cannot be empty");

        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();
                    
                const pendingApproval = classRun.learners.find(learners => learners.enrolled == false);
                learners.concat(pendingApproval);

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