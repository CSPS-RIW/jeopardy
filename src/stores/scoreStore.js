// scoreStore.js. not using it much anymore
import { defineStore } from 'pinia';

export const useScoreStore = defineStore({
	id: 'score',
	state: () => ({
		score: 0,
	}),
	actions: {
		increaseScore(value) {
			this.score += value;
		},
		decreaseScore(value) {
			this.score -= value;
		},
		resetScore() {
			this.score = 0;
			localStorage.removeItem('score');
		},
		saveScore() {
			localStorage.setItem('score', this.score);
		},
		loadScore() {
			let savedScore = JSON.parse(localStorage.getItem('score'));
			this.score = savedScore;
		},
	},
});
