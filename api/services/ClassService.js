const ClassRun = require('../models/ClassModel');


class ClassService {
    static async getClassInfo(classId) {
        let success = true;
        try {
            const oneClass = await ClassRun.findOne()
            .where("id", classId)
            .select({
                "trainers": false,
                "content": false,
                "id": false
            })
            .exec();
            
            const result = {
                "course": oneClass.course,
                "startDate": oneClass.startDate,
                "endDate": oneClass.endDate,
                "capacity": oneClass.capacity,
                "availableCapacity": oneClass.capacity - oneClass.learners.length
            };
            
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

module.exports = ClassService;