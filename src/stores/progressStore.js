// Create a new Pinia store
import { defineStore } from 'pinia'

export const useProgressStore = defineStore({
  // Unique identifier of the store
  id: 'progress',

  // Define the state of the store
  state: () => ({
    // Object to store the user's progress
    progress: {},
    gameData: {}
  }),

  // Define actions to modify the state
  actions: {
    // Method to save the user's progress to local storage
    saveProgress(passedData) {
        if(localStorage.getItem('progress')){
            localStorage.removeItem('progress')
            localStorage.setItem('progress', JSON.stringify(passedData))
        }
      
    },
    async fetchGameData() {
        try {
            let resp = await fetch('./gameData.json');
           
            let data = await resp.text();
            
            let parsedData = JSON.parse(data)
            // Attempt to parse response as JSON
            this.gameData = {...parsedData}
            console.log(this.gameData);

            this.saveProgress(this.gameData)
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    },
    
    

    // Method to load the user's progress from local storage
    loadProgress() {
      const savedProgress = localStorage.getItem('progress')
      if (savedProgress) {
        this.progress = JSON.parse(savedProgress)
      }
    },

    // Method to update the user's progress when they answer a question
    updateProgress(questionId, isCorrect) {
      // Check if the question exists in progress
      if (!this.progress[questionId]) {
        // Initialize the question's progress if it doesn't exist
        this.progress[questionId] = {
          answered: false,
          correct: false,
        }
      }
      // Update the question's progress
      this.progress[questionId].answered = true
      this.progress[questionId].correct = isCorrect
      // Save the updated progress to local storage
      this.saveProgress()
    },
  },
})
