const Course = require('../models/CourseModel');
const ClassRun = require('../models/ClassModel');


class CourseService {
    static async getClassesByCourse(courseCode) {
        let success = true;
        try {
            const findCourse = await Course.findOne()
            .where("courseCode", courseCode)
            .select({
                "id": true
            })
            .exec();
            
            const relatedClasses = await ClassRun.find()
            .where("course", findCourse.id)
            .exec();
            
            const result = {
                "classes": []
            };
            for (const classRun of relatedClasses) {
                result.classes.push(classRun.id);
            }
            
            return {
                success,
                result
            };            
        } catch (error) {
            console.error(error);
            const result = {
                "error": error.message
            }
            
            success = false;
            
            return {
                success, 
                result
            };
        }
    }
}


module.exports = CourseService;
