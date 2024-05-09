<template>
    <div>
      <ScoreDisplay v-if="!isGameOver" class="sr-only"/>
      <div class="game-board" v-if="!isGameOver">
        <!-- Display category headers and corresponding questions -->
        <div v-for="(category, catIndex) in categories" :key="catIndex">
          <div class="category-column">
            <h2>{{ category }}</h2>
          </div>
          <div class="question-column">
            <button
              v-for="(question, qIndex) in filteredQuestions(catIndex)"
              :key="qIndex"
              class="question-cell"
              :class="{ 'attempted': question.attempted }"
              @click="selectQuestion(question.id)"
              @keyup.enter="selectQuestion(question.id)"
              :disabled="question.attempted === true"
              :aria-label="question.value + ' point question for ' + category"
            >
              {{ question.value }}
            </button>
          </div>
        </div>
      </div>
      <ScoreDisplay v-if="!isGameOver"/>
      <GameOverDialog v-if="isGameOver" :finalScore="score" @update:retry="restartGame" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import gameData from '../gameData.json'
  import ScoreDisplay from '../components/ScoreDisplay.vue'
  import GameOverDialog from '../components/GameOverDialog.vue'
  import { useScoreStore } from '../stores/scoreStore.js'
  import { useProgressStore } from '../stores/progressStore'

const progressStore = useProgressStore()

  const scoreStore = useScoreStore()
const score = scoreStore.score

const isGameOver = ref(false)
const finalScore = ref(Number)
  
  const router = useRouter()

  const categories = ref([])
  const questions = ref([])
  //const categories = ref(gameData.categories)
  //const questions = ref(gameData.questions.map(q => ({ ...q, answered: false })))
  onMounted(() => {
  // Check if progress exists in local storage
  const savedProgress = progressStore.loadProgress()
  if (savedProgress) {
    // Use saved progress for the game board
    console.log('if')
    categories.value = savedProgress.categories
    questions.value = savedProgress.questions
  } else {
    // Use default game data
    console.log('else');
    categories.value = gameData.categories
    questions.value = gameData.questions.map(q => ({ ...q, answered: false }))
  }
})
  
  const selectQuestion = (questionId) => {
  const question = questions.value.find(q => q.id === questionId)
  if (question && !question.answered) {
    question.answered = true
    question.attempted = true
    
    if (allQuestionsAnswered()) {
      isGameOver.value = true
      finalScore.value = score
    }
    router.push(`/question/${questionId}`)
  }
}
  
  const filteredQuestions = (categoryIndex) => {
    return questions.value.filter(question => question.categoryId === categoryIndex)
  }

  const allQuestionsAnswered = () => {
  return questions.value.every(question => question.answered)
}

const restartGame = (value) => {
  // Reset game state
  questions.value.forEach(question => {
    question.answered = false
  })
  
  finalScore.value = 0
  //score.value = 0
  scoreStore.resetScore()
  isGameOver.value = false
  console.log(value)
}
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
    color : var(--disabled-button-color);
    cursor: default;
  }
  </style>
  