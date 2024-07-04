import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    players: [],
    playerCount: 0,
    singlePlayerName: '',
    gameMode: '', // 'single-player' or 'multi-player'
    currentPlayerIndex: 0,
  }),
  actions: {
    setGameMode(mode) {
      this.gameMode = mode;
      this.saveConfig();
    },
    initializePlayers() {
      const savedState = localStorage.getItem('playerStore');
      let singlePlayerScore
      if(localStorage.getItem('score')) {
        singlePlayerScore = localStorage.getItem('score')
      } else {
        singlePlayerScore = 0
      }
      if (savedState) {
        console.log(this.players);
        const state = JSON.parse(savedState);
        this.players = state.players || [];
        this.playerCount = state.playerCount || 0;
        this.singlePlayerName = state.singlePlayerName || '';
        this.gameMode = state.gameMode || '';
        this.currentPlayerIndex = state.currentPlayerIndex || 0;
        if(this.gameMode === 'multi-player') {
          this.players[this.currentPlayerIndex].isPlayerTurn = true
        } else if (this.gameMode === 'single-player') {
          this.players = [{ name: this.singlePlayerName, score: singlePlayerScore , isPlayerTurn: true }];
        }
      } else {
        this.setupInitialPlayers();
      }
      this.saveConfig();
    },
    setupInitialPlayers() {
      if (this.gameMode === 'single-player') {
        this.players = [{ name: this.singlePlayerName, score: 0, isPlayerTurn: true }];
        this.currentPlayerIndex = 0;
      } else if (this.gameMode === 'multi-player') {
        this.players.forEach((player, index) => {
          player.score = 0;
          player.isPlayerTurn = index === 0;
        });
        this.currentPlayerIndex = 0;
      }
    },
    addPlayer() {
      if (this.playerCount < 4) {
        this.players.push({ name: '', score: 0, isPlayerTurn: false });
        this.playerCount++;
        this.saveConfig();
      } else {
        alert('Maximum player count reached!');
      }
    },
    deletePlayer(index) {
      this.players.splice(index, 1);
      this.playerCount--;
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
        currentPlayerIndex: this.currentPlayerIndex,
      };
      localStorage.setItem('playerStore', JSON.stringify(state));
    },
  },
});
