const initialState = Array(9).fill('')

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

const same3 = ([a, b, c]) => a === b && b === c

const checkWinner = state => {
  const translate = ([a, b, c]) => [state[a], state[b], state[c]]
  return lines
    .map(translate)
    .reduce((winner, line) =>
      winner ? winner : same3(line) ? line[0] : '', '')
}

const validMove = (state, pos) => state[pos] === ''

const playMove = (state, pos, move) =>
  state.map((val, i) => i === pos ? move : val)

module.exports = {
  checkWinner,
  playMove,
  validMove
}