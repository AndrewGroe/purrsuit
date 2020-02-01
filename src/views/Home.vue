<template>
  <div class="home">
    <PetList />
  </div>
</template>

<script>
// @ is an alias to /src

import PetList from '@/components/PetList.vue'

export default {
  name: 'home',
  components: {

    PetList
  }
}
</script>
