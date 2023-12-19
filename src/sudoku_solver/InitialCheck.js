// ............................................................
// Initial Checks are performed to check
// If the user has entered numbers in such a way that
// The current state of sudoku board is a valid state or not
// ............................................................

// To check if same number exists in given row
function initialRowCheck(board, row, col, num) {
  for (let i = 0; i < 9; ++i) {
    if (i !== col && board[row][i] === num) return false;
  }
  return true;
}

// To check if same number exists in given column
function initialColCheck(board, row, col, num) {
  for (let i = 0; i < 9; ++i) {
    if (i !== row && board[i][col] === num) return false;
  }
  return true;
}

// To check if same number exists in given box
function initialBoxCheck(board, row, col, num) {
  let box = [];
  let rowStart = row - (row % 3);
  let colStart = col - (col % 3);
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (rowStart + i === row && colStart + j === col) continue;
      else box.push(board[rowStart + i][colStart + j]);
    }
  }
  return box.indexOf(num) === -1;
}

// Driver funtion to check for repeatition of number in row/col/box
function initialCheck(board, row, col, num) {
  return (
    initialRowCheck(board, row, col, num) &&
    initialColCheck(board, row, col, num) &&
    initialBoxCheck(board, row, col, num)
  );
}

// To Check if initial Board if a valid state or not
export function isInitialValid(board) {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (board[i][j] !== -1 && !initialCheck(board, i, j, board[i][j]))
        return false;
  return true;
}
