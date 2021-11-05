import http from "../http-common";

class ClassService {

    updateClassLearners(classId, learners){

      return http.put(`/class/${classId}/learners`, learners )
    }

    updateClassTrainers(classId, trainers){

      return http.put(`/class/${classId}/trainers`, trainers)
    }

    addNewClass(data){
      return http.post('/class/new', data)
  
    }
    
    getLearnerInClass(classId){
      return http.get(`/class/${classId}/learners`)
    }

    getTrainerInClass(classId){
      return http.get(`/class/${classId}/trainers`)
    }
  }


export default new ClassService();