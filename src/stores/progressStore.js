// progressStore.js
import { defineStore } from 'pinia'

export const useProgressStore = defineStore({
  id: 'progress',
  state: () => ({
    progress: {}, // Store user's progress
    gameData: {} // Store game data
  }),
  actions: {
    // Method to save the user's progress to local storage
    saveProgress() {
        const attempts = {}
        for (const question of this.gameData.questions) {
          if (question.attempted) {
            attempts[question.id] = true
          }
        }
        localStorage.setItem('progress', JSON.stringify(attempts))
      },
      
    // Method to load the user's progress from local storage
    loadProgress() {
        const savedProgress = localStorage.getItem('progress')
        if (savedProgress) {
          const attempts = JSON.parse(savedProgress) || {}
          // Iterate through gameData questions and update attempted based on attempts object
          for (const question of this.gameData.questions) {
            question.attempted = attempts[question.id] || false;
          }
        }
      },
      
      
    // Method to update the user's progress when they answer a question
    updateProgress(questionId) {
        const question = this.gameData.questions.find(q => q.id === questionId)
        if (question) {
          question.attempted = true
        }
        this.saveProgress()
      },
      
    // Method to fetch game data
    async fetchGameData() {
        try {
          const resp = await fetch('./gameData.json')
          const data = await resp.json()
          this.gameData = data
        } catch (error) {
          console.error('Error fetching game data:', error)
        }
      },
      
  },
})
