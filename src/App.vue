<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style>
/* Add your global styles here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
