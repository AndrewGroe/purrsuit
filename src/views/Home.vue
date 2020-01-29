<template>
  <div class="home">
    <Loading />
    <PetList />
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from '@/components/Loading.vue'
import PetList from '@/components/PetList.vue'

export default {
  name: 'home',
  components: {
    Loading,
    PetList
  }
}
</script>
