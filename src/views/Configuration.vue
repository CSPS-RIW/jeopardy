<template>
    <div>
      <h2>Game Configuration</h2>
      <div>
        <fieldset>
          <div>
            <input type="radio" name="option" id="single_player" value="single-player" v-model="gameMode">
            <label for="single_player">Single Player</label>
          </div>
          <div>
            <input type="radio" name="option" id="multi_player" value="multi-player" v-model="gameMode">
            <label for="multi_player">Multi-Player</label>
          </div>
        </fieldset>
      </div>
      <div v-if="gameMode.length > 0">
        <div>
          <h3>Player Info</h3>
          <div v-if="gameMode === 'multi-player'">
            <form>
              <div v-for="(player, index) in playerStore.players" :key="index">
                <label :for="'player_name' + index">Player/Team Name: </label>
                <input type="text" name="player" :id="'player_name' + index" v-model="player.name">
                <button @click.prevent="playerStore.deletePlayer(index)">Delete player</button>
              </div>
            </form>
            <button @click="playerStore.addPlayer()" :disabled="playerStore.playerCount >= 4">Add Player</button>
          </div>
          <div v-else-if="gameMode === 'single-player'">
            <form>
              <span>
                <label for="player_name">Player Name: </label>
                <input type="text" name="player" id="player_name" v-model="playerStore.singlePlayerName">
              </span>
            </form>
          </div>
        </div>
      </div>
      <div class="startgame">
        <router-link :disabled="gameMode === ''" to="/gameboard" @click="startGame">Start Game</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePlayerStore } from '@/stores/playerStore';
  
  const playerStore = usePlayerStore();
  
  const gameMode = ref('');
  
  const startGame = () => {
    playerStore.setGameMode(gameMode.value);
    playerStore.initializePlayers();
  };
  </script>
  
  <style scoped>
  /* Your scoped styles here */
  </style>
  