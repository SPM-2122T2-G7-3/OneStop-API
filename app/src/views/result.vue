<template>
  <div id='result'>
    <h2>{{this.courseCode}}</h2>
    <h2>Quiz: {{this.quizName}}</h2>
    <h3>Your Result:</h3>
    <div class="container">
      <div class="row">
          <div class='col-sm-12' style='text-align: center'>
              <h1 v-if="this.loaded" >{{this.attempt.marksAwarded}}/{{this.quizMarks}}</h1>
          </div>
      </div>
      <div class="row">
          <div v-if="this.attempt.passed" class='col-sm-12' style='text-align: center'>
              <h3 class="text-success">You have passed the quiz</h3>
          </div>
          <div v-else class='col-sm-12' style='text-align: center'>
              <h3 class="text-danger">You have failed the quiz</h3>
          </div>
      </div>
      <div class="row" v-for="(question,index) in this.quizQuestions" :key='question'>
        <div class="col-12">
            <table class="table">
            <thead style="text-align:left">
                <tr>
                <th scope="col">{{index+1}}. {{question.questionText}} ({{this.quizQuestions[index].questionMarks}} marks)</th>
                </tr>
            </thead>
            <tbody style="text-align:left">
                <tr v-for="option in question.answerOptions" :key='option'>
                  <th v-if="option == this.attempt.questions[index].answers[0].answer && this.attempt.questions[index].answers[0].isCorrect" scope="row">
                      <input type="checkbox" :name='question' :id="option" :value='option' checked>
                        &nbsp; {{option}}  &#9989; <span class="text-success">Correct</span>
                  </th>
                  <th v-else-if="option == this.attempt.questions[index].answers[0].answer && !this.attempt.questions[index].answers[0].isCorrect" scope="row">
                      <input type="checkbox" :name='question' :id="option" :value='option' checked>
                        &nbsp; {{option}}  &#10060; <span class="text-danger">Incorrect</span>
                  </th>
                  <th v-else-if="option != this.attempt.questions[index].answers[0].answer && this.quizQuestions[index].correctAnswers.includes(option)" scope="row">
                      <input type="checkbox" :name='question' :id="option" :value='option'>
                        &nbsp; {{option}}  &#9989;  <span class="text-success">This is the correct answer</span>
                  </th>
                  <th v-else scope="row">
                    <input type="checkbox" :name='question' :id="option" :value='option'>
                      &nbsp; {{option}} 
                  </th>
                </tr>
            </tbody>
            </table>
        </div>
      </div>
      <router-link :to="{ name: 'Course', params: { classID: this.classID } }" class='text-primary'>
      <button type="button" class="btn btn-secondary mb-3">Return to Class</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import QuizService from '../services/QuizService'

export default {
  name: 'result',
  data(){
    return{
      courseCode: '',
      active: 'courses',
      attempt: null,
      quizName: '',
      quizQuestions: [],
      quizScore: 0,
      quizMarks: 0,
      loaded: false
    }
  }, 
  methods: {
  },
  created: function(){
    this.quizID = this.$route.params.quizID
    this.attemptID = this.$route.params.attemptID
    this.classID = this.$route.params.classID
    QuizService.getQuizAttempt(this.attemptID)
      .then(response => {
        this.attempt = response.data.quizAttempt
        this.loaded = true
      })
      QuizService.getQuizQuestions(this.quizID)
       .then(response => {
         this.quizName = response.data.quiz.quizName
         this.quizQuestions = response.data.quiz.questions
         this.quizMarks = response.data.quiz.quizMarks
         this.courseCode = response.data.quiz.courseCode
      })
  }
}
</script>

<style scoped>

h2, h3 {
  margin: 25px;
  text-align: center;
}




</style>