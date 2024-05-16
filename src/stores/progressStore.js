// progressStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useProgressStore = defineStore({
	id: 'progress',
	state: () => ({
		progress: {}, // Store user's progress
		gameData: {}, // Store game data
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
			this.saveProgress(); // Save the updated progress to local storage
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
				// let categoryId =
				// 	categories.includes(headers[0].innerText) &&
				// 	categories[categories.indexOf(headers[0].innerText)];
				// let categoryText = headers[0].innerText.toLowerCase();
				// let categoryId = categories.find(
				// 	(category, index) =>
				// 		category.toLowerCase() === categoryText,
				// );

				let categoryText = headers[0].innerText.toLowerCase();
				let categoryId;

				for (let i = 0; i < categories.length; i++) {
					if (categories[i].toLowerCase() === categoryText) {
						categoryId = i;
						break; // Exit the loop after finding the first match
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
				obj.value = value;
				obj.question = question;
				obj.options = optionsArr;
				obj.answer = answer;
				obj.feedback = {};
				obj.feedback.correct = correctFeedback;
				obj.feedback.incorrect = incorrectFeedback;
				obj.feedback.generic = genericFeedback;

				questions.value.push(obj);

				console.log(
					'category text: ',
					categoryText,
					'categoryId: ',
					categoryId,
				);
			});

			// populate game data
			this.gameData.categories = categories;
			this.gameData.questions = questions.value;
			localStorage.setItem('gameData', JSON.stringify(this.gameData));
			console.log(this.gameData);
		},
	},
});
