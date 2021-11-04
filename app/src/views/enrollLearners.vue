<template>
  <div id='enroll'>
      <div class="container mt-5">
          <div class="mb-3 text-center">
              <h1>Enroll learners</h1>
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
                <select v-if="this.classes.length > 0" class="form-select" v-model="classId">
                  <option v-for="(eachClass, index) in this.classes" :key='eachClass' :value="eachClass">Class - {{index+1}}</option>
                </select>
                <h5 v-else>No Classes Found!</h5>
              </div>
          </div>
        </div>
        <div v-if="classId != ''" class="container"> 
          <h2>Please select qualified learners to enroll:</h2>
          <div class="container">
            <div class="row">
              <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">User ID</label>
              <input class="form-control" id="exampleFormControlInput1" placeholder="user id" v-model='searchBox'>
            </div>
            </div>
            <div class="row" v-if="isEmpty()">
              <div class="col-md-3" v-for="(col,index1) in this.colCount" :key='col'>
                <ul style="display: table; margin: 0 auto;" >
                  <template v-for="(n,i) in this.namesPerCol" :key="n">
                  <li v-if="i + index1 * this.namesPerCol < this.learners.length ? true : false ">
                    <label><input  type="checkbox" class='mt-3' :value="this.learners[i + index1 * this.namesPerCol][1]" v-model='selectedLearners'>&nbsp; {{this.learners[i + index1 * this.namesPerCol][0]}}</label>
                  </li>
                  </template>
                </ul>
              </div>
            </div>
            <div class="row" v-else-if="this.getSearchResults.length == 0">
              <div class="col-md-3"> No learners found </div>
            </div>
            <div class="row" v-else>
              <div class="col-md-3" v-for="(col) in Math.ceil(this.getSearchResults.length / this.itemsPerCol)" :key='col'>
                <ul style="display: table; margin: 0 auto;" >
                  <li v-for="n in this.getSearchResults" :key="n">
                    <label><input type="checkbox" class='mt-3' :value="n[1]" v-model='selectedLearners'>&nbsp;{{n[0]}}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mb-3 mt-3 text-center" v-if="this.classId != ''">              
            <button type="button" class="btn btn-secondary" @click="this.enrollLearners()">Enroll</button>
          </div>
        </div>
  </div>
</template>

<script>

import CourseService from '../services/CourseService'
import ClassService from '../services/ClassService'
import UserService from '../services/UserService'


export default {
  data(){
    return{
      courses: [],
      selectedCourse: '',
      itemsPerCol: 5,
      learners: [],
      selectedLearners: [],
      classId: "",
      searchBox: '',
      classes: [],
      courseSelected: false,
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
        "learners": this.selectedLearners
      }
      ClassService.updateClassLearners(this.classId, payload)
      .then(response => {
        if (response.data.message.includes("successfully")){
          alert(response.data.message)
        }
      })
    },
    isEmpty(){
      if (this.searchBox == ''){
        return true
      }else{
        return false
      }
    },
    getClasses(){
      this.classId = ''
      this.courseSelected = true
      CourseService.getClassesByCourse(this.selectedCourse)
        .then(response => {
          this.classes = response.data.classes
        })
    }

  },
  computed: {
    colCount(){
      return Math.ceil(this.learners.length / this.itemsPerCol)
    },
    namesPerCol(){
      return Math.ceil(this.learners.length / this.colCount)
    },
    getSearchResults(){
      var result = [];
      var qualifiedLearners = this.learners
      var query = this.searchBox;
      if (this.searchBox.length == 0){
        return []
      }
      for (const name of qualifiedLearners){
        var actualName = name[1]
        if (actualName.includes(query)){
          result.push(name)
        }
      }
      return result
    }
    

  },
  created: function(){
    this.getAllCourses()
    UserService.getUsersByRole('learner')
      .then(response => {
        var allLearners = response.data.users;
        for (const learner of allLearners){
          this.learners.push([learner.empName, learner.username])
        }
      })
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