import React from 'react';
import 'theme/test.css';

export default class Hello extends React.Component {
  state = {
    count: 1,
  };

  addCount = () => {
    this.setState({
      count: this.state.count += 1,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.addCount}>click me</button>
      </div>
    );
  }
}
