import http from "../http-common";

class ClassService {

    updateClassLearners(classId, learners){

      return http.put(`/class/${classId}/learners`, learners )
    }

    updateClassTrainers(classId, trainers){

      return http.put(`/class/${classId}/trainers`, trainers)
    }
  }


export default new ClassService();