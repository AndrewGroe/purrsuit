<template>
  <div id="app">
    <div class="nav">
      <div class="nav__content">
        <div class="header">
          <h1 class="header__title">Purrsuit</h1>
          <span class="header__subtitle">find your next pet today</span>
        </div>

        <div class="router">
          <router-link
            to="/"
            exact
          >Home</router-link> |
          <router-link to="/pets/categories">Pets</router-link> |
          <router-link to="/about">About</router-link>
        </div>
      </div>

    </div>
    <div class="views">
      <transition
        name="component-fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>

  </div>
</template>

<style lang="scss">
@import "styles/_vars.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  background-color: $bg-color;
}

.nav {
  width: 100%;
  background-color: $light-green;

  a {
    font-weight: bold;
    color: $dark-blue;
    text-decoration: none;

    &.router-link-active {
      color: #fff;
      text-decoration: underline;
    }
  }
  &__content {
    margin: 0 4%;
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    justify-content: space-between;

    .header {
      display: flex;
      align-items: baseline;

      &__title {
        color: #fff;
        font-style: bold;
      }
      &__subtitle {
        margin-left: 4%;
        font-style: italic;
        white-space: nowrap;
        font-weight: 600;
      }
    }
  }
}

// Media Queries
@media (max-width: 700px) {
  .header {
    display: flex;
    flex-flow: column nowrap;
    &__title {
      color: #fff;
      font-style: bold;
      margin-bottom: 0;
    }
    &__subtitle {
      font-size: 0.8rem;
      font-style: italic;
      white-space: nowrap;
      font-weight: 600;
    }
  }
}

// Transitions

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
