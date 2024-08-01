<template>
  <div class="instructions-container">
    <div class="intro-dialog">
      <h2 class="instruction-heading">{{ t("welcome.title") }}</h2>
      <p class="instruction-text">
        {{ t("welcome.message") }}
      </p>
    </div>
    <div class="flex">
      <div class="config-container">
        <h2>{{ t("configuration.title") }}</h2>
        <div>
          <div>
            <div v-if="gameMode === 'multi-player'">
              <form @submit.prevent>
                <div v-for="(
										player, index
									) in playerStore.players" :key="index">
                  <label :for="`player_name${index}`" class="mr-2">{{ t("configuration.multiPlayerInfo.label") }}
                  </label>
                  <input class="mr-1" type="text" name="player" :id="`player_name${index}`" v-model="player.name"
                    @keydown.enter.prevent="nextInputField
        " :placeholder="t('configuration.multiPlayerInfo.label')" />
                  <button class="delete-button ml-1" @click.prevent="
        playerStore.deletePlayer(index)
        " :title="t('configuration.multiPlayerInfo.deletePlayer')">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button @click="playerStore.addPlayer()" class="game-button mt-2"
                  :disabled="playerStore.playerCount >= 4">
                  {{ t('configuration.multiPlayerInfo.addPlayer') }}
                </button>
                <div class="startgame d-flex justify-content-center" v-if="playerStore.playerCount > 1">
                  <router-link to="/" @click.prevent="startGame" class="game-button start-game" role="button">{{
        t("configuration.start") }}</router-link>
                </div>
              </form>
            </div>
            <div v-else-if="gameMode === 'single-player'">
              <form @submit.prevent>
                <div>
                  <span class="d-flex-column">
                    <label for="player_name">{{ t("configuration.singlePlayerInfo.label") }}
                    </label>
                    <div class="d-flex-column">
                      <input class="ml-2" type="text" name="player" id="player_name"
                        :placeholder="t('configuration.singlePlayerInfo.placeholder')"
                        v-model="playerStore.singlePlayerName" @keydown.enter="startGame" />
                      <div class="mt-3 d-flex justify-content-center">
                        <router-link to="/gameboard" @click.prevent="startGame" class="game-button router-button start-game" role="button">{{
                          t("configuration.start") }}</router-link>
                      </div>
                    </div>
                  </span>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '@/stores/playerStore';
import { useScoreStore } from '@/stores/scoreStore';
import { useProgressStore } from '@/stores/progressStore'
import '@fortawesome/fontawesome-free/js/all.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { onMounted, computed } from 'vue'
const { t, locale, availableLocales } = useI18n()

let lang = document.querySelector('html').getAttribute('lang')

const playerStore = usePlayerStore();
const scoreStore = useScoreStore();
const progressStore = useProgressStore()
const router = useRouter();

const gameMode = computed(() => playerStore.gameMode);

// focus in next input field - multiplayer
function nextInputField(e) {
  playerStore.addPlayer();
  setTimeout(() => {
    let nextFocusableEl =
      e.target.parentElement.nextElementSibling.querySelector(
        `input[type='text']`,
      );
    nextFocusableEl.focus();
  }, 50);
}

const startGame = () => {
  // Initialize players (this will also set the game mode from the data attribute)
  playerStore.initializePlayers();

  // Reset the score for all players
  playerStore.players.forEach(player => {
    player.score = 0;
  });

  // Reset the global score (if you're still using it)
  scoreStore.resetScore();

  // Reset the progress
  progressStore.resetProgress();

  // Save the updated configurations
  playerStore.saveConfig();
  scoreStore.saveScore();

  // Navigate to the Gameboard
  router.push({ name: 'Gameboard' });
};

onMounted(() => {
  playerStore.initializePlayers();
});
</script>

<style scoped lang="scss">
.instruction-heading,
.instruction-text {
  margin-bottom: 1rem;
}

.intro-dialog {
  border-radius: 5px;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;
  border: 3px solid var(--main-yellow);
  background: linear-gradient(to bottom, rgba(3, 9, 180, 1) 0%,rgba(0, 15, 82, 1) 100%);

  h2.instruction-heading {
    color: var(--main-yellow);
  }
}


.disabled-link {
  pointer-events: none;
  color: #636363;
}

.center {
  text-align: center;
}

.config-container {
  font-size: 20px;

  padding: 1rem;
  margin-bottom: 1rem;
  width: 450px;
  /* max-width: 550px; */
  border-radius: 5px;

  border: 3px solid var(--main-yellow);

  background: linear-gradient(to bottom, rgba(3, 9, 180, 1) 0%,rgba(0, 15, 82, 1) 100%);
  color: var(--white-heat);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media (min-width: 700px) {
    max-width: 700px;
  }

  & h2 {
    color: var(--main-yellow);
  }

  & p {
    color: var(--white-heat);
    margin-bottom: 0.5rem;
  }

  & input {
    margin: 0 !important;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    width: 260px;
    height: 55px;

  }

}

.instructions-container {
  /* height: 500px; */
  width: 1200px;
  border: 2px solid var(--game-button-blue);
  border-radius: 10px;
  background-color: var(--game-button-blue);
  color: #fff;
  padding: 1rem 1rem;
  margin-bottom: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;


}

.input-stack {
  display: flex;
  flex-direction: column;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.input-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.start-game:focus {
  color: var(--main-yellow);
  background-color: var(--game-button-blue);
  outline: 2px solid var(--main-yellow);
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
  padding: 0px 0px 0px 40px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 20px;
  /* line-height: 36px; */
  color: var(--white-heat);
  user-select: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 4px;
    width: 26px;
    height: 26px;
    outline: 2px solid var(--game-button-blue);
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
  outline: 2px solid var(--main-yellow);
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
