<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbarVue from './components/navbar.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
</script>

<template>
  <header>
    <navbarVue />
  </header>

  <main class="mt-5 bg-white">
    <router-view></router-view>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>