<template>
    <div class="game-over-dialog">
      <div class="container">
        <h2>{{ t("gameOver.title") }}</h2>
        <h3>{{ t("gameOver.finalScores") }}</h3>
        <div v-for="(player, index) in playerStore.players" :key="index">

          <p>{{ displayName(player, index) }}: {{ player.score }}</p>
        </div>
        
        <button class="game-button mr-1" @click="$emit('update:reset')">{{ t("gameOver.resetButton") }}</button>
        <button class="game-button ml-1" @click="$emit('update:retry')">{{ t("gameOver.back") }}</button>
      </div>
    </div>
  </template>
  
  <script setup>

  import { usePlayerStore } from '@/stores/playerStore';
  import { useI18n } from "vue-i18n";
  const { t, locale, availableLocales } = useI18n()

  let lang = document.querySelector('html').getAttribute('lang')

  const playerStore = usePlayerStore()
  
  const props = defineProps({
    finalScore: {
      type: Number,
      required: true
    }
  })

  const displayName = (player, index) => {
    if(lang ="fr") {
      return player.name.length > 0 ? player.name : 'Joueur ' + (index + 1);
    } else {
      return player.name.length > 0 ? player.name : 'Player ' + (index + 1);
    }
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
    border: 5px solid var(--main-yellow);
    font-size: 20px;
    border-radius: 5px;
  }
  </style>
  