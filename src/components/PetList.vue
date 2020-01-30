<template>
  <div class="pet_list">
    <pet />
    {{pets}}
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
        .then(response => (this.pets = response))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
