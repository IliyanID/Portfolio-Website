import React, { PureComponent, Fragment } from 'react';
import './App.css';
import Terminal from'./Terminal/Terminal'

class App extends PureComponent {

  render () {
    return (
    <div id="app">
      <ul id="navBar">
        <li>01. About</li>
        <li>02. Experience</li>
        <li>03. Work</li>
        <li>04. Contact Me</li>
      </ul>
      <ul id="tabs">
                <li>Terminal  X</li>
            </ul>
      <Terminal></Terminal>
      <p id="footer">Created and Desighned by Iliyan Dimitrov</p>
    </div>
    );
  }
}

export default App;
