import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/admin/HomePage.vue'
import MovieList from "../pages/admin/movie/MovieList.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: 'movie',
          name: 'movie',
          component: MovieList,
        },
        {
          path: 'cinema',
          name: 'cinema',
          component:  () => import('@/pages/admin/cinemas/CinemaList.vue') ,
        }
      ]
    },
   
  ]
})

export default router
