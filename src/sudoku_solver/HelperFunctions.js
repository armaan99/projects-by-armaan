// ............................................................
// Given Helper Functions are to solve Sudoku Puzzle
// ............................................................

// Function returning next cell while backtracking
function getNext(row, col) {
  return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
}

// To check if same number exists in given row
function checkRow(board, row, num) {
  return board[row].indexOf(num) === -1;
}

// To check if same number exists in given column
function checkCol(board, col, num) {
  return board.map((row) => row[col]).indexOf(num) === -1;
}

// To check if same number exists in given box
function checkBox(board, row, col, num) {
  let box = [];
  let rowStart = row - (row % 3);
  let colStart = col - (col % 3);
  for (let i = 0; i < 3; ++i)
    for (let j = 0; j < 3; ++j) box.push(board[rowStart + i][colStart + j]);
  return box.indexOf(num) === -1;
}

// To check if it is a valid cell position for given number
function checkValid(board, row, col, num) {
  return (
    checkRow(board, row, num) &&
    checkCol(board, col, num) &&
    checkBox(board, row, col, num)
  );
}

// Sudoku Solver which actually solves the game by backtracking
export function solver(board, row = 0, col = 0) {
  if (board[row][col] !== -1) {
    let isLast = row >= 8 && col >= 8;
    if (!isLast) {
      let [newRow, newCol] = getNext(row, col);
      return solver(board, newRow, newCol);
    }
  }

  for (let num = 1; num <= 9; ++num)
    if (checkValid(board, row, col, num)) {
      board[row][col] = num;
      let [newRow, newCol] = getNext(row, col);

      if (!newRow && !newCol) return true;
      if (solver(board, newRow, newCol)) return true;
    }

  board[row][col] = -1;
  return false;
}
