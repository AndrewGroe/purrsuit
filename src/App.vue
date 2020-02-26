<template>
  <div id="app">
    <div id="nav">
      <div class="nav-content">

        <h1 class="site-title">Purrsuit</h1>
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

#nav {
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
  .nav-content {
    margin: 0 4%;
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    justify-content: space-between;
  }
  h1 {
    color: #fff;
    font-style: bold;
  }
}

// Transitions
.views {
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
