<template>
  <div id='courses'>
    <h2>All Courses</h2>
    <div class="container">
      <div class="row">
        <div v-for='course in this.allCourses' :key='course' class="col-6 col-md-4" style="width: 18rem; margin:auto">
          <div class="card bg-light mb-5" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{course.courseCode}}</h5>
              <h6 class="card-subtitle mb-1 text-muted">{{course.courseTitle}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseService from '../services/CourseService'

export default {
  name: 'courses',
  components: {
  },
  data(){
    return{
      allCourses: []
    }
  }, 
  methods: {
  },
  created: function(){
    CourseService.getAllCourses()
      .then(response => {
        this.allCourses = response.data.courses
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