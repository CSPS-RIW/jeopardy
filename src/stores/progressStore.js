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
				// console.log(gameInfo);
				// Iterate through gameData questions and update attempted based on attempts object
				// for (const question of gameInfo.questions) {
				//   question.attempted = gameInfo.questions[question.id] || false;
				// }
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
				const resp = await fetch('./gameData.json');
				const data = await resp.json();
				this.gameData = data;
				localStorage.setItem('gameData', JSON.stringify(data));
				console.log('set gameData to default');
			} catch (error) {
				console.error('Error fetching game data:', error);
			}
		},

		// Get GameData from html template instead

		getGameData() {
			console.log('creating game data from html');
			let tableQuestions = document.querySelector(
				'.get-content [data-table-name="questions"]',
			);

			let qsTbody = tableQuestions.querySelector('tbody');
			// let qsTbody = tableQuestions.querySelector('tbody');
			let qsTr = Array.from(qsTbody.querySelectorAll('tr'));

			let tableCategories = document.querySelector(
				'.get-content [data-table-name="categories"]',
			);
			let catTbody = tableCategories.querySelector('tbody');
			let catTr = Array.from(catTbody.querySelectorAll('tr'));
			let questions = ref([]);

			let categories = [];
			catTr.forEach((item, index) => {
				let category = item.querySelector('td').innerText;
				categories.push(category);
			});

			qsTr.forEach((item, index) => {
				let optionsArr = [];
				let headers = item.children;
				let id = index;
				let categoryText = headers[0].innerText.toLowerCase();
				let categoryId;

				for (let i = 0; i < categories.length; i++) {
					if (categories[i].toLowerCase() === categoryText) {
						categoryId = i;
						// Exit the loop after finding the first match
						break;
					}
				}

				let value = headers[1].innerText;
				let question = headers[2].innerText;
				// options
				headers[3].querySelectorAll('p').forEach((item) => {
					optionsArr.push(item.innerText);
				});
				let answer = headers[4].innerText;
				let correctFeedback = headers[5].innerText;
				let incorrectFeedback = headers[6].innerText;
				let genericFeedback = headers[7].innerText;

				let obj = {};
				obj.id = id;
				obj.categoryId = categoryId;
				obj.value = parseInt(value);
				obj.question = question;
				obj.options = optionsArr;
				obj.answer = answer;
				obj.feedback = {};
				obj.feedback.correct = correctFeedback;
				obj.feedback.incorrect = incorrectFeedback;
				obj.feedback.generic = genericFeedback;
				obj.attempted = false;

				questions.value.push(obj);
			});

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
