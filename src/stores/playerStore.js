import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    players: [],
    playerCount: 0,
    singlePlayerName: '',
    gameMode: '', // 'single-player' or 'multi-player'
    currentPlayerIndex: 0
  }),
  actions: {
    setGameMode(mode) {
      this.gameMode = mode;
      this.saveConfig();
    },
    initializePlayers() {
      // Check for saved state in localStorage
      const savedState = localStorage.getItem('playerStore');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.players = state.players || [];
        this.playerCount = state.playerCount || 0;
        this.singlePlayerName = state.singlePlayerName || '';
        this.gameMode = state.gameMode || '';
        this.currentPlayerIndex = state.currentPlayerIndex || 0;
      } else {
        // If no saved state, initialize based on gameMode
        if (this.gameMode === 'single-player') {
          this.players = [
            {
              name: this.singlePlayerName,
              score: 0,
              isPlayerTurn: true
            }
          ];
          this.currentPlayerIndex = 0; // Ensure the current player index is set
        } else if (this.gameMode === 'multi-player') {
          this.players.forEach((player, index) => {
            player.score = 0;
            player.isPlayerTurn = index === 0; // First player starts the game
          });
          this.currentPlayerIndex = 0; // Ensure the current player index is set
        }
      }
      this.saveConfig();
    },
    addPlayer() {
      if (this.playerCount < 4) {
        this.players.push({
          name: '',
          score: 0,
          isPlayerTurn: false
        });
        this.playerCount++;
        this.saveConfig();
      } else {
        alert('Maximum player count reached!');
      }
    },
    deletePlayer(index) {
      this.players.splice(index, 1);
      this.playerCount--;
      // Adjust currentPlayerIndex if necessary
      if (this.currentPlayerIndex >= this.playerCount) {
        this.currentPlayerIndex = 0;
      }
      this.saveConfig();
    },
    resetPlayerStore() {
      this.players = [];
      this.playerCount = 0;
      this.singlePlayerName = '';
      this.gameMode = '';
      this.currentPlayerIndex = 0;
      this.saveConfig();
    },
    updateTurn() {
      if (this.players.length > 0) {
        this.players[this.currentPlayerIndex].isPlayerTurn = false;
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.players[this.currentPlayerIndex].isPlayerTurn = true;
        this.saveConfig();
      }
    },
    saveConfig() {
      const state = {
        players: this.players,
        playerCount: this.playerCount,
        singlePlayerName: this.singlePlayerName,
        gameMode: this.gameMode,
        currentPlayerIndex: this.currentPlayerIndex
      };
      localStorage.setItem('playerStore', JSON.stringify(state));
    }
  }
});
