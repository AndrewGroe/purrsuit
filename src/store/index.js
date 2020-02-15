import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    categories: [],
    pets: [],
    currentCategory: {
      name: '',
      slug: ''
    },
    currentPage: 0
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
      state.currentCategory.name = value.name
      state.currentCategory.slug = value.slug
    },
    setCurrentPage (state, value) {
      state.currentPage = value
    }
  },

  actions: {
    getAllCategories (context) {
      context.commit('setLoading', true)
      context.commit('setPets', [])
      if (context.state.categories.length === 0) {
        axios
          .get('.netlify/functions/petfinder?pets=types')
          .then((response) => {
            context.commit('setCategories', response.data)
            context.commit('setLoading', false)
          }
          )
      } else context.commit('setLoading', false)
    },
    getPetsByCategory (context) {
      context.commit('setLoading', true)
      axios
        .get('/.netlify/functions/petfinder?pets=' + context.state.currentCategory.slug)
        .then((response) => {
          context.commit('setPets', response.data)
          context.commit('setLoading', false)
        }
        )
    },
    setCurrentCategory (context, value) {
      context.commit('setCurrentCategory', value)
    },
    setCurrentPage (context, value) {
      context.commit('setCurrentPage', value)
    }
  },
  modules: {
  }
})
