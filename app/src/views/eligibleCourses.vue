<template>
  <div id='courses'>
    <h2>Self Enrollment System</h2>
    <h3>Enroll in these Courses</h3>
    <h5 id='description'>You are eligible to enroll in these courses:</h5>
    <div class="container">
      <div class="row">
        <div v-for='(course, index) in allClassesDetails' :key='course' class="col-md-4 offset-md-1" style="width: 18rem;">
          <div class="card bg-light mb-5" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{course.courseDetails[0].courseCode}} </h5>
              <h6 class="card-subtitle mt-3 mb-1 text-muted">{{course.courseDetails[0].courseTitle}}</h6>
              <h6 class="card-subtitle mt-3 mb-1 text-muted">Start Date: {{course.startDate.slice(0,10)}}</h6>
              <h6 class="card-subtitle mb-4 text-muted">End Date: {{course.endDate.slice(0,10)}}</h6>
              <div v-if="course.courseDetails[0].preReq.length > 0" class="card-text">Pre-requisite Courses:
                <ol>
                  <li v-for="preReqCourse in course.courseDetails[0].preReq" :key="preReqCourse">{{getCorrespondingCourseDetails(preReqCourse)}}</li>
                </ol>
              </div>
              <div v-else class="card-text">Pre-requisite Courses:<br>
                There are no prerequisite courses
              </div>
              <button type="button" class="btn btn-secondary btn-sm mt-2" @click="enroll(allClasses[index])">Enroll</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
import ClassService from '../services/ClassService'
import CourseService from '../services/CourseService'


export default {
  name: 'courses',
  components: {
  },
  data(){
    return{
      active: 'courses',
      allCourses: [],
      allClasses: [],
      allEligibleCoursesId: [],
      eligibleCourses: [],
      allClassesDetails: [],
      username: ''

    }
  }, 
  methods: {
    getAllClasses(){
      for (let course of this.allCourses){
        CourseService.getClassesByCourse(course)
          .then(response => {
            this.allClasses.push(response.data.classes)
          })
      }
    },
    getCorrespondingCourseDetails(courseID){
      var course =  this.allCourses.filter(obj => {
              return obj._id == courseID
          })
      
      var details = course[0].courseCode + " - " + course[0].courseTitle
      return details
    },
    enroll(classId){
      ClassService.applyToClass(classId, this.username)
        .then(response => {
          if (response.data.message.includes('successfully')){
            alert("You have successfully applied to enroll for the course. Please wait for Admin's approval. Thank you")
          }
        })
    }
  },
  created: function(){
      const username = this.$root.readCookie('username')
      this.username = username
      CourseService.getEligibleCourse(username)
        .then(response => {
            this.allEligibleCoursesId = response.data.eligibleCourses
        })
        .then(() => {
          CourseService.getAllCourses()
            .then(response => {
              this.allCourses = response.data.courses
            })
            .then(() => {
              var output = []
              var everyCourse = JSON.parse(JSON.stringify(this.allCourses));
              var eligibleID = JSON.parse(JSON.stringify(this.allEligibleCoursesId));
              for (let course of everyCourse){
                if (eligibleID.includes(course._id)){
                  output.push(course)
                }
              }
              this.eligibleCourses = output
            })
            .then(() => {
              var promises = []
              var result = []
              for (let course of this.eligibleCourses){
                promises.push(
                  CourseService.getClassesByCourse(course.courseCode)
                  .then(response => {
                    var classes = response.data.classes
                    for (let each of classes){
                      result.push(each)
                    }
                  })
              )}
              Promise.all(promises)
                .then(() => {
                  this.allClasses = result
                })
                .then(() => {
                  var promises2 = []
                  var result2 = []
                  for (let eachClass of this.allClasses){
                    promises2.push(
                      ClassService.getClassInfo(eachClass)
                        .then(response => {
                          var courseId = response.data.course
                          var course = this.allCourses.filter(obj => {
                            return obj._id == courseId
                          })
                          response.data.courseDetails = course
                          result2.push(response.data)
                        })
                    )
                  }
                  Promise.all(promises2)
                    .then(() => {
                      this.allClassesDetails = result2
                  })
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

#description {
  margin-left: 60px;
  margin-bottom: 20px;

}


</style>