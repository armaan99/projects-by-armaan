import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sudoku from "./sudoku_solver/Sudoku";
import TicTacToe from "./tic_tac_toe/TicTacToe";

export default function Routess() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sudoku-solver" element={<Sudoku></Sudoku>}></Route>
        <Route path="/tic-tac-toe" element={<TicTacToe></TicTacToe>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
