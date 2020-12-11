<template>
  <div id="app">
  <div class="header">
    <div id="nav">
      <h1>Ethan's personal book club!</h1>
      <router-link to="/">My Favorite Reads!</router-link> ||
      <router-link to="/toread">   My To Read!</router-link> ||
      <router-link to="/admin">Recommendations!</router-link> ||
      <router-link to="/myadmin">Edit Favorite Reads</router-link> ||
      <router-link to="/editToReads">Edit To Reads</router-link> ||
    </div>
  </div>
  <div class = "content">
    <router-view/>
  </div>
  <div class="footer">
    <a href="https://github.com/BYU-CS-260-Winter-2020/lab-4-museum-of-ordinary-objects-ethanfine1">GITHUB</a>
  </div>
  </div>
</template>

<style>
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}
.header {
  background: #483D8B;
  color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: pink;
}
</style>
