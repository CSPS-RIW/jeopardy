<template>
    <div class="game-over-dialog">
      <h2>Game Over</h2>
      <p>Your final score is: {{ finalScore }}</p>
      <button @click="retry">Retry</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    finalScore: {
      type: Number,
      required: true
    }
  })
  
  const retry = () => {
    // Emit an event to notify the parent component (GameBoard.vue) to restart the game
    emit('retry')
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  .game-over-dialog {
    text-align: center;
  }
  </style>
  