<template>
  <div class="pet">
    <!-- Thumbnail -->
    <div
      v-if="pet.photos && pet.photos.length"
      class="pet__thumbnail"
    >
      <img :src='pet.photos[0].small'>
    </div>

    <h3 class="pet__name">{{ pet.name }}</h3>
    <h5 class="pet__species">{{ pet.species }}</h5>
    <span class="pet__breed">{{ pet.breeds.primary }} {{ pet.breeds.secondary}}</span>
    <div class="pet__age">{{ pet.age }}</div>
  </div>
</template>

<script>
export default {
  props: {
    pet: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
