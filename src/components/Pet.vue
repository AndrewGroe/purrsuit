<template>
  <div class="pet">
    <div class="card__top">
      <!-- Thumbnail -->
      <div
        v-if="pet.photos && pet.photos.length"
        class="pet__thumbnail"
      >
        <img :src='pet.photos[0].small'>
      </div>
      <div
        v-else
        class="pet__thumbnail"
      >
        <img src='https://cdn.pixabay.com/photo/2014/04/03/00/42/footprints-309158_960_720.png'>
      </div>
      <div class="card__top details">
        <h3 class="pet__name">{{ pet.name }}</h3>
        <div class="pet__species">{{ pet.species }}</div>
        <div class="pet__gender">{{pet.gender}}</div>
        <span class="pet__breed">Breed: {{ pet.breeds.primary }}</span> <span v-if="pet.breeds.secondary"> + {{ pet.breeds.secondary}}</span>
        <div class="pet__age">Age: {{ pet.age }}</div>
        <div class="pet__location">{{pet.contact.address.city}}, {{pet.contact.address.state}}</div>
        <a :href=pet.url>Learn More</a>
      </div>
    </div>
    <div class="pet__details">
      <h2 class="pet__name">{{ pet.name }}</h2>
      <div class="pet__species">{{ pet.species }}</div>
      <span class="pet__breed">Breed: {{ pet.breeds.primary }}</span> <span v-if="pet.breeds.secondary"> + {{ pet.breeds.secondary}}</span>
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
* {
  margin: 0;
  padding: 0;
}
.pet {
  width: 180px;
  min-height: 180px;
  margin: 4px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  &:hover .card__top {
    min-height: 180px;

    &.details {
      display: block;
    }
  }
  &:hover .pet__details {
    display: none;
  }
}
.card__top {
  background-color: blanchedalmond;
  width: 100%;
  overflow: hidden;

  &.details {
    display: none;
  }
}
.pet__details {
  min-height: 180px;
}
.pet__thumbnail {
  width: 90px;
  height: 90px;
  margin: 0 auto 15px auto;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
