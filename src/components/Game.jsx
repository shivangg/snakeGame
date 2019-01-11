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
    this.state = {
      direction: 'ArrowRight'
    }
  }
  componentDidMount() {
    window.addEventListener('keydown', event => {
      this.setState({
        direction: event.key
      })
    });
  }


  render() {
    return (
      <div style={this.sizes.platform} className='Platform'>
        {/* <SnakeHead /> */}
        <SnakeBody direction={this.state.direction} />
      </div>
    );
  }
}



export default Platform;