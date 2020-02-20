import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
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
        component: () => import('../components/PetCategories.vue'),

        beforeEnter: (to, from, next) => {
          store.dispatch('getAllCategories')
            .then(next())
        }
      },
      {
        path: 'categories/:category/:page',
        component: () => import('../components/PetList.vue'),

        beforeEnter: (to, from, next) => {
          // Route & Store Match
          if (
            store.state.currentCategory === to.params.category &&
            store.state.currentPage === to.params.page) {
            console.log('match')

            store.dispatch('getPetsByCategory')
              .then(next())
          } else {
            console.log('no match')

            if (store.state.categories.length < 1) {
              console.log('blank categories')

              store.dispatch('getAllCategories')
                .then(() => store.dispatch('setCurrentCategory', to.params.category))
                .then(() => store.dispatch('setCurrentPage', to.params.page))
                .then(() => store.dispatch('getPetsByCategory'))
                .then(next())
            } else {
              store.dispatch('setCurrentCategory', to.params.category)
                .then(() => store.dispatch('setCurrentPage', to.params.page))
                .then(() => store.dispatch('getPetsByCategory'))
                .then(next())
            }
          }
        }
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
