const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const engine = require('./engine')
const store = require('./store')

function generateId() {
  return (Date.now() % (24 * 60 * 60 * 1000)).toString(36)
}

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

  socket.on('createGame', function() {

  })

  socket.on('move', function({
    type,
    pos: [x, y]
  }) {
    console.log(type, x, y)
  })
})

server.listen(3000, function() {
  console.log('\n=== Server Running on 3000 ===\n')
})