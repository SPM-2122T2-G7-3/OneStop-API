<template>
  <div id="newClass">
    <h2>Class Creation</h2>
    <div class="container mt-5">
        <div class="mb-3 text-center">
            <div class="container">
            <h2>Please select a course:</h2>
            <select class="form-select" v-model="selectedCourse">
                <option v-for="(course) in this.courses" :key='course' :value="course.courseCode">{{course.courseCode}} - {{course.courseTitle}}</option>
            </select>
            </div>
        </div>
    </div>
    <div v-if="selectedCourse != ''" class="container mt-5">
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Start Date</h4>e.g 2010-12-10</div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="startDate" placeholder="Year-Month-Day" v-model="startDate">
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>End Date</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="endDate" placeholder="End Date" v-model="endDate">
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Capacity</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="capacity" placeholder="Capacity" v-model.number="capacity">
            </div>
        </div>
      </div>
      <div class="mb-3 mt-3 text-center" v-if="this.selectedCourse != ''">              
        <button type="button" class="btn btn-secondary" @click="this.createClass()">Create Class!</button>
      </div>

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
        startDate: '',
        endDate: '',
        capacity: 0
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
    createClass(){
        var payload = {
            "courseCode": this.selectedCourse,
            "startDate": this.startDate,
            "endDate": this.endDate,
            "capacity": this.capacity
        }
        ClassService.addNewClass(payload)
            .then(response => {
                if (response.data.isSuccess){
                    alert("Class Successfully created!")
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