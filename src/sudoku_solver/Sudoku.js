import React, { useEffect, useState } from "react";
import "./Sudoku.css";
import {
  initialBoard,
  getDeepCopy,
  sudokuSolver,
  isInitialValid,
} from "./SudokuHelperFunctions";

import ninjaLeft from "./images/ninja_left.png";
import ninjaRight from "./images/ninja_right.png";

export default function Sudoku() {
  useEffect(() => {
    document.title = "Sudoku Solver";
  }, []);

  // Current state of Game Board (initially set to Empty)
  const [gameBoard, setGameBoard] = useState(getDeepCopy(initialBoard));

  // Take input from user
  function userInput(e, row, col) {
    var val = parseInt(e.target.value) % 10 || -1;
    var board = getDeepCopy(gameBoard);
    if (val === -1 || (val >= 1 && val <= 9)) board[row][col] = val;

    const inputCell = document.getElementById(`sudoku-cell-${row}-${col}`);
    if (board[row][col] !== -1) inputCell.style.backgroundColor = "#3b9cdc";
    else inputCell.style.backgroundColor = "#dae1ee";

    setGameBoard(board);
  }

  // Solve Sudoku Puzzle
  function solveSudoku() {
    var board = getDeepCopy(gameBoard);

    // Checking if initial game board is in valid state or not
    if (!isInitialValid(board)) {
      alert("This Initial State is Invalid. Please check your Inputs.");
      return;
    }

    // Solving the Sudoku
    sudokuSolver(board);
    setGameBoard(board);
  }

  // To Clear Game Board
  function clearSudoku() {
    setGameBoard(getDeepCopy(initialBoard));

    // Turning all the cells background back to normal
    for (let i = 0; i < 9; ++i)
      for (let j = 0; j < 9; ++j)
        document.getElementById(`sudoku-cell-${i}-${j}`).style.backgroundColor =
          "#dae1ee";
  }

  return (
    <div className="sudoku">
      {/* Header */}
      <div className="sudoku-header">
        <div className="title">Sudoku Solver</div>
        <div className="sub-title">by - Armaan Agrawal</div>
      </div>

      {/* Body */}
      <div className="sudoku-body">
        <img src={ninjaLeft} alt="" />
        <div className="sudoku-board">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, _) => (
            <div key={row} className="row">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, _) => (
                <input
                  key={row + "-" + col}
                  type="number"
                  className="sudoku-cell"
                  id={`sudoku-cell-${row}-${col}`}
                  value={gameBoard[row][col] === -1 ? "" : gameBoard[row][col]}
                  onChange={(e) => userInput(e, row, col)}
                />
              ))}
            </div>
          ))}
        </div>
        <img src={ninjaRight} alt="" />
      </div>

      {/* Footer */}
      <div className="sudoku-footer">
        <div className="sudoku-solve-btn" onClick={solveSudoku}>
          Solve
        </div>
        <div className="sudoku-clr-btn" onClick={clearSudoku}>
          Clear
        </div>
      </div>
    </div>
  );
}
