<template>
  <div class="quiz">
    <div id='header'>
      <h2>{{this.quizName}}</h2>
      <div class="container">
          <div class="row">
              <div class="col-12 ">
                <Timer v-if="this.initiated" :timeLeft="this.time"/>
                </div> 
          </div>
          <div class="row" v-for="(question,index) in this.quizQuestions" :key='question'>
            <div class="col-12 ">
                <table class="table">
                <thead style="text-align:left">
                    <tr>
                    <th scope="col">{{index+1}}. {{question.questionText}}</th>
                    </tr>
                </thead>
                <tbody style="text-align:left">
                    <tr v-for="option in question.answerOptions" :key='option'>
                    <th scope="row">
                        <label><input type="checkbox" :name='question' :id="option" :value='option' v-model="attempt[index].answers">
                         &nbsp; {{option}} </label>
                    </th>
                    </tr>
                </tbody>
                </table>
            </div>
          </div>
          <button type="button" class="btn btn-success" @click="submit()">
            Submit
          </button>
      </div>    
    </div>
    <router-view/>
  </div>

</template>

<script>
import QuizService from '../services/QuizService'
import Timer from '../components/Timer'


export default {
  name: 'quiz',
  components: {
    Timer 
  },
  data(){
    return{
      quizID: null,
      quizName: '',
      quizQuestions: [],
      section: '',
      attempt: [],
      time: null,
      initiated: false

    }
  },
  methods: {
      questionAndAnswerWrapper: function(){
        var attempt = []
        for (let question of this.quizQuestions){
          var selectedOptions = []
          var eachQuestion = {
            "questionId": question._id,
            "answers": selectedOptions
          };
          attempt.push(eachQuestion)
        }
        return attempt
      },
      findQuestionDetails: function(question, id){
        return question._id === id
      },
      submit(){
        alert("Quiz has been submitted!") 
        var username = this.$root.readCookie('username');
        var payload = {
          "questions": this.attempt
        }
        var self = this

        QuizService.submitQuizAttempt(this.quizID, payload, username)
          .then(response => {
            if (response.data.message.includes('successfully')){
              var elements = response.data.message.split(" ")
              self.$router.push({ name: 'Result', params: { quizID: this.quizID, attemptID: elements[3] } })
            }
          })
          .catch(function(error) {
            var questions_with_error = ''
            for (let question of error.response.data.questions){
              var actualQuestion = self.quizQuestions.find(({_id}) => _id === question.questionId)
              questions_with_error +=  actualQuestion.questionText + '\n'
            }
            var message = error.response.data.errors + '\n' + questions_with_error
            alert(message)
          });
          
      }

  },
  
  created: function(){
      this.quizID = this.$route.params.quizID;
      QuizService.getQuizQuestionNoAnswer(this.quizID)
       .then(response => {
         this.quizName = response.data.quiz.quizName
         this.quizQuestions = response.data.quiz.questions
         this.section = response.data.quiz.section
         this.time = response.data.quiz.timeAllowed
         this.attempt = this.questionAndAnswerWrapper()
         this.initiated = true
        })
  }
}
</script>

<style scoped>

h2 { 
  font-size: 250%; 
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>