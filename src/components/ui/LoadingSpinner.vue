<template>
  <div class="loading">
    <div class="loader"></div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 16px solid $light-green;
  border-radius: 50%;
  border-top: 16px solid $dark-blue;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
