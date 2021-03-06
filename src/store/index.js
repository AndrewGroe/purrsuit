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
    currentPage: 1,
    totalPages: 0,
    userLocation: '',
    userDistance: 100,
    locationSuggestions: [],
    error: false
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
    setTotalPages (state, value) {
      state.totalPages = value
    },
    setCurrentPageTitle (state, value) {
      state.currentPageTitle = value
    },
    setUserLocation (state, value) {
      state.userLocation = value
    },
    setLocationSuggestions (state, value) {
      state.locationSuggestions = value
    },
    setUserDistance (state, value) {
      state.userDistance = value
    },
    setError (state, value) {
      state.error = value
    }
  },

  actions: {
    // Get zipcode from latitude and longitude
    getGeocode (context) {
      context.commit('setLoading', true)
      navigator.geolocation.getCurrentPosition(function (position) {
        axios.get('/.netlify/functions/geocode', {
          params: {
            coords: `${position.coords.latitude},${position.coords.longitude}`
          }
        }).then((response) => {
          // eslint-disable-next-line quotes
          let text = response.data.data.results[1].address_components.find(({ types }) => types[0] === "postal_code")

          let zip = text.long_name
          context.dispatch('setUserLocation', zip)
        })
      })
    },
    getAutocomplete (context, value) {
      return axios
        .get('/.netlify/functions/autocomplete', {
          params: {
            input: value
          }
        })
        .then((response) => {
          let suggestions = []
          response.data.data.forEach(element => {
            let formattedText = `${element.terms[0].value}, ${element.terms[1].value}`
            suggestions.push(formattedText)
          })
          context.commit('setLocationSuggestions', suggestions)
        })
    },

    getAllCategories (context) {
      context.commit('setLoading', true)
      context.commit('setPets', [])
      if (context.state.userLocation === '' && localStorage.location) {
        context.commit('setUserLocation', localStorage.location)
      }
      if (context.state.userDistance === 100 && localStorage.distance) {
        context.commit('setUserDistance', localStorage.distance)
      }
      if (context.state.categories.length) {
        context.commit('setLoading', false)
      } else {
        return axios
          .get('/.netlify/functions/petfinder?pets=types')
          .then((response) => {
            context.commit('setCategories', response.data)
            context.commit('setLoading', false)
          })
      }
    },
    getPetsByCategory (context) {
      context.commit('setLoading', true)
      context.commit('setError', false)
      context.commit('setPets', [])
      if (context.state.userLocation === '' && localStorage.location) {
        context.commit('setUserLocation', localStorage.location)
      }
      if (context.state.userDistance === 100 && localStorage.distance) {
        context.commit('setUserDistance', localStorage.distance)
      }
      return axios
        .get('/.netlify/functions/petfinder', {
          params: {
            pets: context.state.currentCategory,
            location: context.state.userLocation,
            distance: context.state.userDistance,
            page: context.state.currentPage
          }
        })
        .then((response) => {
          if (context.state.totalPages !== response.data.pagination.total_pages) {
            context.dispatch('setTotalPages', response.data.pagination.total_pages)
          }
          if (response.data.animals.length) {
            context.commit('setPets', response.data.animals)
          } else context.commit('setError', true)

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
    },
    setTotalPages (context, value) {
      context.commit('setTotalPages', value)
    },
    setUserLocation (context, value) {
      localStorage.location = value
      context.commit('setUserLocation', value)
      context.commit('setLoading', false)
    },
    setUserDistance (context, value) {
      localStorage.distance = value
      context.commit('setUserDistance', value)
    }
  },
  plugins: [formattedTitle]

})
