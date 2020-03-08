<template>
  <div class="card">
    <div class="card__thumbnail">
      <img :src="imgSrc" />
    </div>
    <div class="card__overlay">
      <div class="card__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

* {
  margin: 0;
  padding: 0;
  outline: 0;

  transition: 0.5s ease;
}
.card {
  border-radius: 4%;
  position: relative;
  width: 200px;
  height: 180px;
  overflow: hidden;
  background: $light-green;

  &:hover &__overlay {
    height: 100%;
    opacity: 1;
  }
  &:hover img {
    opacity: 0.5;
  }

  img {
    background-color: $dark-blue;
    opacity: 1;
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    max-height: 100%;
    min-width: 100%;
    transform: translate(-50%, -50%);
  }
  &__overlay {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    width: 100%;
    height: 0;
  }
  &__content {
    width: 100%;
    color: white;
    opacity: 1;
    padding-top: 8%;
  }
}
</style>>
