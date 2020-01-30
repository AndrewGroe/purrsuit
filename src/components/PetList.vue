<template>
  <div class="pet--list">
    <pet
      v-for="pet in pets"
      :key="pet.id"
      :pet="pet"
    />
  </div>
</template>

<script>

import Pet from './Pet.vue'
import axios from 'axios'

export default {
  name: 'PetList',
  components: { Pet },
  data () {
    return {
      pets: [],
      images: []
    }
  },
  mounted () {
    this.getPets()
  },
  methods: {
    getPets () {
      axios
        .get('.netlify/functions/petfinder')
        .then(response => (this.pets = response.data))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
