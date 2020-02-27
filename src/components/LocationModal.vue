<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Location</h2>
      <p>In order to display pets near you, please enter your desired search location below.</p>

      <input
        class="location-input"
        v-model='location'
        placeholder="ex: Orlando, Florida"
      />
      <button>Find me</button>
      <p>Valid inputs include city, state or postal code</p>
      <div class="modal-controls">
        <button
          class="confirm-btn"
          @click="setUserLocation(location)"
        >Confirm</button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      location: ''
    }
  },
  mounted () {
    // Handle Enter key press
    let input = document.querySelector('.location-input')
    input.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        document.querySelector('.confirm-btn').click()
      }
    })
  },
  methods: {
    ...mapActions(['setUserLocation'])
  }
}
</script>

<style lang='scss'>
@import "@/styles/_vars.scss";

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $bg-color;
  padding: 1rem 1.5rem;
  width: 24rem;
  border-radius: 0.5rem;
}

.confirm-btn {
  background-color: $light-green;
}
</style>
