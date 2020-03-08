<template>
  <div class="pet-categories">

    <div
      class="location-modal"
      v-if="this.userLocation === ''"
    >
      <LocationModal v-on:done="updateLocation" />
    </div>

    <h2 v-if="!loading">What kind of pet are you looking for?</h2>
    <div
      class="categories"
      v-if="!loading"
    >
      <div
        v-for="category in categories"
        :key='category.id'
        class="categories__item"
        @click="petSelected(category)"
      >
        <div>
          <h2>{{category.name}}</h2>
        </div>

      </div>

    </div>
    <div v-else>
      <LoadingSpinner msg='Fetching Available Pet Categories...' />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import LocationModal from '../components/LocationModal.vue'

export default {
  components: { LoadingSpinner, LocationModal },
  methods: {
    ...mapActions(['setUserLocation', 'setUserDistance']),
    petSelected (category) {
      this.$router.push('/pets/categories/' + category.slug + '/1')
    },
    updateLocation (update) {
      this.setUserLocation(update.input)
      this.setUserDistance(update.selectedDistance)
    }
  },
  computed: mapState({
    categories: state => state.categories,
    loading: state => state.loading,
    userLocation: state => state.userLocation
  })
}
</script>
<style lang="scss" scoped>
@import "@/styles/_vars.scss";

* {
  transition: 0.5s ease;
}
.categories {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;

  &__item {
    color: #ecf0f1;
    width: 200px;
    height: 180px;
    border-radius: 4%;
    background: $dark-blue;
    margin: 3%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover {
      background: $light-green;
    }
  }
}
</style>
