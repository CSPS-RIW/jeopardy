import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore({
	id: 'player',
	state: () => ({
		// Store user's progress
		players: [],
		playerCount: 0,
		singlePlayerName: ''
		
	}),
	actions: {
		addPlayer() {
			this.playerCount++;

			const newPlayer = {
				name: '',
				score: 0,
				isPlayerTurn: false
			}
			if (this.playerCount <= 4) {
				this.players.push(newPlayer)
			} else {
				alert('Maximum player count reached!')
			}
			
		},
		removePlayer() {

		}
	}
});