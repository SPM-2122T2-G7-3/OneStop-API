<template>
  <div id='editQuiz'>
    <h2>Editing Quiz</h2>
    <h3>{{quizName}}</h3>
    <div class="container">
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Quiz Name</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Quiz Name" v-model="quizName" disabled>
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px'>
        <div class='col-sm-4' ><h4>Section</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
            <div class="mb-3">
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Section" v-model="quizSection" disabled>
            </div>
        </div>
      </div>
      <div class="row" style='margin-top: 20px; margin-bottom:10px'>
        <div class='col-sm-4' ><h4>Time Limit (Seconds)</h4></div>
        <div class='col-sm-8' style='padding-top:5px'>
        <div class="mb-3">
          <input type="number" class="form-control" id="timeLimit" placeholder="Seconds" v-model="quizTimeLimit" disabled>
        </div>
        </div>
      </div>
    </div>
    <div class="container">
        <template v-for='(question, index) in quizQuestions' :key='question'>
            <div class='row mt-5'>
                <div class="col-md-4">
                    <h5>Question Type:</h5>
                </div>
                <div class="col-md-8">
                    <div class="form-check"> 
                        <label><input class="form-check-input" type="radio" :name="number" value='MCQ' v-model="question.questionType">
                            MCQ
                        </label>
                    </div>
                    <div class="form-check">
                        <label><input class="form-check-input" type="radio" :name="number" value='TF' v-model="question.questionType">
                            T/F
                        </label>
                    </div>
                </div>
            </div>
            <div v-if="question.questionType == 'MCQ'" class='row'>
                <div class="container">
                    <div class="row">
                        <div class="col-md-8">
                            <label for="exampleFormControlInput1" class="form-label">Question {{index+1}}</label>
                            <input class="form-control" id="exampleFormControlInput1" placeholder="Question" v-model="question.questionText">
                        </div>
                        <div class="col-md-4 text-center" >
                            <button @click='removeQuestion(index)' type="button" class="btn btn-danger mt-4">Remove</button>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1" class="form-label">Option 1</label>
                                <input type="text" class="form-control" id="option1" placeholder="A. Add Your Answer" v-model="question.answerOptions[0]">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1" class="form-label">Option 2</label>
                                <input type="text" class="form-control" id="option2" placeholder="B. Add Your Answer" v-model="question.answerOptions[1]">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1" class="form-label">Option 3</label>
                                <input type="text" class="form-control" id="option3" placeholder="C. Add Your Answer" v-model="question.answerOptions[2]">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1" class="form-label">Option 4</label>
                                <input type="text" class="form-control" id="option4" placeholder="D. Add Your Answer" v-model="question.answerOptions[3]">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2">  
                        <div class="col-md-8">
                            Correct Answers:   
                            <div class="form-check form-check-inline">
                                <label><input class="form-check-input" type="checkbox" id="inlineCheckbox1" :value='question.answerOptions[0]' v-model='question.correctAnswers'>
                                Option 1</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <label><input class="form-check-input" type="checkbox" id="inlineCheckbox2" :value='question.answerOptions[1]' v-model='question.correctAnswers'>
                                Option 2</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <label><input class="form-check-input" type="checkbox" id="inlineCheckbox3" :value='question.answerOptions[2]' v-model='question.correctAnswers'>
                                Option 3</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <label><input class="form-check-input" type="checkbox" id="inlineCheckbox4" :value='question.answerOptions[3]' v-model='question.correctAnswers'>
                                Option 4</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class='col-sm-4' >Number of marks for question</div>
                        <div class='col-sm-8' style='padding-top:5px'>
                            <div class="mb-3">
                            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Marks"  v-model.number="question.questionMarks">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div class="container">
                    <div class="row">
                        <div class="col-md-7">
                            <label for="exampleFormControlInput1" class="form-label">Question {{index + 1}}</label>
                            <input class="form-control" id="exampleFormControlInput1" placeholder="Question" v-model="question.questionText">
                        </div>
                        <div class="col-md-3">
                            Correct Answer
                            <div class="form-check"> 
                                <label><input class="form-check-input" type="radio"  id="MCQ_new" value='True' v-model="question.correctAnswers[0]">
                                    True
                                </label>
                            </div>
                            <div class="form-check"> 
                                <label><input class="form-check-input" type="radio" id="MCQ_new" value='False' v-model="question.correctAnswers[0]">
                                    False
                                </label>
                            </div>
                        </div>
                        <div class="col-md-2" >
                            <button @click='removeQuestion(index)' type="button" class="btn btn-danger mt-4">Remove</button>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class='col-sm-4' >Number of marks for question</div>
                        <div class='col-sm-8' style='padding-top:5px'>
                            <div class="mb-3">
                            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Marks"  v-model.number="question.questionMarks">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <button type="button" class="btn btn-success mt-3 mb-3" @click='updateQuestions()'>Update Quiz</button>
        <div class="row mt-5 mb-4">
            <h3>Do you want to add a new question? Add it here.</h3>
            <question :number='question' v-on:childToParent="onChildClick" ref="newQuestion"></question>
        </div>
    </div>
  </div>
</template>


<script>

import Question from '@/components/Question'
import QuizService from '../services/QuizService'

export default {
    components: {
        Question
    },
    data(){
        return{
            quizId: '',
            quizDetails: null,
            quizName: '',
            quizSection: '',
            quizTimeLimit: 0,
            quizQuestions: [],
        }
    },
    methods: {
        removeQuestion(value){
            this.quizQuestions.splice(value, 1)
        },
        onChildClick(value){
            this.quizQuestions.push(value)
            this.$refs.newQuestion.reset();

        },
        updateQuestions(){
            var questionsConverted = JSON.parse(JSON.stringify(this.quizQuestions))
            var toSend = {
                "questions": questionsConverted
            }
            QuizService.updateQuizQuestions(this.quizId, JSON.stringify(toSend))
        }   
        

    },

    created: function(){
      this.quizId = this.$route.params.quizID;
      QuizService.getQuizQuestions(this.quizId)
        .then(response => {
            this.quizDetails = response.data.quiz;
            this.quizName = this.quizDetails.quizName;
            this.quizSection = this.quizDetails.section;
            this.quizTimeLimit = this.quizDetails.timeAllowed;
            this.quizQuestions = this.quizDetails.questions

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
    text-align: center;
}


</style>
