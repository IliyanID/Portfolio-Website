import React, { PureComponent, Fragment } from 'react';
import './App.css';
import Terminal from'./Terminal/Terminal'

class App extends PureComponent {

  render () {
    return (
    <div id="app">
      <h1>Welcome to an Interactive Portfolio</h1>
      <Terminal></Terminal>
    </div>
    );
  }
}

export default App;
