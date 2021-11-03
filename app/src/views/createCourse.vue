<template>
  <div id="newCourse">
    <h2>Course Creation</h2>
    <div class="container mt-5">
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Course Code</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="startDate" placeholder="Course Code" v-model="courseCode">
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Course Title</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="startDate" placeholder="Course Title" v-model="courseTitle">
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Pre Requisite Courses</h4> Please hold the CTRL button to select multiple options</div>
        <div class='col-sm-8' style='padding-top:5px'>
            <select class="form-select" v-model="preReq" multiple>
                <option v-for="(course) in this.courses" :key='course' :value="course._id">{{course.courseCode}} - {{course.courseTitle}}</option>
            </select>
        </div>
      </div>
      <div class="mb-3 mt-3 text-center">              
        <button type="button" class="btn btn-secondary" @click="this.createCourse()">Create Course!</button>
      </div>

    </div>
  </div>
</template>

<script>
import CourseService from '../services/CourseService'


export default {
  data(){
    return{
        courses: [],
        courseCode: '',
        courseTitle: '',
        preReqInput: '',
        preReq: [],
    }
  }, 
  methods: {
    getAllCourses(){
      CourseService.getAllCourses()
        .then(response => {
            this.courses = response.data.courses
        }
      )
    },
    createCourse(){
        var payload = {
            "courseCode": this.courseCode,
            "courseTitle": this.courseTitle,
            "preReq": this.preReq,
        }
        CourseService.addNewCourse(payload)
            .then(response => {
                if (response.data.isSuccess){
                    alert("Course Successfully created!")
                }
            })
            .catch(error =>{
                alert(error)
            })

    }
    

  },
  created: function(){
      this.getAllCourses()


  }

}
</script>

<style scoped>
h2 {
  margin: 35px;
  text-align: center;
}

h3 {
  margin-left: 60px;
  margin-bottom: 35px;
}
</style>