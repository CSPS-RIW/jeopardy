<template>
    <div>
      <h1>Jeopardy Game</h1>
      <div class="game-board">
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
            >
              ${{ question.value }}
            </button>
          </div>
        </div>
      </div>
      <ScoreDisplay />
      <GameOverDialog v-if="isGameOver" :finalScore="score" @retry="restartGame" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import gameData from '../gameData.json'
  import ScoreDisplay from './ScoreDisplay.vue'
  import GameOverDialog from './GameOverDialog.vue'
  import { useScoreStore } from '../stores/scoreStore.js'

  const scoreStore = useScoreStore()
const score = scoreStore.score

const isGameOver = ref(false)
const finalScore = ref(Number)
  
  const router = useRouter()
  const categories = ref(gameData.categories)
  const questions = ref(gameData.questions.map(q => ({ ...q, answered: false })))
  
  const selectQuestion = (questionId) => {
  const question = questions.value.find(q => q.id === questionId)
  if (question && !question.answered) {
    question.answered = true
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

const restartGame = () => {
  // Reset game state
  questions.value.forEach(question => {
    question.answered = false
  })
  score.value = 0
  isGameOver.value = false
}
  </script>
  
  <style scoped>
  .game-board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 6px;
    background-color: #000f52;
    padding: 6px;
    border-radius: 10px;
  }
  
  .category-column {
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    
  }

  .category-column h2 {
    color: #ffffff;
    text-align: center;
    font-weight: bold;
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
    background-color: #060ce9;
    color: #ffCC00;
    font-size: 24px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin-bottom: 6px;
  }
  
  .question-cell:hover {
    background-color: #000483;
  }
  
  .attempted {
    background-color: #e0e0e0 !important;
    color : rgb(175, 175, 175);
    cursor: default;
  }
  </style>
  