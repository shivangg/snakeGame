import React from 'react';

function Food(props) {
  const style = {
    width: '5%',
    height: '5%',
    left: props.x,
    top: props.y
  }
  return (
    <div className='Food' style={style}>

    </div>
  )
}

export default Food;