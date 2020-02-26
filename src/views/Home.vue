<template>
  <div class="home">
    <div class="bg">
      <img
        class="bg-image"
        src="../../public/dog.svg"
      />
    </div>

    <div class="cta">
      <h2>Welcome to Purrsuit!</h2>
      <p class="subtitle">powered by Petfinder&#169;</p>
      <router-link to="/pets/categories">
        <button class="cta-btn">Get Started</button>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  mounted () {
    // get height offset from navbar
    let element = document.querySelector('.home')
    let home = element.getBoundingClientRect()
    // push bg image down by offset
    let bgImage = document.querySelector('.bg-image')
    bgImage.setAttribute('style', `height:calc(100vh - ${home.top}px)`)
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

* {
  transition: 0.5s ease;
}

.home {
  display: flex;
}

.bg {
  flex: 1 1 auto;
  align-self: flex-start;
}

.cta {
  flex: 0 1 auto;
  margin-right: 4%;
  align-self: center;
}

.cta-btn {
  font-size: 2rem;
  color: $dark-blue;
  background-color: $light-green;
  border-radius: 35px;
  border: 1px solid $dark-blue;
  cursor: pointer;

  &:hover {
    background-color: $dark-blue;
    color: white;
    border: 1px solid $light-green;
  }
}

.subtitle {
  font-style: italic;
}
</style>
