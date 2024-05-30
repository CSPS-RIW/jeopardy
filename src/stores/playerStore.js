import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    players: [],
    playerCount: 0,
    singlePlayerName: '',
    gameMode: '' // 'single-player' or 'multi-player'
  }),
  actions: {
    setGameMode(mode) {
      this.gameMode = mode;
    },
    initializePlayers() {
      if (this.gameMode === 'single-player') {
        this.players = [
          {
            name: this.singlePlayerName,
            score: 0,
            isPlayerTurn: true
          }
        ];
      } else if (this.gameMode === 'multi-player') {
        this.players.forEach((player, index) => {
          player.score = 0;
          player.isPlayerTurn = index === 0; // First player starts the game
        });
      }
    },
    addPlayer() {
      if (this.playerCount < 4) {
        this.players.push({
          name: '',
          score: 0,
          isPlayerTurn: false
        });
        this.playerCount++;
      } else {
        alert('Maximum player count reached!');
      }
    },
    deletePlayer(index) {
      this.players.splice(index, 1);
      this.playerCount--;
    }
  }
});
