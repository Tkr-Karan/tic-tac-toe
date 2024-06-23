import React, { useState } from "react";
import Board from "./Board";
import { checkWinner, initialState } from "../utils/tictactoeutils";

const TicTacToe = ({ size = 3 }) => {
  // creating the board of size
  const [board, setBoard] = useState(initialState(size));

  const [turnX, setTurnX] = useState(true);

  const winner = checkWinner(board, size);

  const status = winner
    ? `Winner is ${winner}`
    : turnX
    ? "Player X turn"
    : "Player O turn";

  const handleClick = (rowIndx, colIndx) => {
    if (board[rowIndx][colIndx] || winner) return;

    const deepCopyOfBoard = JSON.parse(JSON.stringify(board));
    deepCopyOfBoard[rowIndx][colIndx] = turnX ? "X" : "O";
    setBoard(deepCopyOfBoard);
    setTurnX(!turnX);
  };

  const handleReset = () => {
    setBoard(initialState(size));
    setTurnX(true);
  };

  return (
    <div className="tictactoe__container">
      <Board handleClick={handleClick} board={board} size={size} />
      <div>{status}</div>
      <div className="reset-btn" onClick={handleReset}>
        reset
      </div>
    </div>
  );
};

export default TicTacToe;
