<template>

  <div v-if='pets.length'>
    <div class="page-nav">
      <div>Category: {{categoryTitle}}</div>
      <div>Location: {{location}}</div>
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
  methods: {
    ...mapActions(['setCurrentPage', 'getPetsByCategory']),
    paginate (page) {
      let newPage
      if (page === 'next') {
        newPage = Number(this.page) + 1
      } else newPage = Number(this.page) - 1

      this.setCurrentPage(newPage)
      this.getPetsByCategory()
      this.$router.push(`/pets/categories/${this.category}/${newPage}`)
    }
  },
  computed: mapState({
    categoryTitle: state => state.currentPageTitle,
    category: state => state.currentCategory,
    page: state => state.currentPage,
    totalPages: state => state.totalPages,
    pets: state => state.pets,
    loading: state => state.loading,
    location: state => state.userLocation
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

.pagination {
  margin: 2% 0;
  font-size: 1.1rem;

  button {
    font-size: 1.2rem;
    border-radius: 8%;
  }
}
</style>
