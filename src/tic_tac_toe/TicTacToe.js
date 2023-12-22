import React, { useEffect, useState } from "react";
import "./TicTacToe.css";
import { checkWinner, computerMove } from "./HelperFunction";
import X_tick from "./images/X.png";
import O_tick from "./images/O.png";
import D_tick from "./images/D.png";
import TTT from "./images/TTT.png";

export default function TicTacToe() {
  useEffect(() => {
    document.title = "Tic-Tac-Toe";
  }, []);

  const [userStat, setUserStat] = useState(0);
  const [compStat, setCompStat] = useState(0);
  const [drawStat, setDrawStat] = useState(0);

  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [moveCount, setMoveCount] = useState(1);

  // Takes User's Move as Input
  function userInput(row, col) {
    if (!isXNext) return;
    if (board[3 * row + col] === "X" || board[3 * row + col] === "O") return;

    const block = document.querySelector(`#block${row}${col}`);
    block.style.transform = "scale(0.95)";

    setTimeout(() => {
      block.style.transform = "scale(1)";
    }, 200);

    setBoard((prevArray) => {
      const newArray = [...prevArray];
      newArray[3 * row + col] = "X";
      return newArray;
    });

    setTimeout(() => {
      document.querySelector(`#X${row}${col}`).style.display = "block";
    }, 400);

    setMoveCount(moveCount + 1);
    setIsXNext(false);
  }

  useEffect(() => {
    console.log(moveCount, board);
  }, [board]);

  useEffect(() => {
    if (moveCount > 4) {
      const winner = checkWinner(board);
      if (winner) {
        setTimeout(() => {
          document.querySelector(".display-result").style.display = "flex";
          document.querySelector(`.ttt-res-${winner}`).style.display = "block";
        }, 2500);

        setTimeout(() => {
          document.querySelector(".display-result").style.display = "none";
          document.querySelector(`.ttt-res-${winner}`).style.display = "none";
        }, 4000);

        setTimeout(() => {
          if (winner === "X") {
            setUserStat(userStat + 1);
          } else if (winner === "O") {
            setCompStat(compStat + 1);
          } else if (winner === "D") {
            setDrawStat(drawStat + 1);
          }

          setBoard(initialBoard);
          setMoveCount(1);
          setIsXNext(true);
          document.querySelectorAll(".cellX").forEach((symbol, _) => {
            symbol.style.display = "none";
          });
          document.querySelectorAll(".cellO").forEach((symbol, _) => {
            symbol.style.display = "none";
          });
        }, 4500);
      }
    }
    if (!isXNext && moveCount < 9) {
      const compIdx = computerMove(board, moveCount);
      console.log(moveCount, compIdx);

      setBoard((prevArray) => {
        const newArray = [...prevArray];
        newArray[compIdx] = "O";
        return newArray;
      });

      const [compRow, compCol] = [Math.floor(compIdx / 3), compIdx % 3];
      const oLabel = document.querySelector(`#O${compRow}${compCol}`);
      const block = document.querySelector(`#block${compRow}${compCol}`);

      setTimeout(() => {
        block.style.transform = "scale(0.95)";
      }, 1600);

      setTimeout(() => {
        block.style.transform = "scale(1)";
      }, 1800);

      setTimeout(() => {
        oLabel.style.display = "block";
      }, 2000);

      setMoveCount(moveCount + 1);
      setIsXNext(true);
    }
  }, [board]);

  return (
    <div className="ttt">
      {/* Header Section */}
      <div className="ttt-header">
        <div className="title">Tic - Tac - Toe</div>
        <div className="sub-title">by - Armaan Agrawal</div>
      </div>

      {/* Body Section */}
      <div className="ttt-body">
        {/* Body Left Section */}
        <div className="left-section">
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
              setMoveCount(1);
              document.querySelectorAll(".cellX").forEach((symbol, _) => {
                symbol.style.display = "none";
              });
              document.querySelectorAll(".cellO").forEach((symbol, _) => {
                symbol.style.display = "none";
              });
            }}
          >
            New Game
          </div>
        </div>

        {/* Body Middle Section */}
        <div className="middle-section">
          <div className="display-result">
            <div className="ttt-res-X">YOU WON!</div>
            <div className="ttt-res-O">YOU LOST!</div>
            <div className="ttt-res-D">IT'S A DRAW!</div>
          </div>
          <table>
            <tbody>
              {[0, 1, 2].map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {[0, 1, 2].map((col, colIdx) => (
                    <td
                      id={`block${row}${col}`}
                      key={colIdx}
                      className="ttt-cell"
                      onClick={(e) => userInput(row, col)}
                    >
                      <img
                        id={`X${row}${col}`}
                        className="cellX"
                        src={X_tick}
                        alt=""
                      />
                      <img
                        id={`O${row}${col}`}
                        className="cellO"
                        src={O_tick}
                        alt=""
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Body Right Section */}
        <div className="right-section">
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
