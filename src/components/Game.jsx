import React from 'react';
// import SnakeHead from './SnakeHead';
import SnakeBody from './SnakeBody';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.sizes = {
      platform: {
        width: '50%',
        height: '50%'
      },
      snake: {
        width: 5,
        height: 5
      }
    };
    // initial state
    this.state = {
      direction: 'ArrowRight',
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
        <SnakeBody size={2} direction={this.state.direction} />
      </div>
    );
  }
}



export default Game;