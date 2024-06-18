<template>
  <div class="flex instructions-container">
      <p>Welcome to the Jeopardy Game! Get ready to test your knowledge on our subject. Get a question right, and you'll earn points according to its difficulty. Get it wrong, and you'll lose points! Try to get the best score possible, or play multi-player for some healthy competition. When you're ready, set up your game configuration below, and hit Start Game. Good Luck!</p>
    </div>
  <div class="flex">
    
    <div class="config-container">
      <h2 class="center">Game Configuration</h2>
      <div>
        <fieldset>
          <div>
            <input type="radio" name="option" id="single_player" value="single-player" @change="playerStore.resetPlayerStore()" v-model="gameMode" class="mr-1">
            <label for="single_player">Single Player</label>
          </div>
          <div>
            <input type="radio" name="option" id="multi_player" value="multi-player" @change="playerStore.resetPlayerStore()" v-model="gameMode" class="mr-1">
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
            <button @click="playerStore.addPlayer()" class="game-button mt-2" :disabled="playerStore.playerCount >= 4">Add Player</button>
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
      <div class="startgame d-flex justify-content-center" v-if="gameMode.length > 0 && playerStore.playerCount > 0 || playerStore.singlePlayerName.length > 0">
        <router-link to="/gameboard" @click="startGame" class="game-button start-game" role="button">Start Game</router-link>
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

    .instructions-container {
      border: 2px solid var(--game-button-blue);
      border-radius: 5px;
      background-color: var(--game-button-blue);
      color: #fff;
      padding: 0.5rem 1rem;
      margin-bottom: 2rem;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

    .start-game {
      text-decoration: none;
      border-bottom: 2px solid var(--main-yellow);
      font-weight: bold;
    }

    .start-game:visited {
      color: var(--game-button-blue);
    }

    .start-game:hover {
      color: var(--main-yellow);
    }

    /* Custom Radio inputs */
input[type='radio'] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

}

input[type='radio']+label {
  display: block;
  position: relative;
  padding:  0px 0px 0px 40px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 20px;
  /* line-height: 36px; */
  color: #000;
  user-select: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 4px;
    width: 26px;
    height: 26px;
    outline: 2px solid #000;
    border-radius: 50%;
    background-color: var(--white-heat);
  }
}

input[type='radio']:checked+label::after {
  content: '';
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  left: 5px;
  top: 9px;
  border-radius: 50%;
  outline: 1px solid #444;
  background-color: #444;
}

input[type='radio']:focus+label::before {
  -webkit-box-shadow: var(--input-box-shadow);
  box-shadow: var(--input-box-shadow);
  outline: 3px solid #141414;
}

input[type='radio']:not(:disabled)+label:hover::before {
  border: 3px solid var(--white-heat);
  background-image: var(--input-gradient);
}

/* disabled input styles */
input[type='radio']:disabled,
input[type='radio']:disabled+label,
input[type='checkbox']:disabled,
input[type='checkbox']:disabled+label {
  cursor: not-allowed;
  color: var(--disabled);
}

input[type='radio']:disabled+label::before {
  outline: 2px solid var(--disabled);
}

input[type='radio']:disabled+label::after {
  background-color: var(--disabled);
  border-color: var(--disabled);
  cursor: not-allowed;
}

@media (prefers-contrast: more) {
  fieldset:focus-within {
    outline: 1px solid #ffffff00;
  }
}

@media (forced-colors: active),
(--ms-high-contrast: active) {
  fieldset:focus-within {
    outline: 1px solid #ffffff00;
  }
}
  </style>
  