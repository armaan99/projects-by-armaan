import React, { useState, useEffect } from "react";
import "./../TicTacToe.css";
import { computerMove, checkWinner } from "./MinimaxAlgo";

import TTT from "./../images/TTT.png";
import X_tick from "./../images/X.png";
import O_tick from "./../images/O.png";
import D_tick from "./../images/D.png";

const BLANK = "*";
const H = "X";
const C = "O";
const D = "D";

export default function TTTMinimax() {
  useEffect(() => {
    document.title = "Tic-Tac-Toe";
  }, []);

  const initialBoard = Array(9).fill(BLANK);
  const [board, setBoard] = useState(initialBoard);

  const [userStat, setUserStat] = useState(0);
  const [compStat, setCompStat] = useState(0);
  const [drawStat, setDrawStat] = useState(0);

  async function userInput(row, col) {
    let updated_board = [...board];
    updated_board[3 * row + col] = H;
    document.querySelectorAll(".ttt-cell")[3 * row + col].style.transform =
      "scale(0.9)";
    setTimeout(() => {
      document.querySelectorAll(".ttt-cell")[3 * row + col].style.transform =
        "scale(1)";
    }, 300);
    setTimeout(() => {
      setBoard(updated_board);
    }, 500);
  }

  async function computerTurn(moveC) {
    let compIdx = await computerMove(board, moveC);

    let updated_board = [...board];
    updated_board[compIdx] = C;
    setTimeout(() => {
      document.querySelectorAll(".ttt-cell")[compIdx].style.transform =
        "scale(0.9)";
      setTimeout(() => {
        document.querySelectorAll(".ttt-cell")[compIdx].style.transform =
          "scale(1)";
      }, 300);
      setTimeout(() => {
        setBoard(updated_board);
      }, 500);
    }, 1000);
  }

  async function gameController() {
    let winner = await checkWinner(board);
    let moveC = 10 - board.filter((X) => X === BLANK).length;
    if (winner !== null) {
      displayResult(winner);
    } else if (moveC % 2 === 0) {
      await computerTurn(moveC);
    }
  }

  useEffect(() => {
    gameController();
  }, [board]);

  async function displayResult(winner) {
    // Displaying Game Result
    setTimeout(() => {
      document.querySelector(".result-popup").style.display = "flex";
      document.querySelector(`.ttt-res-${winner}`).style.display = "block";
    }, 200);
    setTimeout(() => {
      document.querySelector(".result-popup").style.display = "none";
      document.querySelector(`.ttt-res-${winner}`).style.display = "none";
    }, 1200);
    setTimeout(() => {
      // Updating Score Board
      if (winner === H) {
        setUserStat(userStat + 1);
      } else if (winner === C) {
        setCompStat(compStat + 1);
      } else if (winner === D) {
        setDrawStat(drawStat + 1);
      }
      // Setting Variables/Board back to initials
      setBoard(initialBoard);
    }, 1500);
  }

  return (
    <div className="ttt">
      {/* Header */}
      <div className="ttt-header">
        <div className="title">Tic - Tac - Toe</div>
        <div className="sub-title">by - Armaan Agrawal</div>
      </div>

      {/* Body */}
      <div className="ttt-body">
        {/* Body Left Section */}
        <div className="ttt-body-left">
          <img src={TTT} alt="" />
          <div
            className="new-game-btn"
            onClick={(event) => {
              event.target.style.transform = "scale(0.95)";
              setTimeout(() => {
                event.target.style.transform = "scale(1)";
              }, 200);
              setBoard(initialBoard);
              setUserStat(0);
              setCompStat(0);
              setDrawStat(0);
            }}
          >
            New Game
          </div>
        </div>

        {/* Body Middle Section */}
        <div className="ttt-game-board">
          <div className="result-popup">
            <div className="ttt-res-X">YOU WON!</div>
            <div className="ttt-res-O">YOU LOST!</div>
            <div className="ttt-res-D">IT'S A DRAW!</div>
          </div>
          {[0, 1, 2].map((row, _) => (
            <div key={row} className="row">
              {[0, 1, 2].map((col, _) => (
                <div
                  key={row + "-" + col}
                  className="ttt-cell"
                  id={`block${row}${col}`}
                  onClick={() => userInput(row, col)}
                >
                  {board[3 * row + col] === H ? (
                    <img className="cellX" src={X_tick} alt="" />
                  ) : (
                    board[3 * row + col] === C && (
                      <img className="cellO" src={O_tick} alt="" />
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Body Right Section */}
        <div className="ttt-score-board">
          <div className="ttt-stats-title">Score Board</div>
          <div className="ttt-stats">
            <div className="ttt-stats-label">
              <img src={X_tick} alt="" />
              <div>YOU</div>
            </div>
            <div className="ttt-stats-score">{userStat}</div>
          </div>
          <div className="ttt-stats">
            <div className="ttt-stats-label">
              <img src={O_tick} alt="" />
              <div>CPU</div>
            </div>
            <div className="ttt-stats-score">{compStat}</div>
          </div>
          <div className="ttt-stats">
            <div className="ttt-stats-label">
              <img src={D_tick} alt="" />
              <div>DRAW</div>
            </div>
            <div className="ttt-stats-score">{drawStat}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
