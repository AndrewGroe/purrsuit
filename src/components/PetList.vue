<template>
  <div
    class="pet--list"
    v-if='pets.length'
  >

    <pet
      v-for="pet in pets"
      :key="pet.id"
      :pet="pet"
    />
  </div>
  <div
    class="loading"
    v-else
  >
    <loading />
  </div>
</template>

<script>

import Pet from './Pet.vue'
import Loading from './Loading.vue'
import axios from 'axios'

export default {
  name: 'PetList',
  components: { Pet, Loading },
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
.pet--list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}
</style>
