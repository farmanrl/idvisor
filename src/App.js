import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';

const logo = "http://icons.iconarchive.com/icons/icons8/windows-8/256/Security-Iris-Scan-icon.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} width={48} height={48} style={{ filter: 'invert(100%)'}} alt="logo" />
          <h3>IDVISOR</h3>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default App;
