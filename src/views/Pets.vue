<template>
  <div class="pets">
    <transition
      name="component-fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'pets'
}
</script>

<style>
</style>
