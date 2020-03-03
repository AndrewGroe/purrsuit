<template>
  <div>
    <transition name="component-fade">
      <div v-if='pets.length'>
        <div class="page-nav">
          <div>Category: {{categoryTitle}}</div>
          <div>Location: {{location}}</div>
          <div>Distance: {{userDistance}} miles</div>

          <icon-base
            class="gear-icon"
            icon-name="change"
            width="24"
            height="24"
            v-on:clicked="showModal = true"
          >
            <icon-settings />
          </icon-base>

          <div class="pagination">
            <button
              v-if="page != 1"
              @click="paginate('previous')"
            >Previous</button>
            page {{page}}/{{totalPages}}
            <button
              v-if="page != totalPages"
              @click="paginate('next')"
            >Next</button>
          </div>
        </div>
        <div class="pet--list">
          <pet
            v-for="pet in pets"
            :key="pet.id"
            :pet="pet"
          />
        </div>
        <div class="page-nav">
          <div class="pagination">
            <button
              v-if="page != 1"
              @click="paginate('previous')"
            >Previous</button>
            page {{page}}/{{totalPages}}
            <button
              v-if="page != totalPages"
              @click="paginate('next')"
            >Next</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- Loading Spinner -->
    <transition name="component-fade">
      <div v-if="loading">
        <loading />
      </div>
    </transition>

    <transition name="component-fade">
      <div v-if="showModal">
        <location-modal v-on:done="updateLocation" />
      </div>
    </transition>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import Pet from './Pet.vue'
import Loading from './Loading.vue'
import LocationModal from './LocationModal.vue'
import IconBase from './icons/IconBase.vue'
import IconSettings from './icons/IconSettings.vue'

export default {
  name: 'PetList',
  components: { Pet, Loading, LocationModal, IconBase, IconSettings },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    ...mapActions(['setCurrentPage', 'getPetsByCategory', 'setUserLocation', 'setUserDistance']),
    paginate (page) {
      let newPage
      if (page === 'next') {
        newPage = Number(this.page) + 1
      } else newPage = Number(this.page) - 1

      this.$router.push(`/pets/categories/${this.category}/${newPage}`)
    },
    updateLocation (update) {
      this.setUserLocation(update.input)
      this.setUserDistance(update.selectedDistance)
      this.showModal = false
      this.getPetsByCategory()
    }
  },
  computed: mapState({
    categoryTitle: state => state.currentPageTitle,
    category: state => state.currentCategory,
    page: state => state.currentPage,
    totalPages: state => state.totalPages,
    pets: state => state.pets,
    loading: state => state.loading,
    location: state => state.userLocation,
    userDistance: state => state.userDistance
  }),
  beforeRouteUpdate (to, from, next) {
    this.setCurrentPage(to.params.page)
    this.getPetsByCategory()
    next()
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_vars.scss";
.pet--list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.pagination {
  margin: 2% 0;
  font-size: 1.1rem;

  button {
    font-size: 1.2rem;
    border-radius: 8%;
  }
}

.gear-icon {
  cursor: pointer;
  transition: all 800ms;
  &:hover {
    color: $light-green;
  }
}
</style>
