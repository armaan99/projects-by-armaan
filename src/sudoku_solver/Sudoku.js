import React, { useEffect, useState } from "react";
import "./Sudoku.css";
import ninjaLeft from "./ninja_left.png";
import ninjaRight from "./ninja_right.png";
import { isInitialValid } from "./InitialCheck";
import { solver } from "./HelperFunctions";

// Initial Game Board (-1 = Empty)
const initial = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];

export default function Sudoku() {
  useEffect(() => {
    document.title = "Sudoku Solver";
  }, []);

  // Current state of Game Board (initially set to Empty)
  const [gameBoard, setGameBoard] = useState(getDeepCopy(initial));

  // Function to create a Deep Copy of Game Board
  function getDeepCopy(board) {
    return JSON.parse(JSON.stringify(board));
  }

  // To take input in every cell
  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value) % 10 || -1;
    var board = getDeepCopy(gameBoard);
    if (val === -1 || (val >= 1 && val <= 9)) board[row][col] = val;

    const inputCell = document.getElementById(`cell-${row}-${col}`);
    if (board[row][col] !== -1) inputCell.style.backgroundColor = "#3b9cdc";
    else inputCell.style.backgroundColor = "#dae1ee";

    setGameBoard(board);
  }

  // Sudoku Solver Helper Function
  function solveSudoku() {
    var board = getDeepCopy(gameBoard);

    // Checking if initial game board is in valid state or not
    if (!isInitialValid(board)) {
      alert("This Initial State is Invalid. Please check your Inputs.");
      return;
    }

    // Solving the Sudoku
    solver(board);
    setGameBoard(board);
  }

  // To Clear Game Board
  function clearSudoku() {
    setGameBoard(getDeepCopy(initial));

    // Turning all the cells White
    for (let i = 0; i < 9; ++i)
      for (let j = 0; j < 9; ++j)
        document.getElementById(`cell-${i}-${j}`).style.backgroundColor =
          "#dae1ee";
  }

  return (
    <div className="sudoku">
      {/* Header Section */}
      <div className="sudoku-header">
        <div className="title">Sudoku Solver</div>
        <div className="sub-title">by - Armaan Agrawal</div>
      </div>

      {/* Body Section */}
      <div className="sudoku-body">
        {/* Body Left Section */}
        <div className="left-section">
          <img src={ninjaLeft} alt="" />
        </div>

        {/* Body Middle Section */}
        <div className="middle-section">
          {/* Sudoku Board */}
          <div className="sudoku-board">
            <table>
              <tbody>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={row === 2 || row === 5 ? "boxGap-row-wise" : ""}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIdx) => (
                      <td
                        key={rowIdx + colIdx}
                        className={
                          col === 2 || col === 5 ? "boxGap-col-wise" : ""
                        }
                      >
                        <input
                          className="cell"
                          id={"cell-" + rowIdx + "-" + colIdx}
                          value={
                            gameBoard[row][col] === -1
                              ? ""
                              : gameBoard[row][col]
                          }
                          onChange={(e) => onInputChange(e, row, col)}
                          disabled={initial[row][col] !== -1}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sudoku Buttons */}
          <div className="sudoku-btns">
            <div className="solve-btn" onClick={solveSudoku}>
              Solve
            </div>
            <div className="clear-btn" onClick={clearSudoku}>
              Clear
            </div>
          </div>
        </div>

        {/* Body Right Section */}
        <div className="right-section">
          <img src={ninjaRight} alt="" />
        </div>
      </div>
    </div>
  );
}
