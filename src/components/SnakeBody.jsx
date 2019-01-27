import React from 'react';
import SnakeBodyBlock from './SnakeBodyBlock';
import Food from './Food';
import CurrentScore from "./CurrentScore";

class SnakeBody extends React.Component {
  constructor(props) {
    super(props);
    this.snakeBlockSize = parseInt(this.props.size, 10);

    // initial snake near middle
    let headLocation = 50 - 50 % this.snakeBlockSize;

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

    this.initSnakeLength = snakeBody.length;

    this.state = {
      snakeBody: snakeBody,
      currentDir: this.props.direction,
      gameOver: false
    };

    this.state.foodLocation = this.getNewLocation();

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

  getNewLocation() {

    let randX = parseInt(Math.random() * 100, 10);
    randX -= randX % this.snakeBlockSize;
    let randY = parseInt(Math.random() * 100, 10);
    randY -= randY % this.snakeBlockSize;

    for (let index = 0; index < this.state.snakeBody.length; index += 1) {
      const bodyBlock = this.state.snakeBody[index];

      if (bodyBlock.x === randX && bodyBlock.y === randY) {
        randX = parseInt(Math.random() * 100, 10);
        randX -= randX % this.snakeBlockSize;
        randY = parseInt(Math.random() * 100, 10);
        randY -= randY % this.snakeBlockSize;
        index = 0;
        console.log("food overlap detected!");

      }
    }

    let foodLocation = {
      x: randX,
      y: randY
    }
    // console.log(randX, randY);

    return foodLocation;
  }

  moveSnakeForward(isFoodEaten, newDir) {

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


      let getNewHeadFromDir = () => {
        let newHead = {
          x: state.snakeBody[0].x,
          y: state.snakeBody[0].y
        };

        if (oppDirGiven(state.currentDir, newDir)) {
          newDir = state.currentDir;
        }
        if (window.TouchEvent) {
          window.dispatchEvent(new TouchEvent('touchend'));
        }

        if (newDir === 'ArrowRight')
          newHead.x += this.snakeBlockSize;
        else if (newDir === 'ArrowLeft')
          newHead.x -= this.snakeBlockSize;
        else if (newDir === 'ArrowUp')
          newHead.y -= this.snakeBlockSize;
        else if (newDir === 'ArrowDown')
          newHead.y += this.snakeBlockSize;

        return newHead;
      }

      let newHead = getNewHeadFromDir();

      this.eatItself(newHead);

      // dead from wall
      if (newHead.x + this.snakeBlockSize > 100 ||
        newHead.y + this.snakeBlockSize > 100 ||
        newHead.x < 0 ||
        newHead.y < 0) {
        this.die();
        return { gameOver: true }
      }


      let newState = {
        snakeBody: [newHead, ...state.snakeBody],
        currentDir: newDir,
      };
      if (!isFoodEaten) {
        newState.snakeBody.pop();
      }
      return newState;
    })
  }

  moveSnake(newDir) {
    let isFoodEaten = this.checkFood();

    this.moveSnakeForward(isFoodEaten, newDir);
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
    clearInterval(this.mover);
    // console.trace()
  }

  eatItself(newHead) {

    // !oppDir[newDir] === this.state.currentDir
    for (let bodyState of this.state.snakeBody) {
      this.onSameLocationRun(newHead, bodyState, this.die);
    }

  }

  dropFood() {
    // console.log("Drop new Food");
    let foodLocation = this.getNewLocation();
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
        <CurrentScore gameOver={this.state.gameOver} snakeLength={this.state.snakeBody.length} initSnakeLength={this.initSnakeLength} />
      </div>
    )
  }

}

export default SnakeBody