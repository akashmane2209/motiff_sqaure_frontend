import React, { Component } from 'react';
import './index.css';
export class Loading extends Component {
  render() {
    return (
      <div className='main'>
        <div className='loading'>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loading;
