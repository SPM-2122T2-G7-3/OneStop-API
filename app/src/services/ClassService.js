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

    getTeachingClasses(username){
      return http.get('/class/teach', { headers: { username: username } })
    }

    getEnrolledClass(username){
      return http.get(`/class/enrolled/`, { headers: { username: username } })
    }

    getClassContent(classId){
      return http.get(`/class/${classId}/contents`,)

    }

    getQuizQuestions(classId){
      return http.get(`/class/${classId}/quizzes`,)

    }

    addNewChapter(classId, chapterTitle){
      return http.post(`/class/${classId}/chapter/new`, {chapterTitle: chapterTitle})

    }

    addNewSection(classId, chapterId, sectionTitle){
      return http.post(`/class/${classId}/${chapterId}/section/new`, {sectionTitle: sectionTitle})

    }

    addNewLinks(classId, chapterId, sectionId, links){
      return http.put(`/class/${classId}/${chapterId}/${sectionId}/upload/links`, links)

    }

    addNewFile(classId, chapterId, sectionId, FormData){
      return http.post(`/class/${classId}/${chapterId}/${sectionId}/upload/file`, FormData, { headers: { 'Content-Type': 'multipart/form-data' } })

    }


  }


export default new ClassService();