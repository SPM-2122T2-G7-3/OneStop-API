<template>
    <div class='questionTemplate'>
        <div class='mb-2 mt-3'><h4>Question {{number}}</h4></div>
        <div class='row'>
            <div class="col-md-4">
                <h5>Question Type:</h5>
            </div>
            <div class="col-md-8">
                <div class="form-check"> 
                    <input class="form-check-input" type="radio" :name="number" id="MCQ" value='MCQ' v-model="questionType">
                    <label class="form-check-label" for="MCQ">
                        MCQ
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" :name="number" id="TF" value='TF' v-model="questionType">
                    <label class="form-check-label" for="TF">
                        T/F
                    </label>
                </div>
            </div>
        </div>
        <div v-if="questionType == 'MCQ'" class="row">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <label for="exampleFormControlInput1" class="form-label">Question name</label>
                        <input class="form-control" id="exampleFormControlInput1" placeholder="Question" v-model="questionName">
                    </div>
                </div>
                <div class="row mt-3">
                   <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1" class="form-label">Option 1</label>
                            <input type="text" class="form-control" id="option1" placeholder="1. Add Your Answer" v-model="MCQOption1">
                        </div>
                   </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1" class="form-label">Option 2</label>
                            <input type="text" class="form-control" id="option2" placeholder="2. Add Your Answer" v-model="MCQOption2">
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1" class="form-label">Option 3</label>
                            <input type="text" class="form-control" id="option3" placeholder="3. Add Your Answer" v-model="MCQOption3">
                        </div>
                   </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1" class="form-label">Option 4</label>
                            <input type="text" class="form-control" id="option4" placeholder="4. Add Your Answer" v-model="MCQOption4">
                        </div>
                    </div>
                </div>
                <div class="row mt-2">  
                    <div class="col-md-8">
                        Correct Answers:   
                        <div class="form-check form-check-inline">
                            <label><input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="1" v-model='mcqCorrectAnswers'>
                            Option 1</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="2" v-model='mcqCorrectAnswers'>
                            Option 2</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="3" v-model='mcqCorrectAnswers'>
                            Option 3</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="4" v-model='mcqCorrectAnswers'>
                            Option 4</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <label for="exampleFormControlInput1" class="form-label">Question name</label>
                        <input class="form-control" id="exampleFormControlInput1" placeholder="Question" v-model="questionName">
                    </div>
                    <div class="col-md-5">
                        Correct Answer
                        <div class="form-check"> 
                            <label><input class="form-check-input" type="radio" :name="number+'_option'" id="MCQ" value='True' v-model="tfCorrectAnswers">
                                True
                            </label>
                        </div>
                        <div class="form-check"> 
                            <label><input class="form-check-input" type="radio" :name="number+'_option'" id="MCQ" value='False' v-model="tfCorrectAnswers">
                                False
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class='col-sm-4' >Number of marks for question</div>
            <div class='col-sm-8' style='padding-top:5px'>
                <div class="mb-3">
                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Marks" v-model.number="marks">
                </div>
            </div>
        </div>
        <button v-if="saveButton" @click='emitToParent' type="button" class="btn btn-warning mt-3">Save</button>
    </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['number'],
  data(){
    return{
        questionType: 'MCQ',
        questionName: '',
        MCQOption1: '',
        MCQOption2: '',
        MCQOption3: '',
        MCQOption4: '',
        saveButton: 'true',
        mcqCorrectAnswers: [],
        tfCorrectAnswers: '',
        marks: 0
    }
  }, 
  computed:{
      mcqQuestionOptions(){
          if (this.questionType == 'MCQ'){
            return [this.MCQOption1, this.MCQOption2, this.MCQOption3, this.MCQOption4]
          }else{
              return ["True", "False"]
          }
      },
      correctAnswer(){
          if (this.questionType == 'MCQ'){
            var result = [];
            for (let i = 0; i < this.mcqCorrectAnswers.length ; i++){
                if (this.mcqCorrectAnswers[i] == "1"){
                    result.push(this.MCQOption1)
                }else if (this.mcqCorrectAnswers[i] == "2"){
                    result.push(this.MCQOption2)
                }else if (this.mcqCorrectAnswers[i] == "3"){
                    result.push(this.MCQOption3)
                }else{
                    result.push(this.MCQOption4)
                }
            }
            return result
          }else{
              return [this.tfCorrectAnswers]
          }

      }
  },
  methods: {
      questionWrapper(){

          var wrappedQuestion = {
              "questionText": this.questionName,
              "questionType": this.questionType,
              "questionMarks": this.marks,
              "answerOptions": this.mcqQuestionOptions,
              "correctAnswers": this.correctAnswer
          }

        return wrappedQuestion
      },
      emitToParent (){
          this.saveButton = false
          this.$emit('childToParent', this.questionWrapper())
      },
      reset(){
          this.questionName = ''
          this.MCQOption1 = ''
          this.MCQOption2 = ''
          this.MCQOption3 = ''
          this.MCQOption4 = ''
          this.saveButton = true
      }
  }
}

</script>
