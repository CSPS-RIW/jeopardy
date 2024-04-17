<template>
    <div>
      <h2>Score</h2>
      <p>Your score: {{ score }}</p>
    </div>
  </template>
  
  <script setup>
  import { useScoreStore } from '../stores/scoreStore.js'

const scoreStore = useScoreStore()
const score = scoreStore.score
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  