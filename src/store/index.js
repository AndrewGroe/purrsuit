import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const formattedTitle = store => {
  store.subscribe(mutation => {
    if (mutation.type === 'setCurrentCategory') {
      let text = store.state.categories.find(({ slug }) => slug === mutation.payload)
      store.dispatch('setCurrentPageTitle', text.name)
    }
  })
}

export default new Vuex.Store({
  state: {
    loading: true,
    categories: [],
    pets: [],
    currentCategory: '',
    currentPageTitle: '',
    currentPage: 1
  },

  mutations: {
    setLoading (state, value) {
      state.loading = value
    },
    setCategories (state, returnedCategories) {
      state.categories = returnedCategories
    },
    setPets (state, returnedPets) {
      state.pets = returnedPets
    },
    setCurrentCategory (state, value) {
      state.currentCategory = value
    },
    setCurrentPage (state, value) {
      state.currentPage = value
    },
    setCurrentPageTitle (state, value) {
      state.currentPageTitle = value
    }
  },

  actions: {
    getAllCategories (context) {
      context.commit('setLoading', true)
      context.commit('setPets', [])
      return axios
        .get('/.netlify/functions/petfinder?pets=types')
        .then((response) => {
          context.commit('setCategories', response.data)
          context.commit('setLoading', false)
        })
    },
    getPetsByCategory (context) {
      context.commit('setLoading', true)
      return axios
        .get('/.netlify/functions/petfinder?pets=' + context.state.currentCategory)
        .then((response) => {
          context.commit('setPets', response.data)
          context.commit('setLoading', false)
        }
        )
    },
    setCurrentCategory (context, value) {
      context.commit('setCurrentCategory', value)
    },
    setCurrentPageTitle (context, value) {
      context.commit('setCurrentPageTitle', value)
    },
    setCurrentPage (context, value) {
      context.commit('setCurrentPage', value)
    }
  },
  plugins: [formattedTitle]

})
