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
            <li class="nav-item">
              Course
            </li>
          </ul>
          <div class="nav-item dropdown">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
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
