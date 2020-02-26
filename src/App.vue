<template>
  <div id="app">
    <div id="nav">
      <h1 class="site-title">Purrsuit</h1>
      <div class="router">
        <router-link to="/">Home</router-link> |
        <router-link to="/pets/categories">Pets</router-link> |
        <router-link to="/about">About</router-link>
      </div>

    </div>
    <router-view />
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
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  a {
    font-weight: bold;
    color: $dark-blue;
    text-decoration: none;

    &.router-link-exact-active {
      color: #fff;
      text-decoration: underline;
    }
  }
  h1 {
    padding-left: 4%;
    color: #fff;
    font-style: bold;
  }
  .router {
    padding-right: 4%;
  }
}
</style>
