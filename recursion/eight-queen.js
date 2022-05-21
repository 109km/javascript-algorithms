const createBoard = (length) => {
  return Array.from({ length }, () => Array.from({ length }, () => 0))
}

const checkPositionValid = (board, row, col) => {
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 1) return false
    if (board[row][i] === 1) return false
    if (board[i][col - row + i] === 1) return false
    if (board[row - i][col + i] === 1) return false
  }
  return true
}

const isBoardValid = (board) => {
  let count = 0
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col] === 1 && checkPositionValid(board, row, col)) {
        count++
      }
    }
  }
  return count === board.length
}

const solutions = []

function solveEightQueen(board, row) {
  if (row === board.length) {
    console.log(board)
    solutions.push(board)
    return true
  }

  // Put a queen in each column
  for (let col = 0; col < board.length; col++) {
    if (checkPositionValid(board, row, col)) {
      board[row][col] = 1
      if (solveEightQueen(board, row + 1)) return true
      board[row][col] = 0
    }
  }

  return false
}
solveEightQueen(createBoard(8), 0)
// console.log(solutions)
