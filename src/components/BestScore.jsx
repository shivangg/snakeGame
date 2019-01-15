import React from 'react';

function CurrentScore(props) {

  let storage = window.localStorage;
  let bestScore = storage.getItem('bestScore');
  let newBestScore = false;

  if (!bestScore) {
    storage.setItem('bestScore', props.currentScore);
  } else if (parseInt(props.currentScore, 10) > parseInt(bestScore, 10)) {
    newBest(props.currentScore);
  }

  function newBest(value) {
    storage.setItem('bestScore', value);
    newBestScore = true;
  }

  return (
    <div className="best-score">
      {newBestScore? "Congrats!, Your New" : "Beat the"} Best Score
          <br />
      {storage.getItem('bestScore')}
    </div>
  );
}

export default CurrentScore;