import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pets',
    name: 'pets',
    props: true,
    component: () => import('../views/Pets.vue'),
    children: [
      {
        // PetCategories will be rendered inside the Pets <router-view>
        // when /pets/categories is matched
        path: 'categories',
        component: () => import('../components/PetCategories.vue')
      },
      {
        path: 'categories/:category/:page',
        component: () => import('../components/PetList.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
