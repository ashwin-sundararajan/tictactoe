const store = {}

module.exports = {
  createGame(gameId, playerXId) {
    const newGame = {
      gameId,
      playerXId,
      state: Array(9).fill('')
    }
    store[gameId] = newGame

    return newGame
  },

  getStore() {
    return store
  },

  getGame(gameId) {
    return store[gameId]
  },

  getGameState(gameId) {
    return store[gameId].state
  },

  addPlayerToGame(gameId, playerId) {
    const game = store[gameId]

    if (game) {
      game.playerOId = playerId
    }

    return game
  },

  updateGameState(gameId, state) {
    const game = store[gameId]

    if (game) {
      game.state = state
    }

    return game
  }
}