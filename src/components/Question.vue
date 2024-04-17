<!-- Question.vue -->
<template>
    <div>
      <h2>Question</h2>
      <p v-if="question">{{ question.question }}</p>
      <form @submit.prevent="checkAnswer" v-if="question">
      <div v-for="(option, index) in question.options" :key="index" class="option">
        <input type="radio" :id="'option_' + index" :value="option" v-model="selectedOption" :disabled="isSubmitted">
        <label :for="'option_' + index">{{ option }}</label>
      </div>
      <button type="submit" :disabled="!selectedOption || isSubmitted">Submit</button>
    </form>
      <p v-else>No question found.</p>
      <button @click="goBack" :disabled="!selectedOption">Back to Game Board</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import gameData from '../gameData.json'
  import { useScoreStore } from '../stores/scoreStore.js'

const scoreStore = useScoreStore()
  
  const route = useRoute()
  const router = useRouter()
  const questionId = ref(route.params.id)
  const question = ref(null)

  const selectedOption = ref('')
const score = ref(0)
const isSubmitted = ref(false)
  
  onMounted(() => {
    question.value = gameData.questions.find(q => q.id === parseInt(questionId.value))
    if (!question.value) {
      console.error(`Question with ID ${questionId.value} not found.`)
    }
  })
  
  const checkAnswer = () => {
  if (selectedOption.value === question.value.answer) {
    // Correct answer
    scoreStore.increaseScore(question.value.value)
    alert('Correct!')
  } else {
    // Incorrect answer
    scoreStore.decreaseScore(question.value.value)
    alert('Incorrect. Try again!')
  }
  isSubmitted.value = true
}

  const goBack = () => {
    router.push('/')
    }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  