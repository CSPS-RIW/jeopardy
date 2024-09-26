// progressStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useProgressStore = defineStore({
	id: 'progress',
	state: () => ({
		// Store user's progress
		progress: {},
		// Store game data
		gameData: {},
	}),
	actions: {
		saveProgress() {
			// Create a deep copy of gameData to avoid direct modification
			const updatedGameData = JSON.parse(JSON.stringify(this.gameData));
			// const updatedGameData = { ...this.gameData };

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
			const savedData = localStorage.getItem('progress');
			if (savedData) {
				const gameInfo = JSON.parse(savedData);
			}
		},

		// Method to update the user's progress when they answer a question
		updateProgress(questionId) {
			const question = this.gameData.questions.find(
				(q) => q.id === questionId,
			);
			if (question) {
				question.attempted = true;
			}
			this.saveProgress();
		},

		// Method to reset progress data
		resetProgress() {
			this.gameData.questions.forEach((question) => {
				question.attempted = false;
			});
			localStorage.removeItem('progress');
			// Save the updated progress to local storage
			this.saveProgress();
		},

		// Method to fetch game data
		async fetchGameData() {
			try {
				const resp = await fetch('/content/enforced/12481-SB-Noam_Stulberg/_projects/jeopardy/gameData.json');
				const data = await resp.json();
				//console.log(data)
				this.gameData = data;
				//console.log(this.gameData)
				localStorage.setItem('gameData', JSON.stringify(data));
				console.log(this.gameData)
				console.log('set gameData to default');
				//this.getGameData()
			} catch (error) {
				console.error('Error fetching game data:', error);
			}
		},

		// Get GameData from html template instead

		getGameData() {
			
			// populate game data
			this.gameData.categories = categories;
			this.gameData.questions = questions.value;
			localStorage.setItem('gameData', JSON.stringify(this.gameData));
		},
		// filtering questions by category
		filteredQuestions(categoryIndex) {
			return this.gameData.questions.filter(
				(question) => question.categoryId === categoryIndex,
			);
		},
	},
});
