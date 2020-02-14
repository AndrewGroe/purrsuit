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
  data () {
    return {
      type: this.$route.params
    }
  },
  created () {
    this.getPetsByCategory(this.type.link)
  },
  methods: {
    ...mapActions(['getPetsByCategory'])
  },
  computed: mapState({
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
