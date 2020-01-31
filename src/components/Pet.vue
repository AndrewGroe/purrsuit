<template>
  <div class="pet">
    <!-- Thumbnail -->
    <div
      v-if="pet.photos && pet.photos.length"
      class="pet__thumbnail"
    >
      <img :src='pet.photos[0].small'>
    </div>
    <div class="pet__details">
      <h3 class="pet__name">{{ pet.name }}</h3>
      <div class="pet__species">{{ pet.species }}</div>
      <div class="pet__gender">{{pet.gender}}</div>
      <span class="pet__breed">Breed: {{ pet.breeds.primary }}</span> <span v-if="pet.breeds.secondary"> + {{ pet.breeds.secondary}}</span>
      <div class="pet__age">Age: {{ pet.age }}</div>
      <div class="pet__location">{{pet.contact.address.city}}, {{pet.contact.address.state}}</div>
      <a :href=pet.url>Learn More</a>
    </div>
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
.pet {
  margin: 4px;
  background-color: blanchedalmond;
  flex: 200px;
  display: flex;
  flex-direction: column;
}
.pet__details {
}
</style>
