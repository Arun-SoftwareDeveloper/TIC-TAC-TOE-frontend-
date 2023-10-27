import React, { useState } from "react";
import ScoreBoard from "./Component/Score";
import Board from "./Component/Board";
import ResetButton from "./Component/ResetButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [Xvalue, setXvalue] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  // Function to handle a box click
  const handleBoxClick = async (boxId) => {
    if (gameOver) {
      resetButton();
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boxId }),
      });

      if (response.ok) {
        const data = await response.json();
        setBoard(data.board);
        setXvalue(data.Xvalue);
        if (data.gameOver) {
          // Player won
          setGameOver(true);

          if (data.Xvalue) {
            // X won
            setScores({ xScore: scores.xScore, oScore: scores.oScore + 1 });
            toast.success("O won the game!", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            // O won
            setScores({ xScore: scores.xScore + 1, oScore: scores.oScore });
            toast.success("X won the game!", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      } else {
        toast.error("An error occurred while making a move.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while making a move.");
    }
  };

  // Function to reset the game
  const resetButton = async () => {
    try {
      const response = await fetch("http://localhost:4000/reset", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setBoard(data.board);
        setScores(data.scores);
        setXvalue(data.Xvalue);
        if (data.gameOver) {
          // Reset logic
          setGameOver(false);
        }
        toast.success("Game reset.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("An error occurred while resetting the game.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resetting the game.");
    }
  };

  return (
    <div className="App">
      <h1 className="title">Tic-Tac-Toe</h1>
      <ScoreBoard scores={scores} Xvalue={Xvalue} />
      <Board board={board} onClick={gameOver ? resetButton : handleBoxClick} />
      <ResetButton resetButton={resetButton} />
      <ToastContainer /> {/* The ToastContainer component */}
    </div>
  );
}

export default App;
