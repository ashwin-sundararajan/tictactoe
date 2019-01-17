const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const engine = require('./engine')
const Game = require('./Game')

const store = {}
const empty = () => {}

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

io.on('connection', function(socket) {
  console.log('a user connected')

  socket.on('echo', function(message) {
    // console.log(message)
    socket.emit('echo', message)
  })

  socket.on('createGame', function(cb = empty) {
    const newGame = new Game(socket.id)
    // newGame.gameId = 'hello'
    store[newGame.gameId] = newGame
    console.log(newGame)
    socket.join(newGame.gameId)
    cb(false, newGame.gameId)
  })

  socket.on('joinGame', function(gameId, cb = empty) {
    // gameId = 'hello'
    const game = store[gameId]

    if (game) {
      socket.join(gameId)
      if (game.playerXId && game.playerOId)
        return cb(false, 'joined as a spectator')
      game.addPlayerToGame(socket.id)
      cb(false, 'success')
    } else {
      cb(true, 'game not found')
    }
  })

  socket.on('move', function(gameId, pos, cb = empty) {
    // gameId = 'hello'
    const game = store[gameId]

    if (game) {
      game.playMove(socket.id, pos)
      // console.log(game)
      io.to(gameId).emit('update', game.board)
      if (game.winner) {
        io.to(gameId).emit('winner', game.winner)
      } else if (game.board.every(spot => spot !== '')) {
        io.to(gameId).emit('drawn')
      }
    }

  })
})

server.listen(3000, function() {
  console.log('\n=== Server Running on 3000 ===\n')
})