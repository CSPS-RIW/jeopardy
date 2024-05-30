<template>
    <div class="container" :class="{ 'player-turn': player.isPlayerTurn }">
      <div class="score-board">
        <h2>{{ player.name }}</h2>
        <p>Your score: {{ player.score }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useScoreStore } from '../stores/scoreStore.js'
  import { defineProps } from 'vue';

  const props = defineProps({
    player: {
      type: Object,
      required: true
    }
  });

const scoreStore = useScoreStore()
const score = scoreStore.score
  </script>
  
  <style scoped>
    .score-board {
      background-color: var(--dark-bgc);
      color: #fff;
      display: inline-block;
      padding: 20px;
      border-radius: 10px;
      outline: 1px solid #ffffff00;
    }

    h2 {
      font-size: 28px;
      color: #fff;
    }

    p {
      font-size: 18px;
    }

    .container {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    .player-turn {
  font-weight: bold;
  border: 2px solid yellow;
}
  </style>
  