<template>
  <div class="home">
    <div class="bg">
      <img
        class="bg__image"
        src="../../public/dog.svg"
      />
    </div>

    <div class="cta">
      <h2>Welcome to Purrsuit!</h2>
      <p class="cta__subtitle">powered by Petfinder&#169;</p>
      <router-link to="/pets/categories">
        <button class="cta__btn">Get Started</button>
      </router-link>
    </div>

  </div>
</template>

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

  &__image {
    padding-top: 1%;
    max-width: 100%;
    height: calc(100vh - 92px);
  }
}

.cta {
  flex: 0 1 auto;
  margin-right: 4%;
  align-self: center;

  &__btn {
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

  &__subtitle {
    font-style: italic;
  }
}
// Media Queries
@media (max-width: 700px) {
  .home {
    display: block;
  }

  .bg__image {
    width: 100%;
  }

  .cta {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 4%;
  }
}
</style>
