<!-- Question.vue -->
<template>
    <div>
      <h2>Question</h2>
      <p>{{ question.question }}</p>
      <div v-for="(option, index) in question.options" :key="index" class="option" @click="checkAnswer(option)">
        {{ option }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import gameData from '../gameData.json'
  
  const questionId = $route.params.id
  const question = ref(gameData.questions.find(q => q.id === parseInt(questionId)))
  
  const checkAnswer = (option) => {
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
  