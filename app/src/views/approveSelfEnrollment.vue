<template>
  <div id='approvEnroll'>
      <div class="container mt-5">
          <div class="mb-3 text-center">
              <h1>Approve Self Enrolment Applications</h1>
              <div class="container">
                <h2>Course:</h2>
                <select class="form-select" v-model="selectedCourse">
                  <option v-for="(course) in this.courses" :key='course' :value="course.courseCode">{{course.courseCode}} - {{course.courseTitle}}</option>
                </select>
              </div>
          </div>
          <div class="mb-2 mt-3 text-center">              
            <button type="button" class="btn btn-secondary" @click="this.getClasses()">Search for Classes</button>
          </div>
        </div>
        <div v-if="courseSelected" class="container">
          <div class="mb-3 text-center">
              <div class="container">
                <h2>Class:</h2>
                <select v-if="this.classes.length > 0" class="form-select" v-model="classId" @change="getApplicants()">
                  <option v-for="(eachClass, index) in this.classes" :key='eachClass' :value="eachClass">Class - {{index+1}}</option>
                </select>
                <h5 v-else>No Classes Found!</h5>
              </div>
          </div>
        </div>
        <div v-if="classId != '' && this.learners.length != 0" class="container"> 
          <h2>Please approve the following self enrolment applications:</h2>
          <div class="container">
            <div class="row">
              <div class="col-md-3" v-for="(col,index1) in this.colCount" :key='col'>
                <ul style="display: table; margin: 0 auto;" >
                  <template v-for="(n,i) in this.namesPerCol" :key="n">
                  <li v-if="i + index1 * this.namesPerCol < this.learners.length ? true : false ">
                    <label><input  type="checkbox" class='mt-3' :value="this.learners[i + index1 * this.namesPerCol].username" v-model='selectedLearners'>&nbsp; {{this.learners[i + index1 * this.namesPerCol].username}}</label>
                  </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="mb-3 mt-3 text-center" v-if="this.classId != ''">              
            <button type="button" class="btn btn-secondary" @click="this.enrollLearners()">Approve</button>
          </div>
        </div>
        <div class="row" v-else-if="this.learners.length == 0 && this.courseSelected && classId != ''">
          <h4> No self enrollment applicants found! </h4>
        </div>

  </div>
</template>

<script>

import CourseService from '../services/CourseService'
import ClassService from '../services/ClassService'


export default {
  data(){
    return{
      courses: [],
      selectedCourse: '',
      itemsPerCol: 5,
      learners: [],
      selectedLearners: [],
      classId: "",
      classes: [],
      courseSelected: false,
      username: ''
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
    enrollLearners(){
    var payload = {
        "username" : this.selectedLearners[0],
        "classId" : this.classId
      }
      ClassService.approveSelfEnroll(payload, this.username)
      .then(response => {
        if (response.data.message.includes("successfully")){
          alert("Approval Success!")
        }
      })
    },
    getClasses(){
      this.classId = ''
      this.courseSelected = true
      CourseService.getClassesByCourse(this.selectedCourse)
        .then(response => {
          this.classes = response.data.classes
        })
    },
    getApplicants(){
        ClassService.getSelfEnrollApplicants(this.classId)
            .then(response => {
                this.learners = response.data.applicants
            })
    }

  },
  computed: {
    colCount(){
      return Math.ceil(this.learners.length / this.itemsPerCol)
    },
    namesPerCol(){
      return Math.ceil(this.learners.length / this.colCount)
    }    

  },
  created: function(){
    this.getAllCourses()
    this.username = this.$root.readCookie('username')

  }
}
</script>

<style scoped>

h2 {
  margin: 35px;
  text-align: center;
}

h4 {
  text-align: center;

}


</style>