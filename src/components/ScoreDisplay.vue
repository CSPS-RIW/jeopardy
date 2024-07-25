<template>
    <div >
      <div class="score-board" :class="{ 'player-turn': player.isPlayerTurn }">
        <h2>{{ displayName }}</h2>
        <p>{{ t("scoreDisplay.yourScore") }} {{ player.score }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useScoreStore } from '../stores/scoreStore.js'
  import { computed } from 'vue';
  import { useI18n } from "vue-i18n";
  const { t, locale, availableLocales } = useI18n()

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
    if(lang ="fr") {
      return props.player.name.length > 0 ? props.player.name : 'Joueur ' + (props.index + 1);
    } else {
      return props.player.name.length > 0 ? props.player.name : 'Player ' + (props.index + 1);
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
  outline: 4px solid var(--main-yellow);
}
  </style>
  