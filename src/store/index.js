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
    toggleLoading (state) {
      state.loading = !state.loading
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
      axios
        .get('.netlify/functions/petfinder?pets=types')
        .then((response) => {
          context.commit('setCategories', response.data)
          context.commit('toggleLoading')
        }
        )
    },
    getPetsByCategory (context, type) {
      axios
        .get('.netlify/functions/petfinder?pets=' + type)
        .then(response => (context.commit('setPets', response.data)))
    }
  },
  modules: {
  }
})
