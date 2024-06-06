<!-- Question.vue -->
<template>
  <div class="container">
    <div class="question-wrapper" aria-live="polite">
      <h2>Question</h2>
      <p v-if="question">{{ question.question }}</p>

      <fieldset v-if="question">
        <legend></legend>
        <span v-for="(option, index) in question.options" :key="index" class="option">
          <input type="radio" :id="'option_' + index" :value="option" name="option" v-model="selectedOption"
            :disabled="isSubmitted" ref="options">
          <label :for="'option_' + index">{{ option }}</label>
        </span>
      </fieldset>
      <div class="controls">
        <button @click="checkAnswer" class="game-button" :disabled="!selectedOption || isSubmitted">Submit</button>
        <button @click="goBack" class="game-button" :disabled="!isSubmitted">Back to Game Board</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import { useScoreStore } from '../stores/scoreStore.js'
import { usePlayerStore } from '../stores/playerStore'

const scoreStore = useScoreStore()
const progressStore = useProgressStore()
const playerStore = usePlayerStore()

const route = useRoute()
const router = useRouter()
const questionId = ref(route.params.id)
const question = ref(null)

const selectedOption = ref('')
const isSubmitted = ref(false)


onMounted(() => {
  question.value = progressStore.gameData.questions.find(q => q.id === parseInt(questionId.value))
})


const checkAnswer = () => {
  const currentPlayer = playerStore.players[playerStore.currentPlayerIndex];
  if (selectedOption.value === question.value.answer) {
    // Correct answer
    currentPlayer.score += question.value.value
    //alert('Correct!')
    document.querySelector('.question-wrapper').insertAdjacentHTML('beforeend', `
      <div aria-live="polite" class="question-feedback">
        <p>${question.value.feedback.correct}</p>
        <p>${question.value.feedback.generic}</p>
      </div>
    `)
  } else {
    // Incorrect answer
    currentPlayer.score -= question.value.value
    document.querySelector('.question-wrapper').insertAdjacentHTML('beforeend', `
      <div aria-live="polite" class="question-feedback">
        <p>${question.value.feedback.incorrect}</p>
        <p>${question.value.feedback.generic}</p>
      </div>
    `)
    // if the game is multiplayer, we update the turn
    if(playerStore.gameMode === 'multi-player') {
      updateTurn()
      console.log('updated turn')
    }
    
  }
  scoreStore.saveScore()
  isSubmitted.value = true
  question.value.attempted = true

  progressStore.updateProgress(questionId)
}
// function for updating the turn
const updateTurn = () => {
  // Check for saved state in localStorage
  const savedState = localStorage.getItem('playerStore');
  let players = playerStore.players;
  let currentPlayerIndex = playerStore.currentPlayerIndex;

  if (savedState) {
    const state = JSON.parse(savedState);
    players = state.players || playerStore.players;
    currentPlayerIndex = state.currentPlayerIndex || playerStore.currentPlayerIndex;
  }

  const currentPlayer = players[currentPlayerIndex];
  if (currentPlayer) {
    currentPlayer.isPlayerTurn = false;
  }

  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const nextPlayer = players[nextPlayerIndex];
  if (nextPlayer) {
    nextPlayer.isPlayerTurn = true;
  }

  playerStore.currentPlayerIndex = nextPlayerIndex;
  playerStore.players = players;

  playerStore.saveConfig();
};

const goBack = () => {
  router.push('/gameboard')
}

</script>

<style scoped>
.question-wrapper {
  background-color: var(--question-wrapper);
  max-width: 700px;
  padding: 20px;
  color: var(--vt-c-black);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  outline: 1px solid #ffffff00;
}

h2 {
  font-size: 28px;
  font-weight: bold;
  color: var(--game-button-blue);
}

p {
  font-size: 20px;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.controls {
  display: flex;
  justify-content: space-between;
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
  padding-left: 60px;
  margin-bottom: 30px;
  cursor: pointer;
  font-size: 20px;
  line-height: 36px;
  color: #000;
  user-select: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 36px;
    outline: 2px solid #000;
    border-radius: 50%;
    background-color: var(--white-heat);
  }
}

input[type='radio']:checked+label::after {
  content: '';
  display: block;
  width: 26px;
  height: 26px;
  position: absolute;
  left: 5px;
  top: 5px;
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