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
    setGameMode() {
      const appElement = document.getElementById('app');
      this.gameMode = appElement.getAttribute('data-game-mode') || 'single-player';
      this.saveConfig();
    },
    initializePlayers() {
      this.setGameMode();
      const savedState = localStorage.getItem('playerStore');
      let singlePlayerScore = parseInt(localStorage.getItem('score')) || 0;

      if (savedState) {
        const state = JSON.parse(savedState);
        this.players = state.players || [];
        this.playerCount = this.players.length;
        this.singlePlayerName = state.singlePlayerName || '';
        this.currentPlayerIndex = state.currentPlayerIndex || 0;

        if (this.gameMode === 'multi-player' && this.players.length === 0) {
          this.setupInitialPlayers();
        } else if (this.gameMode === 'single-player') {
          this.players = [{ name: this.singlePlayerName || 'Player 1', score: singlePlayerScore, isPlayerTurn: true }];
          this.playerCount = 1;
        }
      } else {
        this.setupInitialPlayers();
      }

      this.saveConfig();
    },
    setupInitialPlayers() {
      if (this.gameMode === 'single-player') {
        this.players = [{ name: this.singlePlayerName || 'Player 1', score: 0, isPlayerTurn: true }];
        this.playerCount = 1;
      } else if (this.gameMode === 'multi-player') {
        if (this.players.length === 0) {
          this.players = [
            { name: '', score: 0, isPlayerTurn: true, id: 0 },
            { name: '', score: 0, isPlayerTurn: false, id: 1 }
          ];
        } else {
          this.players.forEach((player, index) => {
            player.score = 0;
            player.isPlayerTurn = index === 0;
          });
        }
        this.playerCount = this.players.length;
      }
      this.currentPlayerIndex = 0;
    },
    reinitializePlayers() {
      const savedState = localStorage.getItem('playerStore');

      if (savedState) {
        const state = JSON.parse(savedState);
        this.players = state.players || [];
        this.playerCount = this.players.length;
        this.singlePlayerName = state.singlePlayerName || '';
        this.currentPlayerIndex = state.currentPlayerIndex || 0;
      } else {
        this.setupInitialPlayers();
      }
      this.saveConfig();
    },
    addPlayer() {
      if (this.playerCount < 4) {
        const newPlayerId = this.players.length ;
        this.players.push({ name: ``, score: 0, isPlayerTurn: false, id: newPlayerId });
        this.playerCount = this.players.length;
        this.saveConfig();
      } else {
        alert('Maximum player count reached!');
      }
    },
    deletePlayer(index) {
      if (this.players.length > 2) {
        this.players.splice(index, 1);
        this.playerCount = this.players.length;

        // Reassign IDs for remaining players to maintain a contiguous sequence
        this.players.forEach((player, i) => {
          player.id = i ; // Reassign ID based on new index
        });

        if (this.currentPlayerIndex >= this.playerCount) {
          this.currentPlayerIndex = 0;
        }
        this.players[this.currentPlayerIndex].isPlayerTurn = true;
        this.saveConfig();
      } else {
        alert('Minimum two players required for multiplayer mode!');
      }
    },
    resetPlayerStore() {
      this.players = [];
      this.playerCount = 0;
      this.singlePlayerName = '';
      this.currentPlayerIndex = 0;
      this.setupInitialPlayers();
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
    updatePlayerScore(playerId, points) {
      const player = this.players.find(p => p.id === playerId);
      if (player) {
        player.score += points;
        this.saveConfig();
      }
    },
    getPlayerScore(playerId) {
      const player = this.players.find(p => p.id === playerId);
      return player ? player.score : 0;
    },

  },
});