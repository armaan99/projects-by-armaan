import React, { useState, useEffect, useRef } from "react";
import "./NQueens.css";

const speedName = ["Very Slow", "Slow", "Normal", "Fast", "Very Fast"];
const speed = [100, 500, 1000, 1500, 2000];

export default function NQueens() {
  useEffect(() => {
    document.title = "N-Queens Visualizer";
  }, []);

  const [board, setBoard] = useState(Array(8).fill(-1));
  const currSpeed = useRef(1000);

  const [queenInCol, setQueenInCol] = useState(Array(8).fill(-1));

  const [isVisualizing, setIsVisualizing] = useState(false);
  const [completed, setCompleted] = useState(false);

  function isSafe(row, col) {
    for (let prevRow = 0; prevRow < row; prevRow++) {
      const prevCol = queenInCol[prevRow];
      if (
        prevCol === col || // Column Conflict Check
        Math.abs(prevRow - row) === Math.abs(prevCol - col) // Diagonal Conflict Check
      ) {
        return false;
      }
    }
    return true;
  }

  async function solveNQueens(row) {
    if (row === board.length) {
      setCompleted(true);
      return true;
    }

    if (!completed) {
      for (let col = 0; col < board.length; ++col) {
        setQueenInCol([...queenInCol, (queenInCol[row] = col)]);

        await new Promise((resolve) => setTimeout(resolve, currSpeed.current));

        if (await isSafe(row, col)) {
          if (await solveNQueens(row + 1)) return true;
          setQueenInCol([...queenInCol, (queenInCol[row] = -1)]);
        }
      }
      setQueenInCol([...queenInCol, (queenInCol[row] = -1)]);

      await new Promise((resolve) => setTimeout(resolve, currSpeed.current));

      return false;
    }
  }

  async function visualize() {
    if (!isVisualizing) {
      setIsVisualizing(true);
      setCompleted(false);
      await solveNQueens(0);
      setIsVisualizing(false);
      setQueenInCol(queenInCol);
    }
  }

  return (
    <div className="nqueens">
      {/* Header */}
      <div className="nqueens-header">
        <div className="title">N-Queens Visualizer</div>
        <div className="sub-title">by - Armaan Agrawal</div>
      </div>

      {/* Body */}
      <div className="nqueens-body">
        {/* Select Board Size */}
        <div className="board-size">
          <div className="size-title">Select Board Size</div>
          <div className="nqueen-size">
            {[4, 5, 6, 7, 8, 9].map((size, _) => (
              <div
                key={size}
                className="size-btn"
                onClick={() => {
                  if (!isVisualizing) {
                    setBoard(Array(size).fill(-1));
                    setQueenInCol(Array(size).fill(-1));
                    setIsVisualizing(false);
                    setCompleted(false);
                  }
                }}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Chess Board */}
        <div className="chess-board">
          <div
            className="chess-grid"
            style={{ gridTemplateRows: `repeat(${board.length}, 1fr)` }}
          >
            {board.map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="row"
                style={{
                  gridTemplateColumns: `repeat(${board.length}, 1fr)`,
                }}
              >
                {board.map((_, colIdx) => (
                  <div
                    key={rowIdx + colIdx}
                    className="chess-board-cell"
                    style={{
                      background:
                        (rowIdx + colIdx) % 2
                          ? "radial-gradient(circle at bottom left, #195a82, #13141c)"
                          : "radial-gradient(circle at bottom left, #60b4db, #b9ebfb)",
                    }}
                  >
                    {queenInCol[rowIdx] === colIdx && (
                      <img
                        id={"queenImg-" + rowIdx + "-" + colIdx}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFNElEQVR4nO2dS4icRRCAO74QX6irEB8oCGq8iNGDCr4OSo568mJQPOnNV0BECCp6ED2YgyCYgI+DGBNBQQSDiKIGJGE3yd89u2ExoiY+dvavmsk+pmqiLb072Yy7/2N2M//f/f/dH9Rp/5p/qqq7+rHVPUIEAoFAIBAIBAKBQAkcaM5erZA/kUjtReFPVatzQ1X0K82C8UDTCln/T4Cmzd9c1688puWtMB6XZKfr+pXHdPk0B0ikluv6lSfLAQpoOlcfqJnqQKCpPP3E9HMqACjqjkTenZECduTpmzSRHkD+eAD9HekB4F2i7pjZRvIgyFK19Mha9U3PkK3O9fn6emThXQm9bxD9WtCbBu40OVchzS46gV4fVP9Qu3OTQh7tc+DoeLuzYVB9867eO2fNdzAt3xvnL0fGfE+vBf8jsXv/wHrI+/sCMDaonor5Xgl0YuGdMd8tfGfsD32+Aur20sCf0Yxen6ejWnznihTS4jvy9A639eUS+Wgv4Ceiv/QFQzOkykjkQ325+Eut9bqs5xXwBwkD6PtZOuYzJfLnfc8fHLohVUUtn5kAP5P6bEuPSKD5hEG4Y1p4qh7ws8t0thdmUNWQyE8um5GwbPHtic8Cb0mbRjaAn0vSaSDfpoCo/9kI+YnCDasKCujWhGnp5OGmvmhFGgGeyFgHTGqtz+jXMXleAo8n9JiNpRvqKvu0PjsprZhc3/9cA7ubMhZxi70Au5tyxwugefPO0g11GQm0N2V74eXG1OyV4zHdrIBVXgDMIsukr4nm7FUS6JWUz9xr217nUEDbcp07NKG3bNvrHLJFm8sKQIT0iG17nUOZPZ6SAuDttkMWWut1CikuIf1A3kLPWxTSnsJbP9BXtu10FgX0WuE9AOhV23Y6i4TOQ4X3gLjzoG07nUXN6CuKDoBZU9i2MxAIBAIBZzjQV6tZ+CzIt1rQNddqYuHrAT9qQU+zVlMXLPWvBc1DlpB2vK4FdTwAKHxHZteKFhwAD2pB11wrigWLT7Wgq6sV5cLzvte1oKtBAm1USDNrdjZQcwLnr7NtRyWJZvR6hfzrEFr9mKk/tW1PpTii9blpZSprHGx3h39DrgKVcYrlNGRrcU2mRijk5wsZfIH+lUgP27bPaRR2HzAHNYqbBdHxRqtzo207nWS8rS+TQMeKc/7SeLA/0voc2/Y6WBPEnxXt/L6eMPB5NC+IgB4vz/mL59GimO+ybbcTHER9iQT6u8wA9CQKJepioRjrHQvO7/UE3iJ8Zrzd2VDsrCd3LDhuBn/hKwp5uz3nL40HLwlf93okUMeBAEztO6rPE76hgJ+27fylILRos/CN/kPTyrYAfyh8w5xUV84EgH4SviGBfnAmBQF9L3wj68S7KjsAyC8K3/hG67OSDlGX3/r5o7A5FwgEAgHvaEzpC20Pwl5uQ5wkArrFdgBWc9ti7VDIW20HQMb8lPCRUdAXm51I6wFA/tm7dUDvBsNdtp1/Kgj0pvCFxXvf6G3bTlc+bkeY7QeJ/J5tZ6t0eUHUesoJ9IUDTtY5PeHd2o0JMp67dqAL99AVoW8j1JeKOtC76XwYdf66VAFWUTx3jaj6QivrFy+U4yKRf6tsMa8593XypvKKyy+D3OjuFOb6YIX0tQPO08MR2rP8SmSnUTE9at9pPFyJ6TFRmdYPPGndYThckchHtNZnCtdpQPc+285ShQVh8J9YsYZCesO2o1RRArRNuI5C+q62PQDoR+E6Evn3GgfgmHAdiTRX4wDM2/ZvIBAIBAKBQCAQEJXnP+b/y/Xq36osAAAAAElFTkSuQmCC"
                        alt=""
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Select Visualization Speed */}
        <div className="visualization-speed">
          <div className="speed-title">Visualization Speed</div>
          <div className="nqueens-speed">
            {[4, 3, 2, 1, 0].map((idxVal, speedIdx) => (
              <div
                key={speedIdx}
                className="speed-btn"
                onClick={() => {
                  currSpeed.current = speed[speedIdx];
                }}
              >
                {speedName[idxVal]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="nqueens-footer">
        <div className="nqueens-visualize-btn" onClick={visualize}>
          Visualize
        </div>
      </div>
    </div>
  );
}
