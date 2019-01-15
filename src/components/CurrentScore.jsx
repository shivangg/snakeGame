import React from 'react';
import BestScore from "./BestScore";

function CurrentScore(props) {
  let currentScore = props.snakeLength - props.initSnakeLength;
  return (
    <div>
      <div className="current-score">
        Current Score
          <br />
        {currentScore}
      </div>

      {props.gameOver ? <BestScore currentScore={currentScore} /> : false }

    </div>
  );
}

export default CurrentScore;