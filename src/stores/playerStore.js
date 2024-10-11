import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    players: [], // players array
    playerCount: 0, // number of players
    singlePlayerName: '', // name for single player
    gameMode: '', // 'single-player' or 'multi-player'
    currentPlayerIndex: Number, // this shows whose turn it is
  }),
  actions: {
    // setting the game mode from the data-game-mode property
    setGameMode() {
      const appElement = document.getElementById('app');
      this.gameMode = appElement.getAttribute('data-game-mode') || 'single-player';
      this.saveConfig();
    },
    // initializing the players, depending on if there's progress in local storage or not
    initializePlayers() {
      this.setGameMode();
      const savedState = localStorage.getItem('playerStore');
      let singlePlayerScore = parseInt(localStorage.getItem('score')) || 0;

      if (savedState) {
        const state = JSON.parse(savedState);
        this.players = state.players || [];
        this.playerCount = this.players.length;
        this.singlePlayerName = state.singlePlayerName || '';
        this.currentPlayerIndex = state.currentPlayerIndex || null;

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
    // callback function that sets the basic players parameters
    setupInitialPlayers() {
      if (this.gameMode === 'single-player') {
        this.players = [{ name: this.singlePlayerName || 'Player 1', score: 0, isPlayerTurn: true }];
        this.playerCount = 1;
      } else if (this.gameMode === 'multi-player') {
        if (this.players.length === 0) {
          this.players = [
            { name: '', score: 0, isPlayerTurn: false, id: 0 },
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
    // using this when the app gets reloaded to grab players info from localstorage
    reinitializePlayers() {
      const savedState = localStorage.getItem('playerStore');

      if (savedState) {
        const state = JSON.parse(savedState);
        this.players = state.players || [];
        this.playerCount = this.players.length;
        this.singlePlayerName = state.singlePlayerName || '';
        this.currentPlayerIndex = state.currentPlayerIndex || null;
        this.setGameMode()
      } else {
        this.setupInitialPlayers();
      }
      this.saveConfig();
    },
    // add a player to multiplayer mode. Max player count is 4, could change that if you want
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
    // delete a player from the players array. minimum player number is 2 for multiplayer
    deletePlayer(index) {
      if (this.players.length > 2) {
        this.players.splice(index, 1);
        this.playerCount = this.players.length;

        // Reassign IDs for remaining players to maintain a contiguous sequence
        this.players.forEach((player, i) => {
          player.id = i ; // Reassign ID based on new index
        });

        // if (this.currentPlayerIndex >= this.playerCount) {
        //   this.currentPlayerIndex = 0;
        // }
        // this.players[this.currentPlayerIndex].isPlayerTurn = true;
        this.saveConfig();
      } else {
        alert('Minimum two players required for multiplayer mode!');
      }
    },
    // method for resetting the player store
    resetPlayerStore() {
      this.players = [];
      this.playerCount = 0;
      this.singlePlayerName = '';
      this.currentPlayerIndex = null;
      this.setupInitialPlayers();
      this.saveConfig();
    },
    // when a player gets a question wrong, this updates to the next player's turn
    updateTurn() {
      if (this.players.length > 0) {
        this.players[this.currentPlayerIndex].isPlayerTurn = false;
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.players[this.currentPlayerIndex].isPlayerTurn = true;
        this.saveConfig();
      }
    },
    setPlayerTurn(){
      for(let player of this.players) {
        player.isPlayerTurn = false
      }
      this.players[this.currentPlayerIndex].isPlayerTurn = true
    },
    // save config callback function
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
    // updating the player score
    updatePlayerScore(playerId, points) {
      const player = this.players.find(p => p.id === playerId);
      if (player) {
        player.score += points;
        this.saveConfig();
      }
    },
    // get the player's score
    getPlayerScore(playerId) {
      const player = this.players.find(p => p.id === playerId);
      return player ? player.score : 0;
    },

  },
});