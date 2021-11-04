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

  }


export default new CourseService();
