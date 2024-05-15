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
    // saveProgress() {
    //     const attempts = this.gameData
    //     for (const question of this.gameData.questions) {
    //       if (question.attempted) {
    //         attempts.questions[question.id - 1].attempted = true
    //       }
    //     }
    //     localStorage.setItem('progress', JSON.stringify(attempts))
    //   },
    // Method to save the user's progress to local storage
    saveProgress() {
      // Create a deep copy of gameData to avoid direct modification
      const updatedGameData = JSON.parse(JSON.stringify(this.gameData));

      // Iterate through questions and update the attempted property
      updatedGameData.questions.forEach((question, index) => {
        if (question.attempted) {
          updatedGameData.questions[index].attempted = true;
        }
      });

      // Save the updated gameData to local storage
      localStorage.setItem('progress', JSON.stringify(updatedGameData));
    },


    // Method to load the user's progress from local storage
    loadProgress() {
      const savedData = localStorage.getItem('progress')
      if (savedData) {
        const gameInfo = JSON.parse(savedData)
        console.log(gameInfo)
        // Iterate through gameData questions and update attempted based on attempts object
        // for (const question of gameInfo.questions) {
        //   question.attempted = gameInfo.questions[question.id] || false;
        // }
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

    // Method to reset progress data
  resetProgress() {
    this.gameData.questions.forEach(question => {
      question.attempted = false
    })
    this.saveProgress() // Save the updated progress to local storage
  },

    // Method to fetch game data
    async fetchGameData() {
      try {
        const resp = await fetch('./gameData.json')
        const data = await resp.json()
        this.gameData = data
        localStorage.setItem('gameData', JSON.stringify(data))
        console.log('set gameData to default')
      } catch (error) {
        console.error('Error fetching game data:', error)
      }
    },

  },
})
