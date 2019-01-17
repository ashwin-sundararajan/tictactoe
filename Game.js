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
    if (!engine.validMove(this.board, pos)) return

    if (!this.playerXId || !this.playerOId) return

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
    // console.log(playerId, this)

    switch (this.nextMove) {
      case 'X':
        if (playerId === this.playerXId) {
          console.log('HERE X')
          return true
        }
        break;
      case 'O':
        if (playerId === this.playerOId) {
          console.log('HERE O')
          return true
        }
        break;
      default:
        return false
    }
  }

  toggleMove() {
    this.nextMove = this.nextMove === 'X' ? 'O' : 'X'
  }
}


module.exports = Game