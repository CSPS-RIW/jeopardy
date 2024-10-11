// score display component. has a yellow outline if it is that player's turn
<template>
    <div class="score-board-container">
      <div class="score-board" :class="{ 'player-turn': player.isPlayerTurn }">
        <h2>{{ displayName }}</h2>
        <p>{{ t("scoreDisplay.yourScore") }} {{ player.score }}</p>
      </div>
      <button class="game-button" @click="setCurrentPlayer(index)">Set Active Team</button>
    </div>
    
  </template>
  
  <script setup>
  import { usePlayerStore } from '@/stores/playerStore.js';
  import { useScoreStore } from '../stores/scoreStore.js'
  import { computed } from 'vue';
  import { useI18n } from "vue-i18n";
  const { t, locale, availableLocales } = useI18n()
  const playerStore = usePlayerStore();

  let lang = document.querySelector('html').getAttribute('lang')

  const props = defineProps({
    player: {
      type: Object,
      required: true
    },
    index: {
    type: Number,
  }
  });

  const displayName = computed(() => {
    if(lang === "fr") {
      return props.player.name.length > 0 ? props.player.name : 'Joueur ' + (props.index + 1);
    } else {
      return props.player.name.length > 0 ? props.player.name : 'Player ' + (props.index + 1);
    }
  
});

  const setCurrentPlayer = () => {
    playerStore.currentPlayerIndex = props.index
    console.log(`current player set to ` + playerStore.currentPlayerIndex)
    playerStore.setPlayerTurn()
  }

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

    .score-board-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    h2 {
      font-size: 28px;
      color: #fff;
    }

    p {
      font-size: 18px;
    }

    /*.container {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }*/

    .player-turn {
  font-weight: bold;
  outline: 4px solid var(--main-yellow);
}
  </style>
  