<template>
  <div class="pet">
    <!-- Thumbnail -->
    <div
      v-if="pet.photos && pet.photos.length"
      class="thumbnail"
    >
      <img :src='pet.photos[0].small'>
    </div>

    <h3>{{ pet.name }}</h3>
    <h5>{{ pet.species }}</h5>
    <span>{{ pet.breeds.primary }} {{ pet.breeds.secondary}}</span>
    {{ pet.age }}
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
