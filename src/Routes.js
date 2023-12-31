import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sudoku from "./sudoku_solver/Sudoku";
import NQueens from "./n_queen_visualizer/NQueens";
import TTTMinimax from "./tic_tac_toe/ttt_minimax/TTTMinimax";
import TicTacToe from "./tic_tac_toe/ttt_armaan/TicTacToe";

export default function Routess() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dsa/sudoku-solver" element={<Sudoku></Sudoku>}></Route>
        <Route path="/dsa/n-queens" element={<NQueens></NQueens>}></Route>
        <Route
          path="/dsa/ttt-minimax"
          element={<TTTMinimax></TTTMinimax>}
        ></Route>
        <Route path="/dsa/ttt" element={<TicTacToe></TicTacToe>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
