import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    categories: [],
    pets: [],
    current: {
      category: '',
      page: 0
    }
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
          }
          )
      }
      context.commit('setLoading', false)
    },
    getPetsByCategory (context, type) {
      context.commit('setLoading', true)
      axios
        .get('.netlify/functions/petfinder?pets=' + type)
        .then((response) => {
          context.commit('setPets', response.data)
          context.commit('setLoading', false)
        }
        )
    }
  },
  modules: {
  }
})
