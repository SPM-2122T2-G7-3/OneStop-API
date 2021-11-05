    static async getEligibleCourse(username, callback = (status, payload) => {}) {
        const validationErrors = [];
        username ? null : validationErrors.push("username cannot be empty");
        
        if (validationErrors.length == 0) {
            try {
                const currentUser = await User.findOne()
                .where("username", username)
                .select({
                    "completedCourse": true
                })
                .exec();
                
                const allEligibleCourses = new Set();
                
                for (const course of currentUser.completedCourse) {
                    const courseId = course.toString();
                    
                    const eligibleCourses = await Course.find()
                    .where("preReq", courseId)
                    .select({
                        "_id": true
                    })
                    .exec();
                    
                    for(const eligible of eligibleCourses) {
                        allEligibleCourses.add(eligible.id);
                    }
                }
                
                const noReqCourses = await Course.find()
                .where("preReq")
                .size(0)
                .select({
                    "_id": true
                })
                .exec();
                
                for(const eligible of noReqCourses) {
                    allEligibleCourses.add(eligible.id);
                }
                
                
                for (const course of currentUser.completedCourse) {
                    const courseId = course.toString();
                    allEligibleCourses.delete(courseId);
                }
                
                callback(200, {
                    "eligibleCourses": Array.from(allEligibleCourses)
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
      


module.exports = CourseController;