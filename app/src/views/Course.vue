<template>
    <div id='course'>
      <h2>{{courseCode}}</h2>
      <h2>{{courseTitle}}</h2>
      <router-link :to="{ name: 'Quiz', params: { quizID: quizid } }" class='text-primary'>Quiz</router-link><br>
      <router-link :to="{ name: 'manageCourse', params: { courseID: courseCode } }" class='text-primary'>Manage Course</router-link>
      <nav class="project-tab">
        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Content</a>
            <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Discussions</a>
            <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Quizzes</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          <div class="container justify-content-center">
            <table class="table table-hover ">
              <thead class="thead-dark">
                <tr class="row">
                  <th class="col-sm-4 text-center">Quiz</th>
                  <th class="col-sm-4 text-center">Status</th>
                  <th class="col-sm-4 text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr class="row" v-for="quiz in quizzes" :key='quiz'>
                  <td class="col-sm-4 text-center">{{ quiz.quizName }}</td>  
                  <td class="col-sm-4 text-center">Completed</td> 
                  <td class="col-sm-4 text-center">Pass</td>  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import CourseService from '../services/CourseService'

  export default{
    name: 'course',
    data(){
      return{
        courseCode: '',
        courseInfo: null,
        courseTitle: '',
        quizid: 5,
        quizzes: [],
      }
    },
    methods: {
      retrieveCourseInfo(){
        CourseService.getCourseInfo(this.courseCode)
          .then(response => {
            this.courseInfo = response.data.courses[0];
            this.courseTitle = this.courseInfo.courseTitle

          })
      }

      
    },
    created: function(){
      this.courseCode = this.$route.params.courseID;
      this.actualQuiz();
      this.retrieveCourseInfo()
       
    }
  }
</script>

<style scoped>
h2 {
  margin: 35px;
  text-align: center;
}

.project-tab {
    padding: 3%
}

.project-tab #tabs .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #0062cc;
    background-color: transparent;
    border-color: transparent transparent #f3f3f3;
    border-bottom: 3px solid !important;
    font-size: 16px;
    font-weight: bold;
}
.project-tab .nav-link {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    color: #0062cc;
    font-size: 16px;
    font-weight: 600;
}
.project-tab .nav-link:hover {
    border: none;
}

.project-tab a{
    text-decoration: none;
    color: #333;
    font-weight: 600;
}
</style>