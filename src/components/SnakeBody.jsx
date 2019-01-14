import React from 'react';
import SnakeBodyBlock from './SnakeBodyBlock';
import Food from './Food';

class SnakeBody extends React.Component {
  constructor(props) {
    super(props);
    this.snakeBlockSize = parseInt(this.props.size, 10);

    // initial snake near middle
    let headLocation = 50 - 50 % this.snakeBlockSize ;

    let snakeBody = [
      {
        x: headLocation - this.snakeBlockSize,
        y: headLocation,
      },
      {
        x: headLocation - 2 * this.snakeBlockSize,
        y: headLocation,
      },
      {
        x: headLocation - 3 * this.snakeBlockSize,
        y: headLocation,
      }
    ];

    this.state = {
      snakeBody: snakeBody,
      foodLocation: this.getNewLocation(this.snakeBlockSize),
      currentDir: this.props.direction
    };

    this.moveSnake = this.moveSnake.bind(this);
    this.checkFood = this.checkFood.bind(this);
    this.moveSnakeForward = this.moveSnakeForward.bind(this);
    this.onSameLocationRun = this.onSameLocationRun.bind(this);
    this.die = this.die.bind(this);
    this.eatItself = this.eatItself.bind(this);
    this.dropFood = this.dropFood.bind(this);
    this.getNewLocation = this.getNewLocation.bind(this);
  }

  componentDidMount() {
    this.mover = setInterval(() => {
      this.moveSnake(this.props.direction)
    }, 100);
  }

  getNewLocation(size) {
    let randX = parseInt(Math.random() * 100, 10);
    randX -= randX % this.snakeBlockSize;
    let randY = parseInt(Math.random() * 100, 10);
    randY -= randY % this.snakeBlockSize;

    let foodLocation = {
      x: randX,
      y: randY
    }
    console.log(randX, randY);

    return foodLocation;
  }

  moveSnakeForward(isFoodEaten, dir) {

    this.setState(state => {
      let getNewHeadFromDir = () => {
        let newHead = {
          x: state.snakeBody[0].x,
          y: state.snakeBody[0].y
        };
        if (dir === 'ArrowRight')
          newHead.x += this.snakeBlockSize;
        else if (dir === 'ArrowLeft')
          newHead.x -= this.snakeBlockSize;
        else if (dir === 'ArrowUp')
          newHead.y -= this.snakeBlockSize;
        else if (dir === 'ArrowDown')
          newHead.y += this.snakeBlockSize;

        return newHead;
      }

      let newHead = getNewHeadFromDir();

      this.eatItself(newHead);

      // dead
      if (newHead.x + this.snakeBlockSize > 100 ||
        newHead.y + this.snakeBlockSize > 100 ||
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
    console.log('Imma ded!');
    // console.trace()
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
    let foodLocation = this.getNewLocation(this.snakeBlockSize);
    this.setState({
      foodLocation: foodLocation
    });
  }

  render() {
    let body = [];
    for (let index = 0; index < this.state.snakeBody.length; index++) {
      body.push(<SnakeBodyBlock
        size={this.snakeBlockSize}
        key={index}
        head={index === 0}
        location={this.state.snakeBody[index]}
      />)
    }

    return (
      <div>
        <div>
          {body}
        </div>
        < Food size={this.snakeBlockSize} foodLocation={this.state.foodLocation}
        />
      </div>
    )
  }

}

export default SnakeBody