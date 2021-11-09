<template>
  <div class="home">
    <div id='header'>
      <h1>Welcome Back</h1>
      <h2>{{username}}</h2>
      <h3>
        What would you like to do today?
      </h3>
    </div>
    <div class="container">
      <div v-if="role.toLowerCase() == 'admin'">
        <h4 class="mt-5"><router-link to="/enrollLearners">Enroll Learners</router-link> </h4>
        <h4 class="mt-4"><router-link to="/withdrawLearners">Withdraw Learners</router-link> </h4>
        <h4 class="mt-4"><router-link to="/assignTrainers">Assign Trainers</router-link> </h4>
        <h4 class="mt-4"><router-link to="/withdrawTrainers">Withdraw Trainers</router-link> </h4>
        <h4 class="mt-4"><router-link to="/createCourse">Create Course</router-link> </h4>
        <h4 class="mt-4"><router-link to="/createClass">Create Class</router-link> </h4>
        <h4 class="mt-4"><router-link to="/approveSelfEnrollment">Approve Self Enrollment Applications</router-link> </h4>
      </div>
      <div v-else-if="role.toLowerCase() == 'trainer'">
        <h4 class="mt-5"><router-link to="/myTeachingCourses">Manage Classes</router-link> </h4>
      </div>
      <div v-else>
        <h4 class="mt-5"><router-link to="/myCourses">View currently enrolled Courses</router-link> </h4>
        <h4 class="mt-5"><router-link to="/allCourses">View all Courses</router-link> </h4>
        <h4 class="mt-5"><router-link to="/eligibleCourses">View Courses that I can self enroll in</router-link> </h4>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return{
      name: null,
    }
  },
  methods: {
  },
  created: function(){
    this.username = this.$root.readCookie('username')
    this.role = this.$root.readCookie('role')
  }
}
</script>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}

h1 { 
  font-size: 350%; 
  padding-top: 30px;
}

h2 { 
  font-size: 320%; 
}

</style>
