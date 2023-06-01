import { createRouter, createWebHistory } from 'vue-router'
import MovieView from '../views/admin/MovieView.vue'
import MovieList from "../pages/admin/movie/MovieList.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: MovieView,
      children: [
        {
          path: '/admin',
          name: 'movie',
          component: MovieList,
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
