import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import newQuiz from '../views/newQuiz.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/course/:courseID',
    name: 'Course',
    component: Course
  },
  {
    path: '/course/:courseID/manageCourse/newQuiz',
    name: 'newQuiz',
    component: newQuiz
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
