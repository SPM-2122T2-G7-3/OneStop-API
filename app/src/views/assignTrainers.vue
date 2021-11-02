<template>
  <div id='assign'>
      <div class="container mt-5">
          <div class="mb-3 text-center">
              <h1>Assign trainers</h1>
              <div class="container">
                <h2>Please select a course:</h2>
                <select class="form-select" aria-label="Default select example" v-model="selectedCourse">
                  <option v-for="(course) in this.courses" :key='course' :value="course.courseCode">{{course.courseCode}} - {{course.courseTitle}}</option>
                </select>
              </div>
          </div>
        </div>
        <div v-if="selectedCourse != ''" class="container"> 
          <h2>Please select qualified trainers to assign to {{selectedCourse}}:</h2>
          <div class="container">
            <div class="row">
              <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">User ID</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="user id" v-model='searchBox'>
            </div>
            </div>
            <div class="row" v-if="isEmpty()">
              <div class="col-md-3" v-for="(col,index1) in this.colCount" :key='col'>
                <ul style="display: table; margin: 0 auto;" >
                  <template v-for="(n,i) in this.namesPerCol" :key="n">
                  <li v-if="i + index1 * this.namesPerCol < this.trainers.length ? true : false ">
                    <label><input  type="checkbox" class='mt-3' :value="this.trainers[i + index1 * this.namesPerCol][1]" v-model='selectedtrainers'>&nbsp; {{this.trainers[i + index1 * this.namesPerCol][0]}}</label>
                  </li>
                  </template>
                </ul>
              </div>
            </div>
            <div class="row" v-else-if="this.getSearchResults.length == 0">
              <div class="col-md-3"> No trainers found </div>
            </div>
            <div class="row" v-else>
              <div class="col-md-3" v-for="(col) in Math.ceil(this.getSearchResults.length / this.itemsPerCol)" :key='col'>
                <ul style="display: table; margin: 0 auto;" >
                  <li v-for="n in this.getSearchResults" :key="n">
                    <label><input type="checkbox" class='mt-3' :value="n[1]" v-model='selectedtrainers'>&nbsp;{{n[0]}}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mb-3 mt-3 text-center" v-if="this.selectedCourse != ''">              
            <button type="button" class="btn btn-secondary" @click="this.enrolltrainers()">Assign</button>
          </div>
        </div>
  </div>
</template>

<script>

import ClassService from '../services/ClassService'
import UserService from '../services/UserService'


export default {
  data(){
    return{
      courses: [],
      selectedCourse: '',
      itemsPerCol: 5,
      trainers: [],
      selectedtrainers: [],
      classId: "",
      searchBox: '',
    }
  }, 
  methods: {
    enrolltrainers(){
      var payload = {
        "trainers": this.selectedtrainers
      }
      ClassService.updateClassTrainers(this.classId, payload)
      .then(response => {
        console.log(response.data)
        if (response.data.message.includes("successfully")){
          alert(response.data.message)
        }
      })
    },
    isEmpty(){
      if (this.searchBox == ''){
        return true
      }else{
        return false
      }
    },

  },
  computed: {
    colCount(){
      return Math.ceil(this.trainers.length / this.itemsPerCol)
    },
    namesPerCol(){
      return Math.ceil(this.trainers.length / this.colCount)
    },
    getSearchResults(){
      var result = [];
      var qualifiedtrainers = this.trainers
      var query = this.searchBox;
      if (this.searchBox.length == 0){
        return []
      }
      for (const name of qualifiedtrainers){
        var actualName = name[1]
        if (actualName.includes(query)){
          result.push(name)
        }
      }
      return result
    }
    

  },
  created: function(){
    UserService.getUsersByRole('trainer')
      .then(response => {
        var allTrainers = response.data.users;
        for (const trainer of allTrainers){
          this.trainers.push([trainer.empName, trainer.username])
        }
      })

  }
}
</script>

<style scoped>

h2 {
  margin: 35px;
  text-align: center;
}

h4 {
  text-align: center;

}


</style>