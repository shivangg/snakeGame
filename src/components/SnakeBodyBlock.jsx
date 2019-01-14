import React from 'react';

function SnakeBodyBlock(props) {
  const style = {
    height: props.size + '%',
    width: props.size + '%',
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