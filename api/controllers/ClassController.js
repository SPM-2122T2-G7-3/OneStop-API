const mongoose = require('mongoose');
const ClassRun = require('../models/ClassModel');
const Course = require('../models/CourseModel');

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

    
    static async approveSelfEnrollment(classId, username, callback = (status, payload) => {}) {
        const validationErrors = [];
        username ? null : validationErrors.push("username cannot be empty");
        classId ? null : validationErrors.push("classId cannot be empty");
        
        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();

                const learner = classRun.learners.find(learner => learner.username == username);
                learner.enrolled = true;
                classRun.save()
                    .then(doc => {
                        callback(200, {
                            "message": `Learner ${username} was successfully approved for course ${doc._id}`
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
    
    
    static async getTrainerInClass(classId, callback = (status, payload) => {}) {
      const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        
        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();

                callback(200, {
       "trainers": classRun.trainers
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
  
  
    static async getLearnerInClass(classId, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        
        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();

                callback(200, {
                    "learners": classRun.learners
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
    
    
    static async applyToClass(classId, username, callback = (status, payload) => {}) {
        const validationErrors = [];
        username ? null : validationErrors.push("username cannot be empty");
        classId ? null : validationErrors.push("classId cannot be empty");
        
        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();

                const currentLearners = classRun.learners;
                const newLearner = {
                    username: username,
                    enrolled: false
                };
                
                currentLearners.push(newLearner);
                
                classRun.save()
                    .then(doc => {
                        callback(200, {
                            "message": `Learner ${username} was successfully applied for course ${doc._id}`
                        })
                    });
            } catch (error) {
                callback(500, {
                    "error": error.message
                });
            }
        }
    }
    
  
    static async createNewClass(courseCode, startDateString, endDateString, capacity, callback = (status, payload) => {}) {
        const validationErrors = [];
        courseCode ? null : validationErrors.push("courseId cannot be empty");
        startDateString ? null : validationErrors.push("startDate cannot be empty");
        Date.parse(startDateString) ? null : validationErrors.push("startDate is not a valid date");
        endDateString ? null : validationErrors.push("endDate cannot be empty");
        Date.parse(endDateString) ? null : validationErrors.push("endDate is not a valid date");
        capacity ? null : validationErrors.push("capacity cannot be empty");

        if (validationErrors.length == 0) {
            try {
                const courseDetails = await Course.findOne()
                    .where("courseCode", courseCode)
                    .exec();

                const startDate = new Date(startDateString);
                const endDate = new Date(endDateString);

                // Considering that endDate is likely suppose to be 2359, we will set the endDate to the next day 0000
                endDate.setDate(endDate.getDate() + 1);

                const classDetails = {
                    course: courseDetails,
                    startDate: startDate,
                    endDate: endDate,
                    capacity: capacity,
                    trainers: [],
                    learners: [],
                    content: []
                };

                const newClass = new ClassRun(classDetails);

                newClass.save()
                    .then(doc => {
                        callback(200, {
                            "isSuccess": true,
                            "documentId": doc._id,
                            "message": `Class ID ${doc._id} was successfully created`
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
             
             
    static async getApplicants(classId, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        
        if (validationErrors.length == 0) {
            try {

                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .exec();
                    
                const applicants = classRun.learners.filter(learner => learner.enrolled == false);

                callback(200, {
                    "applicants": applicants
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
    
    
    static async uploadLinks(classId, chapterId, sectionId, links, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        chapterId ? null : validationErrors.push("chapterId cannot be empty");
        sectionId ? null : validationErrors.push("sectionId cannot be empty");
        links.length ? null : validationErrors.push("links cannot be empty");
        
        if (validationErrors.length == 0) {
            try {
                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .where("chapters._id", chapterId)
                    .where("chapters.sections._id", sectionId)
                    .exec();
                
                
                const section = classRun.chapters[0].sections[0];
                section.links = links;
                
                classRun.save()
                    .then(doc => {
                        callback(200, {
                            "message": `Links successfully uploaded for section ${sectionId} of class ${classId}`
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
    
    
    static async uploadContent(classId, chapterId, sectionId, fileInfo, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        chapterId ? null : validationErrors.push("chapterId cannot be empty");
        sectionId ? null : validationErrors.push("sectionId cannot be empty");
        fileInfo ? null : validationErrors.push("fileInfo cannot be empty");
        
        if (validationErrors.length == 0) {
            try {
                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .where("chapters._id", chapterId)
                    .where("chapters.sections._id", sectionId)
                    .exec();
                
                
                const section = classRun.chapters[0].sections[0];
                console.log(typeof(fileInfo))
                section.files.push(fileInfo);
                
                classRun.save()
                    .then(doc => {
                        callback(200, {
                            "message": `File ${fileInfo.filename} successfully uploaded for section ${sectionId} of class ${classId}`
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
    
    
    static async getContent(classId, chapterId, sectionId, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        chapterId ? null : validationErrors.push("chapterId cannot be empty");
        sectionId ? null : validationErrors.push("sectionId cannot be empty");
      
      if (validationErrors.length == 0) {
            try {
                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .where("chapters._id", chapterId)
                .where("chapters.sections._id", sectionId)
                    .exec();
                
                
                const section = classRun.chapters[0].sections[0];
                callback(200, {
                    "files": section.files,
                    "hyperlinks": section.hyperlinks
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


    static async newSection(classId, chapterId, sectionTitle, callback = (status, payload) => {}) {
        const validationErrors = [];
        classId ? null : validationErrors.push("classId cannot be empty");
        chapterId ? null : validationErrors.push("chapterId cannot be empty");
        sectionTitle ? null : validationErrors.push("sectionTitle cannot be empty");
      
      if (validationErrors.length == 0) {
            try {
                const classRun = await ClassRun.findOne()
                    .where("_id", classId)
                    .where("chapters._id", chapterId)
                  .exec();
                
                const section = {
                    sectionTitle: sectionTitle,
                    hyperlinks: [],
                    files: []
                };
                
                classRun.chapters[0].sections.push(section);
                
                classRun.save()
                    .then(doc => {
                        callback(200, {
                            "message": `Section ${sectionTitle} successfully created for chapter ${chapterId} of class ${classId}`
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

module.exports = ClassController;