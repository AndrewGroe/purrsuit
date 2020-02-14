<template>
  <div class="home">
    <h2 v-if="!loading">What kind of pet are you looking for?</h2>
    <div
      class="pet-types"
      v-if="!loading"
    >
      <router-link
        v-for="type in categories"
        :key='type.id'
        class="pet"
        :to="{ name: 'pets', params: type}"
      >
        <div>
          <h2>{{type.name}}</h2>
        </div>

      </router-link>

    </div>
    <div v-else>
      <loading msg='Fetching Available Pet Types...' />
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from '../components/Loading'

export default {
  name: 'home',
  components: { Loading },
  created () {
    this.getAllCategories()
  },
  methods: {
    ...mapActions(['getAllCategories'])
  },
  computed: mapState({
    categories: state => state.categories,
    loading: state => state.loading
  })
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

  &:hover {
    background: #5e7078;
  }
}
a {
  text-decoration: none;
}
</style>
