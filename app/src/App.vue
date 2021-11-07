<template>
  <div>
    <nav id="navBar" class="navbar navbar-expand-lg navbar-dark bg-primary text-dark">
      <div class="container-fluid">
        <a class="navbar-brand">
          <router-link class="nav-link text-dark font-weight-bold" to="/">All-In-One LMS</router-link> 
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :class="{active: $route.name==='home'}" class="nav-link" to="/">Home</router-link> 
            </li>
          </ul>
          <div class="nav-item dropdown">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" @click="logout()">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  methods: {
    readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    logout(){
      document.cookie = 'username' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.$router.push('/')

    },
  },
  computed: {
    
  }
}
</script>


<style>
#navBar {
  padding: 20px;
}


</style>
