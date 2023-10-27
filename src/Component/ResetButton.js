import React from 'react';
import "../Style/ResetButton.css"

function ResetButton({resetButton}) {
  return (
        <button className='resetbutton' onClick={resetButton}>Reset</button>
  )
}

export default ResetButton