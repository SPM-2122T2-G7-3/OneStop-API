<template>
  <div class="home">
    <div id='header'>
      <h1>Welcome Back</h1>
      <h2>{{'name'}}</h2>
      <h3>
        What would you like to do today?
      </h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return{
      name: null,
    }
  },
  methods: {

  },
  mounted: function(){
    
  }
}
</script>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}

h1 { 
  font-size: 350%; 
  padding-top: 30px;
}

h2 { 
  font-size: 320%; 
}

</style>
