import http from "../http-common";

class ClassService {

    updateClassLearners(classId, learners){

      return http.put(`/class/${classId}/learners`, learners )
    }
  }


export default new ClassService();