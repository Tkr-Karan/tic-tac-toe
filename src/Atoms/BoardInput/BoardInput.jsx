import React, { useState } from "react";
import styles from "./BoardInput.module.css";

const BoardInput = ({ getInputValue, isAnimating }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 10 || value < 2) return;
    setInputValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue >= 2) {
      const data = {
        data: false,
        value: inputValue,
      };
      getInputValue(data);
    }
  };

  return (
    <div
      className={`${styles["board-container"]} ${
        isAnimating ? styles.animate : ""
      }`}
    >
      <h3 className={styles["board__input-heading"]}>
        Set the size of your game board
      </h3>
      <input
        className={styles["board__input-container"]}
        type="number"
        placeholder="No. of blocks you want"
        value={inputValue}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        min="2"
        max="10"
      />
    </div>
  );
};

export default BoardInput;
