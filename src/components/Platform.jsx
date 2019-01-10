import React from 'react';
import Snake from './Snake';

function Platform(props) {

  const platformSize = {
    width: '50%',
    height: '50%'
  };

  const snakeSize = {
    width: '5%',
    height: '5%'
  };

  return (
    <div style={platformSize} className='Platform'>
      <Snake style={snakeSize} pressedKey={props.pressedKey} />
    </div>
  );
}



export default Platform;