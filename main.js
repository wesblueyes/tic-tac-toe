const state = [
  // Variable State defined as an array.
  [0, 0, 0],  // The array represents rows and columns in the table.
  [0, 0, 0],
  [0, 0, 0]
]

const X = 1 // Variable X defined as 1.
const O = 2 // Variable O defined as 2.
const cellValues = { 0: '', 1: 'X', 2: 'O' } // Variable cellValues has key value pairs showing available choices.
let playerTurn = X // Global variable playerTurn has the value X (The number 1.) References whose turn it is.
const drawBoard = () => { // drawBoard is a function (=> means function). Draws visual xo board.
  for (let i = 0; i < state.length; i++) { // i represents row has initalizer, condition, incrementer.
    for (let j = 0; j < state[i].length; j++) { // j represents column has initalizer, condition, incrementer.
      const col = state[i][j] // Variable col equals array row i and column j. Like X and Y coordinates.
      const cell = document.querySelector( // Variable cell equals table tr: nth-child of i+1 and td: nth-child j +1 in html.
        `table tr:nth-child(${i + 1}) td:nth-child(${j + 1})`
      )
      cell.textContent = cellValues[col] // replaces text content in html cell, references col value. If col = 0 we get an empty string, if col = 1 we get x, if col = 2 we get O.
    }
  }
  document.querySelector('.message').textContent = `It's ${cellValues[playerTurn]}'s turn.` // references html class .message. Changes the text content of that div with it's the variable the players turn to play one of the cellValues.
}

const play = (row, col) => { // play function where we pass in a row, a column and a player when we call it by clicking on the button.
  if (state[row][col] === 0) {
    state[row][col] = playerTurn
    if (checkForWinner()) {
      console.log(playerTurn, 'wins!')
    }
  }
  playerTurn = playerTurn === X ? O : X
}
const checkForWinner = () => { // function to check for winner
  let arr = [
    [state[0][0], state[0][1], state[0][2]], // first row.
    [state[1][0], state[1][1], state[1][2]], // second row.
    [state[2][0], state[2][1], state[2][2]], // third row.
    [state[0][0], state[1][0], state[2][0]], // first column.
    [state[0][1], state[1][1], state[2][1]], // second column.
    [state[0][2], state[1][2], state[2][2]], // third column.
    [state[0][0], state[1][1], state[2][2]], // first diagonal.
    [state[0][2], state[1][1], state[2][0]] // second diagonal.
  ]
  for (let i = 0; i < arr.length; i++) {
    let won = arr[i].every(function (m) { return m === playerTurn }) // won equals = arr1 (row in array above) and m equals random variable. Is the variable the only variable in the array? Checks for that.
    if (won) { return true }
  }
}
const init = () => { // initialize the first function we call when the DOM is loaded.
  const rows = document.querySelectorAll('tr') // loop through table rows.
  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].querySelectorAll('td')
    for (let j = 0; j < cols.length; j++) {
      cols[j].addEventListener('click', () => {  // establishes that we can click on the table data in that current cell.
        play(i, j) // draws X or O in each cell and changes the player's turn.
        drawBoard()
      })
    }
  }
  drawBoard()
}

document.addEventListener('DOMContentLoaded', init)
