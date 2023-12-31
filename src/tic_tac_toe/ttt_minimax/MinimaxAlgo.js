// ............................................................
// Basic Variables and Functions
// ............................................................
const BLANK = "*";
const C = "O";
const H = "X";

// All possible ways in which one can win
const winning_lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board) {
  for (let i = 0; i < winning_lines.length; i++) {
    const [a, b, c] = winning_lines[i];
    if (board[a] !== BLANK && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  if (!board.includes(BLANK)) return "D";
  return null;
}

// ............................................................
// Backtracking (Mini-Max) Algorithm
// to decide Computer's next move
// ............................................................

// To check if anyone has won or not
function gameOver(board) {
  for (let i = 0; i < winning_lines.length; ++i) {
    const [a, b, c] = winning_lines[i];
    if (board[a] !== BLANK && board[a] === board[b] && board[a] === board[c])
      return true;
  }
  return false;
}

// Mini-Max Backtracking Algorithm
function minimax(board, depth, isAI) {
  let score = 0;
  let bestScore = 0;

  if (gameOver(board) === true) {
    if (isAI === true) return -10;
    else return 10;
  } else {
    if (depth <= 9) {
      if (isAI === true) {
        bestScore = -Infinity;
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j) {
            let idx = 3 * i + j;
            if (board[idx] === BLANK) {
              board[idx] = C;
              score = minimax(board, depth + 1, false);
              board[idx] = BLANK;
              if (score > bestScore) bestScore = score;
            }
          }
        }
        return bestScore;
      } else {
        bestScore = Infinity;
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j) {
            let idx = 3 * i + j;
            if (board[idx] === BLANK) {
              board[idx] = H;
              score = minimax(board, depth + 1, true);
              board[idx] = BLANK;
              if (score < bestScore) bestScore = score;
            }
          }
        }
        return bestScore;
      }
    } else {
      return 0;
    }
  }
}

// Function returning Computer's next move
export function computerMove(board, moveCount) {
  let x = -1,
    y = -1;
  let score = 0;
  let bestScore = -Infinity;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      let idx = 3 * i + j;
      if (board[idx] === BLANK) {
        board[idx] = C;
        score = minimax(board, moveCount + 1, false);
        board[idx] = BLANK;
        if (score > bestScore) {
          bestScore = score;
          x = i;
          y = j;
        }
      }
    }
  }
  return 3 * x + y;
}
