<script setup>
import navbarVue from './components/navbar.vue'
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
</style>