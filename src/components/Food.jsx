import React from 'react';

function Food(props) {

  const style = {
    width: '5%',
    height: '5%',
    left: props.foodLocation.x + '%',
    top: props.foodLocation.y + '%'
  };

  return (
    <div className='Food' style={style}>
    </div>
  )
}


export default Food;