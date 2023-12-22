import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sudoku from "./sudoku_solver/Sudoku";
import TicTacToe from "./tic_tac_toe/TicTacToe";
import NQueen from "./n_queen_visualizer/NQueen";

export default function Routess() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sudoku-solver" element={<Sudoku></Sudoku>}></Route>
        <Route path="/tic-tac-toe" element={<TicTacToe></TicTacToe>}></Route>
        <Route path="/n-queens" element={<NQueen></NQueen>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
