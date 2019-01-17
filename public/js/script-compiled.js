"use strict";

var socket = io();
var connected = false;
socket.on('connect', function () {
  console.log('connected to server');
  connected = true;
});
socket.on('echo', function (message) {
  console.log(message);
});
socket.on('update', function (board) {
  console.log(board);
});

function echo(message) {
  socket.emit('echo', message);
}

function sendMove(type, pos) {
  socket.emit('move', {
    type: type,
    pos: pos
  });
}
