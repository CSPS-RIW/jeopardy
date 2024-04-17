<!-- Question.vue -->
<template>
    <div>
      <h2>Question</h2>
      <p v-if="question">{{ question.question }}</p>
      <div v-if="question">
        <div v-for="(option, index) in question.options" :key="index" class="option" @click="checkAnswer(option)">
          {{ option }}
        </div>
      </div>
      <p v-else>No question found.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import gameData from '../gameData.json'
  
  const route = useRoute()
  const questionId = ref(route.params.id)
  const question = ref(null)
  
  onMounted(() => {
    question.value = gameData.questions.find(q => q.id === parseInt(questionId.value))
    if (!question.value) {
      console.error(`Question with ID ${questionId.value} not found.`)
    }
  })
  
  const checkAnswer = (option) => {
    if (!question.value) {
      console.error('Question is not defined.')
      return
    }
  
    if (option === question.value.answer) {
      // Correct answer
      // Add logic to update score or perform other actions
      alert('Correct!')
    } else {
      // Incorrect answer
      // Add logic to handle incorrect answers
      alert('Incorrect. Try again!')
    }
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  