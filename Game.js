const engine = require('./engine')

class Game {
  constructor(playerXId) {
    this.gameId = this.generateId()
    this.playerXId = playerXId
    this.board = Array(9).fill('')
    this.nextMove = 'X'
    this.winner = ''
  }

  generateId() {
    return (Date.now() % (24 * 60 * 60 * 1000)).toString(36)
  }

  addPlayerToGame(playerId) {
    this.playerOId = playerId
  }

  playMove(playerId, pos) {
    if (this.permittedToMove(playerId) && !this.winner) {
      this.board = engine.playMove(
        this.board,
        pos,
        this.nextMove
      )
      this.toggleMove()
      this.winner = engine.checkWinner(this.board)
    }
  }

  permittedToMove(playerId) {
    console.log(playerId)
    switch (this.nextMove) {
      case 'X':
        if (playerId === this.playerXId) {
          return true
        }
      case 'O':
        if (playerId === this.playerOId) {
          return true
        }
      default:
        return false
    }
  }

  toggleMove() {
    this.nextMove = this.nextMove === 'X' ? 'O' : 'X'
  }
}


module.exports = Game