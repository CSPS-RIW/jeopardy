// scoreStore.js
import { defineStore } from 'pinia'

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
    },
  },
})
