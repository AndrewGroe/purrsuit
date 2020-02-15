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
  <div v-else>
    <loading />
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import Pet from './Pet.vue'
import Loading from './Loading.vue'

export default {
  name: 'PetList',
  components: { Pet, Loading },
  created () {
    this.getPetsByCategory()
  },
  methods: {
    ...mapActions(['getPetsByCategory'])
  },
  computed: mapState({
    category: state => state.currentCategory,
    page: state => state.currentPage,
    pets: state => state.pets,
    loading: state => state.loading
  })
}
</script>

<style scoped lang="scss">
.pet--list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}
</style>
