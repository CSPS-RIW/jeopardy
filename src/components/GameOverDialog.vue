<template>
    <div class="game-over-dialog">
      <div class="container">
        <h2>Game Over</h2>
        <p>Your final score is: {{ finalScore }}</p>
        <button class="game-button" @click="$emit('update:retry')">Retry</button>
      </div>
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
  
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  .game-over-dialog {
    text-align: center;
    background-color: #000f52;
    border-radius: 10px;
    max-width: 700px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .container {
    padding: 2rem;
    background-color: #060ce9;
    color: #ffCC00;
    border: 2px solid #ffCC00;
    font-size: 20px;
  }
  </style>
  