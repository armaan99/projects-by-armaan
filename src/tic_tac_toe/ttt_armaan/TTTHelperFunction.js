// ............................................................
// Basic Variables
// ............................................................
const BLANK = null;
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

// ............................................................
// Private Member Functions
// ............................................................

// To check if there is any winning move
function possWin(board, player) {
  let key = BLANK;
  if (player === "H") key = H;
  else if (player === "C") key = C;

  for (let i = 0; i < winning_lines.length; ++i) {
    const [a, b, c] = winning_lines[i];
    if (board[a] === BLANK && board[b] === key && board[c] === key) {
      return a;
    } else if (board[a] === key && board[b] === BLANK && board[c] === key) {
      return b;
    } else if (board[a] === key && board[b] === key && board[c] === BLANK) {
      return c;
    }
  }
  return null;
}

// Returns Center Square Position
function playCenter() {
  return 4;
}

// Returns first possible empty sqaure position
function playAnywhere(board) {
  for (let i = 0; i < 9; ++i) if (board[i] === BLANK) return i;
}

// Return position of first empty corner square
function playCorner(board) {
  const corners = [0, 2, 6, 8];
  for (let i = 0; i < corners.length; ++i)
    if (board[corners[i]] === BLANK) return corners[i];
}

// Return position of first empty non-corner & non-center square
function playNonCorner(board) {
  for (let i = 1; i < 9; i = i + 2) if (board[i] === BLANK) return i;
}

// ............................................................
// Main Driver Function Predicting Computer's Next Move
// ............................................................

// Return position of best possible move for computer to play
export function computerMove(board, moveCount) {
  //......................
  // Second Move
  //......................
  if (moveCount === 2) {
    // If H plays at Center
    if (board[4] === H) {
      return playCorner(board);
    }
    return playCenter(board);
  }

  //......................
  // Fourth Move
  //......................
  if (moveCount === 4) {
    let move = possWin(board, "H");

    // If H is winning, block it
    if (move !== null) return move;
    // Case 1 [as per README.txt]
    else if (board[4] === H) {
      if (
        (board[0] === C && board[8] === H) ||
        (board[2] === C && board[6] === H) ||
        (board[6] === C && board[2] === H) ||
        (board[8] === C && board[0] === H)
      )
        return playCorner(board);
    }

    // Case 2 [as per README.txt]
    else if (board[4] === C) {
      if (
        (board[0] === H && board[8] === H) ||
        (board[2] === H && board[6] === H)
      )
        return playNonCorner(board);
      else {
        if (board[0] === H) {
          if (board[5] === H) return 2;
          else if (board[7] === H) return 6;
        } else if (board[2] === H) {
          if (board[3] === H) return 0;
          else if (board[7] === H) return 8;
        } else if (board[6] === H) {
          if (board[1] === H) return 0;
          else if (board[5] === H) return 8;
        } else if (board[8] === H) {
          if (board[1] === H) return 2;
          else if (board[3] === H) return 6;
        }
      }
    }

    // Case 3 [as per README.txt]
    if (board[4] === C) {
      if (board[1] === H && board[3] === H) return 0;
      else if (board[1] === H && board[5] === H) return 2;
      else if (board[7] === H && board[3] === H) return 6;
      else if (board[7] === H && board[5] === H) return 8;
      else {
        // Play Diagonally opposite to any one "X"
        if (board[0] === H) return 8;
        else if (board[2] === H) return 6;
        else if (board[6] === H) return 2;
        else if (board[8] === H) return 0;
      }
    }
    return playAnywhere(board);
  }

  //......................
  // Sixth and Eighth Move
  //......................
  if (moveCount === 6 || moveCount === 8) {
    // If C has possibility to win
    let move = possWin(board, "C");
    if (move !== null) return move;
    else {
      // If H is winning, block it
      move = possWin(board, "H");
      if (move !== null) return move;
      else return playAnywhere(board);
    }
  }
}

// ............................................................
// Function to check if it's a draw or who is the winner
// or the game is still still not over yet
// ............................................................

// Check winning status
export function checkWinner(board) {
  for (let i = 0; i < winning_lines.length; i++) {
    const [a, b, c] = winning_lines[i];
    if (board[a] !== BLANK && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  if (!board.includes(BLANK)) return "D";
  return null;
}
