import React from 'react';
// import SnakeHead from './SnakeHead';
import SnakeBody from './SnakeBody';

class Platform extends React.Component {

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
      head: {
        x: 50,
        y: 50
      },
      direction: 'ArrowRight'
    }
  }
  componentDidMount() {
    window.addEventListener('keydown', event => {
      this.setState({
        head: {
          x: 50,
          y: 50
        },
        direction: event.key
      })
    });
  }


  render() {
    return (
      <div tabIndex="1" style={this.sizes.platform} className='Platform'>
        <SnakeBody head={this.state.head} direction={this.state.direction} />
      </div>
    );
  }
}



export default Platform;