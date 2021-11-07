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

    applyToClass(classId, username){
      return http.post(`/class/${classId}/apply`, {}, { headers: { username: username } })
    }

    getClassInfo(classId){
      return http.get(`/class/${classId}/info`)
    }
      
    getSelfEnrollApplicants(classId){
      return http.get(`/class/${classId}/applicants`)
    }

    approveSelfEnroll(data, adminUsername){
      return http.put(`/class/approve`, data, { headers: { username: adminUsername } })
    }

  }


export default new ClassService();