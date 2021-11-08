import http from "../http-common";

class CourseService {

    getAllCourses(){
      return http.get('/course/')
    }

    addNewCourse(data){
      return http.post('/course/new', data)
    }

    getClassesByCourse(courseCode){
      return http.get(`/course/${courseCode}/classes`)
    }
  
    getEligibleCourse(username){
      return http.get('/course/eligible', { headers: { 'username': username } })
    }

    retrieveContent(filename){
      return http.get(`/file/${filename}`, {responseType: 'blob'})
    }

    getCourseInfo(courseCode){
      return http.get(`/course/${courseCode}/info`)
    }

  }


export default new CourseService();
