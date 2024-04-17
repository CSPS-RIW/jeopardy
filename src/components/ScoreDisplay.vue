<template>
    <div>
      <h2>Score</h2>
      <p>Your score: {{ score }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const score = ref(0)
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  