import React from "react";
import "../Style/Box.css";

function Box({ value, onClick }) {
  const style = value === "X" ? "box x" : "box o";
  return (
    <div>
      <button id="button" className={style} onClick={onClick}>
        {value}
      </button>
    </div>
  );
}

export default Box;
