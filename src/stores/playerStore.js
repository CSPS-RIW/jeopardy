import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore({
	id: 'player',
	state: () => ({
		// Store user's progress
		players: []
		
	}),
	actions: {
		
	}
});