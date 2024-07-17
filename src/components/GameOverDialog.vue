<template>
    <div class="game-over-dialog">
      <div class="container">
        <h2>Game Over</h2>
        <h3>Final Scores</h3>
        <div v-for="(player, index) in playerStore.players" :key="index">

          <p>{{ displayName(player, index) }}: {{ player.score }}</p>
        </div>
        
        <button class="game-button" @click="$emit('update:reset')">Reset (same players)</button>
        <button class="game-button" @click="$emit('update:retry')">Back to Main Menu</button>
      </div>
    </div>
  </template>
  
  <script setup>

  import { usePlayerStore } from '@/stores/playerStore';

  const playerStore = usePlayerStore()
  
  const props = defineProps({
    finalScore: {
      type: Number,
      required: true
    }
  })

  const displayName = (player, index) => {
      return player.name.length > 0 ? player.name : 'Player ' + (index += 1);
    };
  
  </script>
  
  <style scoped>
  h2, h3 {
    color: var(--main-yellow)
  }
  /* Add your component-specific styles here */
  .game-over-dialog {
    text-align: center;
    background-color: var(--dark-bgc);
    border-radius: 10px;
    max-width: 700px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    padding: 2rem;
    background-color: var(--game-button-blue);
    color: var(--main-yellow);
    border: 2px solid var(--main-yellow);
    font-size: 20px;
  }
  </style>
  