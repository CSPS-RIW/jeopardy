<template>
  <div>
    <!-- Score display component, per number of players. this is for screenreaders only -->
    <ScoreDisplay v-for="player in playerStore.players" v-if="!isGameOver" class="sr-only" :player="player" />
    <!-- the gameboard. won't show if game is over -->
    <div class="game-board" v-if="!isGameOver">
      <!-- category container -->
      <div class="category-container" v-for="(category, catIndex) in categories" :key="catIndex">
        <div class="category-column">
          <h2>{{ category }}</h2>
        </div>
        <!-- questions. disabled if attempted -->
        <div class="question-column">
          <button v-for="(question, qIndex) in progressStore.filteredQuestions(catIndex)" :key="qIndex"
            class="question-cell" :class="{ 'attempted': question.attempted }" @click="selectQuestion(question.id)"
            @keyup.enter="selectQuestion(question.id)" :disabled="question.attempted"
            :aria-label="question.value + ' point question for ' + category">
            {{ question.value }}
          </button>
        </div>
      </div>
    </div>
    <!-- visible score displays -->
    <div class="score-container">
      <ScoreDisplay v-for="(player, index) in playerStore.players" v-if="!isGameOver" :player="player" :key="index" :index="index"/>
    </div>
    <!-- Options button, featuring a tooltip -->
    <button v-if="!isGameOver" v-tippy="{ content: 'Options'}" @click="openResetModal" class="reset-button game-button"><i class="fas fa-question"></i></button>
    <!-- Options modal window, with a fade in animation -->
    <Transition name="fade" mode="out-in">
      <ResetModal @update:retry="restartGame" @update:reset="resetGame" :isOpen="isResetModalOpen" @close="closeResetModal" />
    </Transition>
    <!-- Game Over Dialog. only displays if isGameOver is true -->
    <GameOverDialog v-if="isGameOver" :finalScore="score" @update:retry="restartGame" @update:reset="resetGame" />
  </div>
</template>

<script setup>
// imports
import { onMounted, ref, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import GameOverDialog from '../components/GameOverDialog.vue';
import ScoreDisplay from '../components/ScoreDisplay.vue';
import ResetModal from '../components/ResetModal.vue';
import { useProgressStore } from '../stores/progressStore';
import { usePlayerStore } from '../stores/playerStore';
import { useScoreStore } from '../stores/scoreStore.js';
import { useTippy } from 'vue-tippy'

// variables, including our stores
const progressStore = useProgressStore();
const playerStore = usePlayerStore();
const scoreStore = useScoreStore();
const score = scoreStore.score;

const isGameOver = ref(false);
const finalScore = ref(Number);

const router = useRouter();

const categories = ref([]);
const questions = ref([]);

// onmounted, checking for progress, grabbing it from localstorage. if there is progress, we reinitialize the players that we had. If not, we initialize players, which will just put dummy player names
onMounted(() => {
  if (localStorage.getItem("progress")) {
    progressStore.loadProgress();
    let localStorageProgress = JSON.parse(localStorage.getItem("progress"));
    categories.value = localStorageProgress.categories;
    questions.value = localStorageProgress.questions;

    playerStore.reinitializePlayers()
    
  } else {
    categories.value = progressStore.gameData.categories;
    questions.value = progressStore.gameData.questions;
    
    playerStore.initializePlayers();
  }
  // this if for the modal window
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
})

// Modal methods

const isResetModalOpen = ref(false);

const openResetModal = () => {
  isResetModalOpen.value = true;
};

const closeResetModal = () => {
  isResetModalOpen.value = false;
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isResetModalOpen.value) {
    closeResetModal();
  }
};

// When you select a question, navigate to that question, and set its attempted property to true
const selectQuestion = (questionId) => {
  const question = questions.value.find(q => q.id === questionId);
  if (question && !question.attempted) {
    question.attempted = true;
    router.push(`/question/${questionId}`);
  }
};

// once all the questions have been answered, we go to the endgame
watch(questions, () => {
  if (questions.value.every(question => question.attempted)) {
    isGameOver.value = true;
    finalScore.value = score;
  }
});

// full reset of the game, go back to the configuration screen
const restartGame = () => {
  progressStore.resetProgress();
  playerStore.resetPlayerStore();
  finalScore.value = 0;
  scoreStore.resetScore();
  isGameOver.value = false;
  router.push('/');
};

// soft reset of the game, keeps the same players but resets all progress and scores
const resetGame = () => {
  progressStore.resetProgress();
  scoreStore.resetScore();
  isGameOver.value = false;
  
  playerStore.players.forEach((player) => {
    player.score = 0;
    player.isPlayerTurn = false;
  });

  if (playerStore.gameMode === 'multi-player') {
    playerStore.players[0].isPlayerTurn = true;
    playerStore.currentPlayerIndex = 0;
  } else {
    playerStore.players[0].isPlayerTurn = true;
  }

  // Reset questions and categories
  questions.value = progressStore.gameData.questions.map(q => ({...q, attempted: false}));
  categories.value = progressStore.gameData.categories;

  // Save the updated state
  progressStore.saveProgress();
  playerStore.saveConfig();
  scoreStore.saveScore();
};
</script>

<style scoped lang="scss">
.game-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 6px;
  background-color: var(--dark-bgc);
  padding: 6px;
  border-radius: 10px;
  outline: 1px solid #ffffff00;
}

.category-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.category-column {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    color: var(--vt-c-white);
    text-align: center;
    font-weight: bold;
  }


}

.question-column {
  display: flex;
  flex-direction: column;
}

.question-cell {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: var(--game-button-blue);
  color: var(--main-yellow);
  font-size: 24px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-bottom: 6px;

  &:hover {
    background-color: var(--game-button-blue-hover);
  }

  &:focus {
    outline: 2px solid var(--main-yellow);
  }
}

.attempted {
  background-color: var(--disabled-button-bgc) !important;
  color: var(--disabled-button-color);
  cursor: default;
}

.score-container {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
}


</style>