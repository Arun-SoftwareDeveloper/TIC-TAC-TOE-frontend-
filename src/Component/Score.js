import React from "react";
import "../Style/Score.css";

function ScoreBoard({ scores, xvalue }) {
  const { xScore, oScore } = scores;
  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xvalue && "inactive"}`}>
        X - {xScore}
      </span>
      <span className={`score o-score ${xvalue && "inactive"}`}>
        O - {oScore}
      </span>
    </div>
  );
}

export default ScoreBoard;
