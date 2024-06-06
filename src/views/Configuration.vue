<template>
    <div class="flex">
      <div class="config-container">
        <h2 class="center">Game Configuration</h2>
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
                  <label :for="'player_name' + index" class="mr-2">Player/Team Name: </label>
                  <input class="mr-1" type="text" name="player" :id="'player_name' + index" v-model="player.name">
                  <button class="delete-button" @click.prevent="playerStore.deletePlayer(index)" title="Delete player"><i class="fas fa-times"></i></button>
                </div>
              </form>
              <button @click="playerStore.addPlayer()" class="game-button" :disabled="playerStore.playerCount >= 4">Add Player</button>
            </div>
            <div v-else-if="gameMode === 'single-player'">
              <form>
                <span>
                  <label for="player_name">Player Name: </label>
                  <input class="ml-2" type="text" name="player" id="player_name" v-model="playerStore.singlePlayerName">
                </span>
              </form>
            </div>
          </div>
        </div>
        <div class="startgame d-flex justify-content-center" v-if="gameMode.length > 0">
          <router-link to="/gameboard" @click="startGame" class="game-button ">Start Game</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePlayerStore } from '@/stores/playerStore';
  import '@fortawesome/fontawesome-free/js/all.js';

  
  const playerStore = usePlayerStore();
  
  const gameMode = ref('');
  
  const startGame = () => {
    playerStore.setGameMode(gameMode.value);
    playerStore.initializePlayers();
  };
  </script>
  
  <style scoped>
    .disabled-link {
      pointer-events: none;
      color: #636363;
    }

    .center {
      text-align: center;
    }

    .config-container {
      padding: 2rem;
      color: var(--game-button-blue);
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      font-size: 20px;
      max-width: 550px;

      @media (min-width: 700px) {
        max-width: 700px;
      }
    }

    .flex {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .add-player {
      padding: 0.2rem 0.7rem;
      border: 0rem;
      border-radius: 5px;
    }
  </style>
  