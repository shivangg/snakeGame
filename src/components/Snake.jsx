import React from 'react';

class Snake extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      x: 50,
      y: 50,
      vel: {
        x: 0,
        y: 0
      }
    };
    this.pressedKey = 'ArrowRight';
    this.moveTo = this.moveTo.bind(this);
  }

  keyPressToVel(pressedKey) {
    let velX = 0;
    let velY = 0;
    const speed = 5;
    if (pressedKey === 'ArrowUp') {
      velY = -speed;

    } else if (pressedKey === 'ArrowDown') {
      velY = speed;

    } else if (pressedKey === 'ArrowRight') {
      velX = speed;

    } else if (pressedKey === 'ArrowLeft') {
      velX = -speed;
    }

    return { x: velX, y: velY };
  }

  moveTo() {
    this.setState((state, props) => {
      // state updates are async in react
      // So, rather than directly referencing this.state
      // used a second form of the setState func
      // let newVel = this.keyPressToVel(props.pressedKey);
      let newVel = this.keyPressToVel(this.pressedKey);
      
      const posX = state.x + state.vel.x;
      const posY = state.y + state.vel.y;

      if (posX + parseInt(props.style.width, 10) > 100 ||
        posY + parseInt(props.style.height, 10) > 100 ||
        posX < 0 ||
        posY < 0) {
        console.log('dead');
        clearInterval(this.mover);
        return {
          vel: { x: 0, y: 0 }
        }
      }

      // state updates are merged by react
      return {
        x: posX,
        y: posY,
        vel: newVel
      }
    });
  }

  componentDidMount() {
    // a binding to the setInterval is stored to 
    // remove it whenever the component is unmounted
    this.mover = setInterval(() => {
      this.moveTo();
    }, 200);

    window.addEventListener('keydown', (e) => {
      this.pressedKey = e.key;
    });
  }

  componentWillUnmount() {
    clearInterval(this.mover);
  }

  render() {
    const style = {
      left: this.state.x + '%',
      top: this.state.y + '%',
      height: this.props.style.height,
      width: this.props.style.width
    }
    return (<div style={style} className='Snake'>
      Snake
    </div>);
  }
}


export default Snake;