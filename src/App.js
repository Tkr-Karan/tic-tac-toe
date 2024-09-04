import { useState } from "react";
import "./App.css";
import BoardInput from "./Atoms/BoardInput/BoardInput";
import TicTacToe from "./Components/TicTacToe";

function App() {
  const [isInputValue, setIsInputValue] = useState(true);
  const [inputSize, setInputSize] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  const getInputValue = (data) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsInputValue(data.data);
      setInputSize(data.value);
    }, 2000); // Delay to allow the animation to complete
  };

  return (
    <div className="App">
      {isInputValue ? (
        <BoardInput getInputValue={getInputValue} isAnimating={isAnimating} />
      ) : (
        <TicTacToe size={inputSize} />
      )}
    </div>
  );
}

export default App;
