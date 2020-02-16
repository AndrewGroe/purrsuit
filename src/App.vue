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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  background-color: #ecf0f1;
}

#nav {
  width: 100%;
  background-color: #5e7078;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #a0f601;
      text-decoration: underline;
    }
  }
  h1 {
    padding-left: 4%;
    color: #a0f601;
    font-style: bold;
  }
  .router {
    padding-right: 4%;
  }
}
</style>
