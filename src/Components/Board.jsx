import React from "react";

const Board = ({ board, size, handleClick }) => {
  return (
    <div className="board__container">
      <div className="board__heading">Board</div>
      <div
        className="cell__container"
        style={{
          gridTemplateColumns: `repeat(${size}, 50px)`,
        }}
      >
        {board.map((row, rowNo) => {
          return row.map((cell, cellNo) => {
            return (
              <div onClick={() => handleClick(rowNo, cellNo)} className="cell">
                {cell}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Board;
