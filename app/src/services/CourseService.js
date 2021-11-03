import http from "../http-common";

class CourseService {

    getAllCourses(){
      return http.get('/course/all')
  
    }

    addNewCourse(data){
      return http.post('/course/new', data)

    }
  }


export default new CourseService();
