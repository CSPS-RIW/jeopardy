<template>
    <div>
      <h1>Jeopardy Game</h1>
      <div class="game-board">
        <div class="category" v-for="(category, index) in categories" :key="index">
          <h2>{{ category }}</h2>
          <div class="question-row">
  <div
    v-for="(question, qIndex) in questions"
    :key="qIndex"
    class="question-cell"
    :class="{ 'answered': question.answered }"
    v-if="question.categoryIndex === index" <!-- Updated to compare with index -->
    @click="selectQuestion(question)"
  >
    {{ question.value }}
  </div>
</div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import gameData from '../gameData.json'
  import question from '../components/Question.vue'
  
  const router = useRouter()
  const categories = ref(gameData.categories)
  const questions = ref(gameData.questions.map(q => ({ ...q, answered: false })))
  
  const selectQuestion = (question) => {
    if (!question.answered) {
      router.push(`/question/${question.id}`)
    }
  }
  </script>
  
  <style scoped>
  .game-board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
  
  .category {
    display: flex;
    flex-direction: column;
    border: 2px solid #333;
    border-radius: 5px;
    padding: 10px;
  }
  
  .question-row {
    display: flex;
    flex-wrap: wrap;
  }
  
  .question-cell {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;
  }
  
  .question-cell:hover {
    background-color: #e0e0e0;
  }
  
  .answered {
    background-color: #ccc !important;
    cursor: default;
  }
  </style>
  