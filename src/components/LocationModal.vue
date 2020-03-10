<template>
  <div class="modal">
    <div class="modal__content">
      <h2>Location</h2>
      <p>In order to display pets near you, please enter your desired search location below.</p>

      <div class="location">
        <AutocompleteInput
          class="location__input"
          :suggestions="suggestions"
          :location="location"
          v-on:get-suggestions="getAutocomplete"
          v-on:suggestion-selected="locationSelected"
        />

        <icon-base
          class="location__icon"
          icon-name="find me"
          width="24"
          height="24"
          v-on:clicked="getGeocode"
        >
          <icon-location />
        </icon-base>
      </div>

      <label for="distances">Distance: </label>
      <select
        id="distances"
        @change="distanceSelected"
      >
      </select>

      <div class="modal__controls">
        <button
          class="confirm-btn"
          @click="$emit('done',{input,selectedDistance})"
        >Confirm</button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AutocompleteInput from './ui/AutocompleteInput.vue'
import IconBase from './icons/IconBase.vue'
import IconLocation from './icons/IconLocation.vue'
export default {
  components: { AutocompleteInput, IconBase, IconLocation },
  name: 'LocationModal',
  data () {
    return {
      input: '',
      selectedDistance: 100,
      distances: [5, 10, 20, 50, 100, 250, 500]
    }
  },
  mounted () {
    // Check for Geolocation API
    if ('geolocation' in navigator) {
    } else {
      document.querySelector('.location__icon').setAttribute('style', 'visibility: hidden')
    }

    if (this.location !== '') {
      this.input = this.location
    }
    // Set dropdown values
    let dropdown = document.querySelector('#distances')
    this.distances.forEach((element) => {
      let option = document.createElement('option')
      option.value = element
      option.innerHTML = element

      if (element === this.userDistance || option.value === this.userDistance) {
        option.selected = true
      }
      dropdown.appendChild(option)
      this.selectedDistance = this.userDistance
    })
    // Handle Enter key press
    let input = document.querySelector('.location__input')
    input.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        document.querySelector('.confirm-btn').click()
      }
    })
  },
  methods: {
    ...mapActions(['setUserLocation', 'getGeocode', 'getAutocomplete']),
    locationSelected (selected) {
      this.input = selected
    },
    distanceSelected () {
      let dropdown = document.querySelector('#distances')
      this.selectedDistance = this.distances[dropdown.selectedIndex]
    }
  },
  computed: mapState({
    location: state => state.userLocation,
    userDistance: state => state.userDistance,
    suggestions: state => state.locationSuggestions
  })
}
</script>

<style lang='scss' scoped>
@import "@/styles/_vars.scss";

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $bg-color;
    padding: 1rem 1.5rem;
    width: 24rem;
    border-radius: 0.5rem;
  }

  .location {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin: 2% 0;
    &__icon {
      :hover {
        cursor: pointer;
        transition: all 800ms;
        color: $light-green;
      }
    }
  }
}
.confirm-btn {
  margin-top: 2%;
  background-color: $light-green;
}
</style>
