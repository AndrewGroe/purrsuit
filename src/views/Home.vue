<template>
  <div class="home">
    <h2 v-if="petTypes.length">What kind of pet are you looking for?</h2>
    <div
      class="pet-types"
      v-if="petTypes.length"
    >
      <div
        class="pet"
        v-for="type in petTypes"
        :key='type.id'
      >
        <h2>{{type}}</h2>
      </div>
    </div>
    <div v-else>
      <loading msg='Fetching Available Pet Types...' />
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading'

export default {
  name: 'home',
  components: { Loading },
  data () {
    return {
      petTypes: []
    }
  },
  mounted () {
    this.getPetTypes()
  },
  methods: {
    getPetTypes () {
      axios
        .get('.netlify/functions/petfinder?pets=types')
        .then(response => (this.petTypes = response.data))
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  transition: 0.5s ease;
}
.pet-types {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}
.pet {
  color: #ecf0f1;
  width: 200px;
  height: 180px;
  border-radius: 4%;
  background: #768a92;
  margin: 3%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  &:hover {
    background: #5e7078;
  }
}
</style>
