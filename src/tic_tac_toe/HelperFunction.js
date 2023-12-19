// All possible ways in which on can win
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

// To check if there is any winning move
function possWin(board, player) {
  let key = null;
  if (player === "H") key = "X";
  else if (player === "C") key = "O";

  for (let i = 0; i < winning_lines.length; ++i) {
    const [a, b, c] = winning_lines[i];
    console.log(winning_lines[i]);
    if (board[a] === null && board[b] === key && board[c] === key) {
      return a;
    } else if (board[a] === key && board[b] === null && board[c] === key) {
      return b;
    } else if (board[a] === key && board[b] === key && board[c] === null) {
      return c;
    }
  }
  return null;
}

function playCenter() {
  return 4;
}

function playAnywhere(board) {
  for (let i = 0; i < 9; ++i) if (board[i] === null) return i;
}

function playCorner(board) {
  const corners = [0, 2, 6, 8];
  for (let i = 0; i < corners.length; ++i)
    if (board[corners[i]] === null) return corners[i];
}

function playNonCorner(board) {
  for (let i = 1; i < 9; i = i + 2) if (board[i] === null) return i;
}

export function computerMove(board, moveCount) {
  const H = "X";
  const C = "O";

  // Second Move
  //...........................................................................................
  if (moveCount === 2) {
    // If H plays at Center
    if (board[4] === H) {
      return playCorner(board);
    }
    return playCenter(board);
  }
  //...........................................................................................

  // Fourth Move
  //...........................................................................................
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
  //...........................................................................................

  // Sixth and Eighth Move
  //...........................................................................................
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

// Check winning status
export function checkWinner(board) {
  for (let i = 0; i < winning_lines.length; i++) {
    const [a, b, c] = winning_lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === "X") return "X";
      else return "O";
    }
  }

  if (!board.includes(null)) return "D";

  return null;
}
