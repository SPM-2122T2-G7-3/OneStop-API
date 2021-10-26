<template>
  <div id='newQuiz'>
    <h2>New quiz for Course 1</h2>
    <div class="container">
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Quiz Name</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Quiz Name" v-model="quizName">
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px'>
            <div class='col-sm-4' ><h4>Quiz Type</h4></div>
            <div class='col-sm-8' style='padding-top:5px'>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                <label class="form-check-label" for="flexRadioDefault1">
                  Ungraded
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                <label class="form-check-label" for="flexRadioDefault2">
                  Graded
                </label>
              </div>
            </div>
      </div>
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Section</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Section" v-model="section">
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px; margin-bottom:10px'>
        <div class='col-sm-4' ><h4>Time Limit</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
        <div class="mb-3">
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Seconds" v-model="time">
        </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-for='(question, index) in questions' :key='question' class="col-md-">
        <question :number='index+1' v-on:childToParent="onChildClick"></question>
      </div>
      <button type="button" class="btn btn-success mt-3" @click="this.createQuiz()">Submit</button>
    </div>
  </div>
</template>

<script>
import Question from '@/components/Question'
import QuizService from '../services/QuizService'

export default {
  name: 'newQuiz',
  components: {
    Question
  },
  data(){
    return{
      active: 'courses',
      questions: [1],
      section: '',
      time: null,
      questionsToBeSubmitted: [],
      quizName: '',
      courseID: ''
    }
  }, 
  methods: {
    addQuestion(){
      var lastIndex = this.questions.at(-1)
      lastIndex += 1
      this.questions.push(lastIndex)
    },
    onChildClick(value){
      this.questions.push(value)
      this.questionsToBeSubmitted.push(value)
    },


    createQuiz(){
      var data = {
        "courseCode": this.courseID,
        "section": this.section,
        "quizName": this.quizName,
        "timeAllowed": this.time,
        "questions": JSON.parse(JSON.stringify(this.questionsToBeSubmitted)),
        "quizMarks": 10
      }

        QuizService.addQuiz(JSON.stringify(data))
    }
  },
    created: function(){
      this.courseID = this.$route.params.courseID;
       
    }

}
</script>

<style scoped>
#courses {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h2 {
  margin: 35px;
  text-align: center;
}

h3 {
  margin-left: 60px;
  margin-bottom: 35px;
}


</style>