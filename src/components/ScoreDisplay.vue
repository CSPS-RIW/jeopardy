<template>
    <div class="container">
      <div class="score-board">
        <h2>Score</h2>
        <p>Your score: {{ score }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useScoreStore } from '../stores/scoreStore.js'

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
    }

    p {
      font-size: 18px;
    }

    .container {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  </style>
  