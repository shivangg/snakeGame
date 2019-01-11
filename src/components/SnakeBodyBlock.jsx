import React from 'react';

function SnakeBodyBlock(props) {
  const style = {
    border: 'black solid 1px',
    height: '5%',
    width: '5%',
    left: props.location.x + '%',
    top: props.location.y + '%'
  }

  if (props.head === true) {
    return (
      <div className="SnakeHead" style={style}>
      </div>
    )
  }
  return (
    <div className="SnakeBody" style={style}>
    </div>
  )
}

export default SnakeBodyBlock;