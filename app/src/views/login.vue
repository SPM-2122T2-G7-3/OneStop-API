<template>
  <div id='login'>
      <div class="container mt-5">
            <div class="mb-3 text-center">
                <h1>LMS Login</h1>
                <label><h2>Please enter your username:</h2>
                <div v-if="isNotFilled" class="text-danger mb-2">Please enter a username</div>
                <input type="text" v-model='username' @keyup.enter="attemptLogin()"></label><br>
                <button type="submit" class="btn btn-primary mt-3" @click='attemptLogin()'>Login</button>
            </div>
      </div>
  </div>
</template>

<script>
import UserService from '../services/UserService'

export default {
  data(){
    return{
        username: '',
        isNotFilled: false
    }
  }, 
  methods: {
      attemptLogin(){
          if (this.username == '' || this.username == null){
            this.isNotFilled = !this.isNotFilled
          }else{
            this.isNotFilled == false;
            UserService.login(JSON.stringify({
                "username": this.username
              })).then(
                  response => {
                      document.cookie = `username=${response.data.username}`+'; Path=/;';
                      document.cookie = `role=${response.data.role}`
                      this.$router.push('/home')
                  }
              )


          }
      }
  },
  created: function(){
      if (this.$root.readCookie('username') != null){
          this.$router.push('/home')
      }else{
          this.username = this.$root.readCookie('username')
      }
  }

  
}
</script>

<style scoped>

h2 {
  margin: 35px;
  text-align: center;
}



</style>