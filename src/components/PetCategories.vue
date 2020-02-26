<template>
  <div class="pet-categories">
    <h2 v-if="!loading">What kind of pet are you looking for?</h2>
    <div
      class="pet-categories"
      v-if="!loading"
    >
      <div
        v-for="category in categories"
        :key='category.id'
        class="pet"
        @click="petSelected(category)"
      >
        <div>
          <h2>{{category.name}}</h2>
        </div>

      </div>

    </div>
    <div v-else>
      <loading msg='Fetching Available Pet Categories...' />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '../components/Loading'

export default {
  components: { Loading },
  methods: {
    petSelected (category) {
      this.$router.push('/pets/categories/' + category.slug + '/1')
    }
  },
  computed: mapState({
    categories: state => state.categories,
    loading: state => state.loading
  })
}
</script>
<style lang="scss" scoped>
@import "@/styles/_vars.scss";

* {
  transition: 0.5s ease;
}
.pet-categories {
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
  background: $dark-blue;
  margin: 3%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background: $light-green;
  }
}
</style>
