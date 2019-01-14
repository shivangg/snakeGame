import React from 'react';

function Food(props) {

  const style = {
    width: props.size + '%',
    height:  props.size + '%',
    left: props.foodLocation.x + '%',
    top: props.foodLocation.y + '%'
  };

  return (
    <div className='Food' style={style}>
    </div>
  )
}


export default Food;