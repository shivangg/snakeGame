import React from 'react';
// import SnakeHead from './SnakeHead';
import SnakeBody from './SnakeBody';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.sizes = {
      platform: this.computePlayingField(window.innerHeight, window.innerWidth),
      snake: 2
    };
    // initial state
    this.state = {
      direction: 'ArrowRight',
    }
    this.computePlayingField = this.computePlayingField.bind(this);
  }

  computePlayingField(screenHeight, screenWidth) {
    let padding = 0.2;
    let width;
    let height;
    let fieldLeftEdge;
    let fieldTopEdge;

    let shorter = Math.min(screenHeight, screenWidth);
    let longer = Math.max(screenHeight, screenWidth);

    let longerWidth = shorter === screenHeight;

    // leave 20% on each side of the shorter dimension
    // for longer width screens
    if (longerWidth) {
      width = shorter * (1 - 2 * padding) ;
      height = width;
      fieldLeftEdge = longer / 2 - width / 2 ;
      fieldTopEdge = shorter / 2  - height / 2 ;
    } else {
      height = shorter * (1 - 2 * padding) ;
      width = height;
      fieldLeftEdge = shorter / 2 - width / 2;
      fieldTopEdge = longer / 2 - height / 2;
    }


    return {
      top: fieldTopEdge,
      left: fieldLeftEdge,
      width: width,
      height: height
    }

  }

  componentDidMount() {
    window.addEventListener('keydown', event => {
      this.setState(state => {

        let oppDirGiven = (currentDir, newDir) => {
          const oppDir = {
            'ArrowRight': 'ArrowLeft',
            'ArrowLeft': 'ArrowRight',
            'ArrowUp': 'ArrowDown',
            'ArrowDown': 'ArrowUp'
          }
          return currentDir === oppDir[newDir]
        }

        if (!oppDirGiven(state.direction, event.key )) {
          return ({
            direction: event.key,
          });
        }
      })
    })
  }


  render() {
    return (
      <div tabIndex="1" style={this.sizes.platform} className='Platform'>
        <SnakeBody size={this.sizes.snake} direction={this.state.direction} />
      </div>
    );
  }
}



export default Game;