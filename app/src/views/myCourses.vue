<template>
  <div id='myCourses'>
    <h2>My Courses</h2>
    <div class="container">
      <div class="row">
        <div v-for='eachClass in allClassesDetails' :key='eachClass' class="col-md-4 offset-md-1" style="width: 18rem;">
          <div class="card bg-light mb-5" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{eachClass.courseDetails[0].courseCode}}</h5>
              <h6 class="card-subtitle mt-3 mb-1 text-muted">{{eachClass.courseDetails[0].courseTitle}}</h6>
              <h6 class="card-subtitle mt-3 mb-1 text-muted">Start Date: {{eachClass.startDate.slice(0,10)}}</h6>
              <h6 class="card-subtitle mb-4 text-muted">End Date: {{eachClass.endDate.slice(0,10)}}</h6>
              <router-link :to="{ name: 'Course', params: { classID: eachClass.classId+'-'+eachClass.courseDetails[0].courseCode } }" class='text-primary'>
                <button type="button" class="btn btn-secondary btn-sm">View course</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
import CourseService from '../services/CourseService'
import ClassService from '../services/ClassService'

export default {
  data(){
    return{
      active: 'courses',
      allCourses: [],
      enrolledClasses: [],
      allClassesDetails: []
    }
  }, 
  methods: {

  },
  created: function(){
      const username = this.$root.readCookie('username')
      CourseService.getAllCourses()
        .then(response => {
          this.allCourses = response.data.courses
          console.log('this is ok')
        })
        .then(() => {
          ClassService.getEnrolledClass(username)
            .then(response => {
                this.enrolledClasses = response.data.classes
                console.log('this is ok')
            })
            // get information of each class that the trainer is teaching
            .then(() => {
              var promises = []
              var result = []
              for (let eachClass of this.enrolledClasses){
                promises.push(
                  ClassService.getClassInfo(eachClass)
                    .then(response => {
                      var courseId = response.data.course
                      var course = this.allCourses.filter(obj => {
                        return obj._id == courseId
                      })
                      response.data.courseDetails = course
                      response.data.classId = eachClass
                      result.push(response.data)
                    })
                )
              }
              Promise.all(promises)
                .then(() => {
                  this.allClassesDetails = result
              })
            })
        })


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