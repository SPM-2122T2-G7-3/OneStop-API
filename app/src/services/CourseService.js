import http from "../http-common";

class CourseService {

    getAllCourses(){
      return http.get('/course/all')
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
  }


export default new CourseService();
