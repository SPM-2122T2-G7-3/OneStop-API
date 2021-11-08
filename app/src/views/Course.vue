<template>
    <div id='course'>
      <div class="container">
      <h2>{{courseID}}</h2>
      <h3>{{courseTitle}}</h3>
      <div class="container">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="content-tab" data-bs-toggle="tab" data-bs-target="#content" type="button" role="tab" aria-controls="home" aria-selected="true">Content</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="quiz-tab" data-bs-toggle="tab" data-bs-target="#quiz" type="button" role="tab" aria-controls="profile" aria-selected="false">Quiz</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="content" role="tabpanel" aria-labelledby="home-tab">
            <div class="container mt-3">
              <div class="row">
                <div class="col-md-3">
                  <h4>Chapter</h4>
                </div>
                <div class="col-md-6">
                  <h4>Sections</h4>
                </div>
                <div class="col-md-3">
                  <h4>Materials</h4>
                </div>
              </div>
            </div>
            <div class="container justify-content-center" >
              <div class="row"  v-for="(chapter) in this.chapters" :key='chapter'>
                <div class="col-md-3" style="border:1px solid;">
                  {{chapter.chapterTitle}}
                </div>
                <div class="col-md-6 mx-0 px-1" style="border:1px solid;"> 
                  <div class="container px-3">
                      <div class="row" v-for="section in chapter.sections" :key='section'>
                        {{section.sectionTitle}}
                      </div>
                  </div>
                </div>                      

                <div class="col-md-3" style="border:1px solid;">
                  <div class="container px-3">
                    <div class="row" v-for="section in chapter.sections" :key='section'>
                      <a v-for="(file, index) in section.files" :key="file" @click.prevent="downloadFile(section.files[index].filename)" href="">
                        {{section.hyperlinks[index]}}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="quiz" role="tabpanel" aria-labelledby="profile-tab">
            <div class="container justify-content-center">
              <table class="table table-hover ">
                <thead class="thead-dark">
                  <tr class="row">
                    <th class="col-sm-4 text-center"></th>
                    <th class="col-sm-4 text-center">Quiz</th>
                    <th class="col-sm-4 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="row" v-for="(quiz, index) in this.allQuizzes" :key='quiz'>
                    <td class="col-sm-4 text-center">Chapter {{ index+1 }}</td>  
                    <td class="col-sm-4 text-center">{{ quiz.quizName }}</td>  
                    <td class="col-sm-4 text-center">
                        <router-link :to="{ name: 'Quiz', params: { classID: this.classID, quizID: quiz._id } }" class='text-primary'>
                          <button type="button" class="btn btn-secondary">Take quiz</button>
                        </router-link> &nbsp;
                    </td>  
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade" id="discussions" role="tabpanel" aria-labelledby="contact-tab">...</div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import ClassService from '../services/ClassService'
  import CourseService from '../services/CourseService'

  export default{
    name: 'course',
    data(){
      return{
        courseID: '',
        classID: '',
        chapters: [],
        allQuizzes: []
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
      this.classID = this.$route.params.classID.split('-')[0];
      this.courseID = this.$route.params.classID.split('-')[1];

      CourseService.getCourseInfo(this.courseID)
        .then(response => {
          this.courseTitle = response.data.courses[0].courseTitle;
      })
      ClassService.getClassContent(this.classID)
        .then(response => {
          this.chapters = response.data.chapters
        })
        .then(() => {
        })

      ClassService.getQuizQuestions(this.classID)
        .then(response => {
          this.allQuizzes = response.data.quizzes

        })


    }
  }
</script>

<style scoped>
h2 {
  margin: 35px;
  text-align: center;
}

h4, h3 {
    text-align: center;
}
</style>