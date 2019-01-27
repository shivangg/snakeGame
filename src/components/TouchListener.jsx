import React from 'react';

class TouchListener extends React.Component {

  constructor(props) {
    super(props);

    // const sampleSize = 10;
    let touches = [];
    // for (let index = 0; index < sampleSize; index++) {
    //   let touch = {
    //     x: 0,
    //     y: 0
    //   };
    //   touches.push(touch);
    // }

    this.state = {
      touches: touches,
      direction: 'right'
    };
    this.computeSwipeDirection = this.computeSwipeDirection.bind(this);
  }

  computeSwipeDirection(touchArray) {
    const offset = touchArray[0];
    const swipeThreshold = 10;
    touchArray = touchArray.map(currentTouch => {
      return {
        x: currentTouch.x - offset.x,
        y: currentTouch.y - offset.y
      }
    });

    let mean = touchArray.reduce((accumulator, currentTouch) => {
      return {
        x: accumulator.x + (currentTouch.x / touchArray.length),
        y: accumulator.y + (currentTouch.y / touchArray.length)
      }
    });

    mean = {
      x: Math.round( mean.x * 10 ) / 10,
      y: Math.round(mean.y * 10) / 10,
    }


    if (mean.x > swipeThreshold) {
      window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight'}));
      return 'right';
    } else if (mean.x < -swipeThreshold) {
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowLeft' }));
      return 'left';
    } else if (mean.y > swipeThreshold) {
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
      return 'down';
    } else if (mean.y < -swipeThreshold) {
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowUp' }));
      return 'up';
    }

    return "ignore";
  }

  componentDidMount() {
    window.addEventListener("touchmove", (event) => {
      // console.log(event.touches[0].clientX, event.touches[0].clientY);

      this.setState(state => {
        state.touches.push({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        });
        // state.touches.shift();
        let swipeDirection = this.computeSwipeDirection(state.touches);
        // console.log(swipeDirection);

        if (swipeDirection !== 'ignore') {
          return {
            touches: state.touches,
            direction: swipeDirection
          }
        }
      });
    });

    window.addEventListener('touchend', () => {
      this.setState(state => {
        return {
          touches: [],
          direction: state.direction
        }
      })
    });
  }

  render() {
    if (this.props.debug) {
      return (
        <div>
          <p> TouchListener </p>
          <p> {JSON.stringify(this.state.touches.length)} </p>
          <p> {JSON.stringify(this.state.direction)} </p>
        </div >
      );
    }
    return null;
  }


}

export default TouchListener;