import React from 'react';
import SnakeBodyBlock from './SnakeBodyBlock';
import Food from './Food';

class SnakeBody extends React.Component {
  constructor(props) {
    super(props);
    let headLocation = props.head;
    this.size = 5;

    let foodLocation = {
      x: parseInt(Math.random() * 20, 10) * 5,
      y: parseInt(Math.random() * 20, 10) * 5
    };

    let snakeBody = [
      {
        x: headLocation.x - this.size,
        y: headLocation.y,
      },
      {
        x: headLocation.x - 2 * this.size,
        y: headLocation.y,
      },
      {
        x: headLocation.x - 3 * this.size,
        y: headLocation.y,
      },
      {
        x: headLocation.x - 4 * this.size,
        y: headLocation.y,
      },
      {
        x: headLocation.x - 5 * this.size,
        y: headLocation.y,
      },
      {
        x: headLocation.x - 6 * this.size,
        y: headLocation.y,
      },
      {
        x: headLocation.x - 7 * this.size,
        y: headLocation.y,
      }
    ];

    this.state = {
      snakeBody: snakeBody,
      foodLocation: foodLocation
    }
    this.moveSnake = this.moveSnake.bind(this);
    this.checkFood = this.checkFood.bind(this);
  }

  componentDidMount() {
    this.mover = setInterval(() => {
      this.moveSnake(this.props.direction)
    }, 200);
  }

  moveSnake(dir) {
    let isFoodEaten = this.checkFood();
    this.setState(state => {
      let newHead = {
        x: state.snakeBody[0].x,
        y: state.snakeBody[0].y
      };
      if (dir === 'ArrowRight')
        newHead.x += this.size;
      else if (dir === 'ArrowLeft')
        newHead.x -= this.size;
      else if (dir === 'ArrowUp')
        newHead.y -= this.size;
      else if (dir === 'ArrowDown')
        newHead.y += this.size;

      // dead
      if (newHead.x + this.size > 100 ||
        newHead.y + this.size > 100 ||
        newHead.x < 0 ||
        newHead.y < 0) {
        console.log('dead');
        clearInterval(this.mover);
        return
      }



      let newState = {
        snakeBody: [newHead, ...state.snakeBody]
      };
      if (!isFoodEaten) {
        newState.snakeBody.pop();
      }
      return newState;
    })
  }

  checkFood() {
    // increase the snake length
    console.log("Check Food!");
    const headLocation = {
      x: this.state.snakeBody[0].x,
      y: this.state.snakeBody[0].y
    };

    let { x: x1, y: y1 } = headLocation;
    let { x: x2, y: y2 } = this.state.foodLocation;

    if (x1 === x2 && y1 === y2) {
      console.log("Lets eat!");
      this.dropFood();
      return true;
    }

    return false;
  }

  dropFood() {
    console.log("Drop new Food");
    let foodLocation = {
      x: parseInt(Math.random() * 20, 10) * 5,
      y: parseInt(Math.random() * 20, 10) * 5
    }
    this.setState({
      foodLocation: foodLocation
    });
  }

  render() {
    let body = [];
    for (let index = 0; index < this.state.snakeBody.length; index++) {
      body.push(<SnakeBodyBlock key={index} head={index === 0}
        location={this.state.snakeBody[index]} />)
    }

    return (
      <div>
        <div>
          {body}
        </div>
        < Food onFoodStep={this.handleEating}
          foodLocation={this.state.foodLocation}
        />
      </div>
    )
  }

}

export default SnakeBody