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
      foodLocation: foodLocation,
      currentDir: this.props.direction
    };

    this.moveSnake = this.moveSnake.bind(this);
    this.checkFood = this.checkFood.bind(this);
    this.moveSnakeForward = this.moveSnakeForward.bind(this);
    this.onSameLocationRun = this.onSameLocationRun.bind(this);
    this.die = this.die.bind(this);
    this.eatItself = this.eatItself.bind(this);
    this.dropFood = this.dropFood.bind(this);
  }

  componentDidMount() {
    this.mover = setInterval(() => {
      this.moveSnake(this.props.direction)
    }, 100);
  }

  moveSnakeForward(isFoodEaten, dir) {

    this.setState(state => {
      let getNewHeadFromDir = () => {
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

          return newHead;
      }

      let newHead = getNewHeadFromDir();

      this.eatItself(newHead);

      // dead
      if (newHead.x + this.size > 100 ||
        newHead.y + this.size > 100 ||
        newHead.x < 0 ||
        newHead.y < 0) {
        this.die();
        return
      }


      let newState = {
        snakeBody: [newHead, ...state.snakeBody],
        currentDir: this.props.direction
      };
      if (!isFoodEaten) {
        newState.snakeBody.pop();
      }
      return newState;
    })
  }

  moveSnake(dir) {
    let isFoodEaten = this.checkFood();

    this.moveSnakeForward(isFoodEaten, dir);
  }

  checkFood() {
    // increase the snake length
    // console.log("Check Food!");
    const headLocation = {
      x: this.state.snakeBody[0].x,
      y: this.state.snakeBody[0].y
    };

    return this.onSameLocationRun(headLocation, this.state.foodLocation, this.dropFood)
  }

  onSameLocationRun(obj1, obj2, fn) {
    let { x: x1, y: y1 } = obj1;
    let { x: x2, y: y2 } = obj2;

    if (x1 === x2 && y1 === y2) {
      // console.log("Lets eat!");
      fn();
      return true;
    }
    return false;
  }

  die() {
    console.log('dead');
    clearInterval(this.mover);
  }

  eatItself(newHead) {

    // !oppDir[dir] === this.state.currentDir
    for (let bodyState of this.state.snakeBody) {
      this.onSameLocationRun(newHead, bodyState, this.die);
    }

  }

  dropFood() {
    // console.log("Drop new Food");
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
        < Food foodLocation={this.state.foodLocation}
        />
      </div>
    )
  }

}

export default SnakeBody