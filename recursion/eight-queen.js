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

function solveEightQueen(board, row) {
  // If the board is full, return true
  if (row === board.length) {
    console.log(board)
    return true
  }

  // Try to put a queen in each row
  for (let col = 0; col < board.length; col++) {
    // If the position is valid, put a queen
    if (checkPositionValid(board, row, col)) {
      board[row][col] = 1
      // Check if the next row is valid
      if (solveEightQueen(board, row + 1)) return true
      // If the next row is not valid, remove the queen
      board[row][col] = 0
    }
  }
  // Go back to the previous row
  return false
}
solveEightQueen(createBoard(8), 0)
