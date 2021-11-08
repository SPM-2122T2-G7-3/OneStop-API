<template>
    <div id='manageCourse'>
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
            <div class="container d-flex justify-content-center mt-3">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chapter">
              Add Chapter
            </button>
              &nbsp;
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#section">
              Add Section 
            </button>
              &nbsp;
            </div>
            <div class="container mt-3">
              <div class="row">
                <div class="col-md-3">
                  <h4>Chapter</h4>
                </div>
                <div class="col-md-4">
                  <h4>Sections</h4>
                </div>
                <div class="col-md-3">
                  <h4>Materials</h4>
                </div>
                <div class="col-md-2">
                </div>
              </div>
            </div>
            <div class="container justify-content-center" >
              <div class="row"  v-for="(chapter) in this.chapters" :key='chapter'>
                <div class="col-md-3" style="border:1px solid;">
                  {{chapter.chapterTitle}}
                </div>
                <div class="col-md-4 mx-0 px-1" style="border:1px solid;"> 
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
                <div class="col-md-2">
                  <div class="container px-3">
                    <div class="row" v-for="section in chapter.sections" :key='section'>
                      <button type="button" @click="this.fillData(section,  chapter)" class="btn btn-primary btn-sm mt-2 mb-2" data-bs-toggle="modal" data-bs-target="#content-new">
                        Add Content 
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="quiz" role="tabpanel" aria-labelledby="profile-tab">
            <div class="container d-flex justify-content-end mt-3">
              <!-- <router-link :to="{ name: 'newQuiz', params: { classID: this.courseID } }" class='text-primary'> -->
              <button type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#quiz-modal">
                Add Quiz 
              </button>
              <!-- </router-link> -->

            </div>
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
                        <router-link :to="{ name: 'editQuiz', params: { classID: this.classID, quizID: quiz._id } }" class='text-primary'>
                          <button type="button" class="btn btn-secondary">Edit</button>
                        </router-link> &nbsp;
                          <button type="button" class="btn btn-warning" @click="deleteQuiz(quiz._id)">Delete</button>
                    </td>  
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade" id="discussions" role="tabpanel" aria-labelledby="contact-tab">...</div>
        </div>

        <!--Chapter Modal -->
        <div class="modal fade" id="chapter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Chapter</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Chapter Title</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newChapter">
              </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" @click="addChapter()">Add Chapter</button>
              </div>
            </div>
          </div>
        </div>

        <!--Section Modal -->
        <div class="modal fade" id="section" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Section</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Chapter</span>
                <select class="form-select" v-model="selectedChapter">
                  <option v-for="chapter in this.chapters" :key='chapter' :value="chapter._id">{{chapter.chapterTitle}}</option>
                </select>
                <span class="input-group-text" id="inputGroup-sizing-sm">Section Title</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newSection">

              </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" @click="addSection()">Add Section</button>
              </div>
            </div>
          </div>
        </div>

        <!--Content Modal -->
        <div class="modal fade" id="content-new" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Content</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Chapter</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="selectedChapterContent">
                <span class="input-group-text" id="inputGroup-sizing-sm">Section</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="selectedSectionContent">
                </div>
                <p>
                <span class="input-group-text" id="inputGroup-sizing-sm">Link</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newLinks">
                </p>
                <p>
                <span class="input-group-text" id="inputGroup-sizing-sm">Files</span>
                <input class="form-control form-control-lg" id="formFileLg" type="file"  @change="handleFileUpload( $event )">                
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" @click="addLinks()">Add Links</button>
                <button type="button" class="btn btn-primary" @click="submitFile()">Add Files</button>
              </div>
            </div>
          </div>
        </div>

        <!--Add Quiz Modal -->
        <div class="modal fade" id="quiz-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Quiz</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="input-group input-group-sm mb-3">
                </div>
                <p>
                <span class="input-group-text" id="inputGroup-sizing-sm">Chapter</span>
                <select class="form-select" v-model="selectedChapter">
                  <option v-for="chapter in this.chapters" :key='chapter' :value="chapter._id">{{chapter.chapterTitle}}</option>
                </select>
                </p>
                <p>
                <span class="input-group-text" id="inputGroup-sizing-sm">Section</span>
                <select class="form-select" v-model="selectedSection">
                  <option v-for="section in this.getCorrespondingSections" :key='section' :value="section._id">{{section.sectionTitle}}</option>
                </select>
                </p>
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <div v-if="this.selectedSection != '' && this.selectedChapter != ''">
                <router-link :to="{ name: 'newQuiz', params: { classID: this.classID, chapterID: this.selectedChapter, sectionID: this.selectedSection } }" class='text-primary'>
                  <button type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#quiz-modal">
                    Add Quiz 
                  </button>
                </router-link>
              </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
</template>

<script>
import ClassService from '../services/ClassService'
import CourseService from '../services/CourseService'
import QuizService from '../services/QuizService'

  export default{
    name: 'course',
    data(){
      return{
        courseID: '',
        classID: '',
        content: [],
        allQuizzes: [],
        chapters: [],
        newChapter: '',
        newSection: '',
        selectedChapter: '',
        selectedSection: '',
        file: '',
        filename: '',
        links: [],
        files: [],
        newLink: ''
      }
    },
    methods: {
      downloadFile(filename) {
        CourseService.retrieveContent(filename)
          .then(response => {
            var docType = filename.split('.')
            var mimeType = {
              pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
              docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              pdf: 'application/pdf',
              mp4: 'video/mp4',
              avi: 'video/x-msvideo',
              mpeg: 'video/mpeg',
            } 
            const blob = new Blob([response.data], { type: mimeType[docType] })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = filename
            link.click()
            URL.revokeObjectURL(link.href)

          })
      },
      deleteQuiz(quizID){
        QuizService.deleteQuiz(quizID)
          .then(response => {
            alert(response.data.message)
          })

      },
      addChapter(){
        ClassService.addNewChapter(this.classID, this.newChapter)
          .then(response => {
            if (response.data.message.includes('successfully')){
              this.newChapter = ''
              alert("Chapter added!")
            }
          })
      },
      addSection(){
        ClassService.addNewSection(this.classID, this.selectedChapter, this.newSection)
          .then(response => {
            if (response.data.message.includes('successfully')){
              this.selectedChapter = ''
              this.newSection = ''
              alert("Section added!")
            }
          })
      },
      addLinks(){
        var payload = {
          "links": [this.newLink]
        }
        ClassService.addNewLinks(this.classID, this.selectedChapter, this.selectedSection,payload)
          .then(response => {
            if (response.data.message.includes('successfully')){
              this.selectedChapter = ''
              this.newSection = ''
              alert("Content added!")
            }
          })
      },
      fillData(section, chapter){
        this.selectedChapter = chapter._id
        this.selectedSection = section._id
        this.selectedChapterContent = chapter.chapterTitle
        this.selectedSectionContent = section.sectionTitle

      },
      getChapterSections(){
        var index = this.chapters.indexOf(this.selectedChapter)
        if (this.selectedChapter == ''){
          return null
        }
        console.log(this.chapters[index].sections)
        return this.chapters[index].sections
      },
      submitFile(){
        let formData = new FormData()
        formData.append('file', this.file)
        ClassService.addNewFile(this.classID, this.selectedChapter, this.selectedSection, formData)
          .then(response => {
            console.log(response.data)
            if (response.data.message.includes('successfully')){
              this.selectedChapter = ''
              this.newSection = ''
              alert("Content added!")
            }

          })
          .catch(e => {
            console.log(e)
          })
      },
      handleFileUpload(event){
        this.file = event.target.files[0];
      },
      
    },
    computed: {
      getCorrespondingSections(){
        var result = this.chapters.filter(obj => {
            return obj._id === this.selectedChapter
        })
        
        if (result.length == 0){
          return []
        }else{
          var chapter = JSON.parse(JSON.stringify(result))
          console.log(chapter)
          return chapter[0].sections
        }
      }

    },
    created: function(){
      this.classID = this.$route.params.classID.split('-')[0];
      this.courseID = this.$route.params.classID.split('-')[1];
      CourseService.getCourseInfo(this.courseID)
        .then(response => {
          console.log(response.data)
          this.courseTitle = response.data.courses[0].courseTitle;
      })


      ClassService.getClassContent(this.classID)
        .then(response => {
          console.log(response)
          this.chapters = response.data.chapters
        })

      ClassService.getQuizQuestions(this.classID)
        .then(response => {
          console.log(response.data)
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

h4,h3 {
    text-align: center;
}

</style>