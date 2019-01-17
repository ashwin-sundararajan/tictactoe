const socket = io()
let connected = false
let gameId = ''
const mountingPoint = $('#mount')
let winner = ''

socket.on('connect', function() {
  console.log('connected to server')
  connected = true
})

socket.on('echo', function(message) {
  console.log(message)
})

socket.on('update', function(board) {
  console.log(board)
  updateDisplay(board, mountingPoint)
})

socket.on('winner', function(gwinner) {
  setTimeout(alert, 100, `${gwinner} has won the game!`)
  $('.square').off('click')
})

socket.on('drawn', function() {
  setTimeout(alert, 100, "Game ends in a draw")
  $('.square').off('click')
})

$('#create').click(createGame)
$('#join').click(() => joinGame($('#gameId').val()))

function createGame() {
  socket.emit('createGame', function(err, gId) {
    gameId = gId
    updateDisplay(Array(9).fill(''), mountingPoint)
  })
}

function joinGame(gId) {
  socket.emit('joinGame', gId, function(message) {
    console.log(message)
    gameId = gId
    updateDisplay(Array(9).fill(''), mountingPoint)
  })
}

function echo(message) {
  socket.emit('echo', message)
}

function sendMove(pos) {
  socket.emit('move', gameId, pos)
}

function updateDisplay(arr, mountPoint) {
  mountPoint.empty().append(board(arr))
}

function board(arr) {
  return $('<div>').append(
    $('<div>').text(gameId),
    $('<div>').append(arr.map(square)).addClass('board')
  ).addClass('game')
}

// &xcirc;
function square(val, idx) {
  switch (val) {
    case 'X':
      return $('<div>').append(x()).data('pos', idx).addClass('square')
    case 'O':
      return $('<div>').append(o()).data('pos', idx).addClass('square')
    default:
      return $('<div>').data('pos', idx).addClass('square')
        .click(() => sendMove(idx))
  }
}

function x() {
  return $('<i>').addClass('fas fa-times')
}

function o() {
  return $('<i>').addClass('far fa-circle')
}