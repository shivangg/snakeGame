import React from 'react';
import SnakeBodyBlock from './SnakeBodyBlock'
class SnakeBody extends React.Component {
  constructor(props) {
    super(props);
    this.size = 5;
    let snakeBody = [
      {
        x: 50 - this.size,
        y: 50,
      },
      {
        x: 50 - 2 * this.size,
        y: 50,
      },
      {
        x: 50 - 3 * this.size,
        y: 50,
      },
      {
        x: 50 - 4 * this.size,
        y: 50,
      },
      {
        x: 50 - 5 * this.size,
        y: 50,
      },
      {
        x: 50 - 6 * this.size,
        y: 50,
      },
      {
        x: 50 - 7 * this.size,
        y: 50,
      }
    ];

    this.state = {
      snakeBody: snakeBody
    }
    this.moveSnake = this.moveSnake.bind(this);
  }

  componentDidMount() {
    this.mover = setInterval(() => {
      this.moveSnake(this.props.direction)
    }, 200);
  }

  moveSnake(dir) {
    this.setState(state => {
      let newElement = {
        x: state.snakeBody[0].x,
        y: state.snakeBody[0].y
      };
      if (dir === 'ArrowRight')
        newElement.x += this.size;
      else if (dir === 'ArrowLeft')
        newElement.x -= this.size;
      else if (dir === 'ArrowUp')
        newElement.y -= this.size;
      else if (dir === 'ArrowDown')
        newElement.y += this.size;

      if (newElement.x + this.size > 100 ||
        newElement.y + this.size > 100 ||
        newElement.x < 0 ||
        newElement.y < 0) {
        console.log('dead');
        clearInterval(this.mover);
        return 
      }

      let newState = {
        snakeBody: [newElement, ...state.snakeBody]
      };
      newState.snakeBody.pop();
      return newState;
    })
  }

  render() {
    let body = [];
    for (let index = 0; index < this.state.snakeBody.length; index++) {
      body.push(<SnakeBodyBlock key={index} head={index === 0} 
        location={this.state.snakeBody[index]} />)
    }
    return (
      <div>
        {body}
      </div>
    )
  }

}

export default SnakeBody