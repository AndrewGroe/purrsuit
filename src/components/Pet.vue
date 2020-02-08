<template>
  <div class="pet">
    <div v-if="pet.photos && pet.photos.length">
      <card :imgSrc="pet.photos[0].small">

        <h3 class="pet__name">{{ pet.name }}</h3>
        <div class="pet__species">{{ pet.species }}</div>
        <div class="pet__gender">{{pet.gender}}</div>
        <span class="pet__breed">{{ pet.breeds.primary }}</span> <span v-if="pet.breeds.secondary"> + {{ pet.breeds.secondary}}</span>
        <div class="pet__age">Age: {{ pet.age }}</div>
        <div class="pet__location">{{pet.contact.address.city}}, {{pet.contact.address.state}}</div>
        <a :href=pet.url>Learn More</a>
      </card>

    </div>
    <div v-else>
      <card imgSrc="https://cdn.pixabay.com/photo/2014/04/03/00/42/footprints-309158_960_720.png">

        <h3 class="pet__name">{{ pet.name }}</h3>
        <div class="pet__species">{{ pet.species }}</div>
        <div class="pet__gender">{{pet.gender}}</div>
        <span class="pet__breed">{{ pet.breeds.primary }}</span> <span v-if="pet.breeds.secondary"> + {{ pet.breeds.secondary}}</span>
        <div class="pet__age">Age: {{ pet.age }}</div>
        <div class="pet__location">{{pet.contact.address.city}}, {{pet.contact.address.state}}</div>
        <a :href=pet.url>Learn More</a>
      </card>

    </div>

  </div>

</template>

<script>
import Card from './ui/Card.vue'
export default {
  components: { Card },
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
