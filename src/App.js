import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const author = "Shuai";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World!
        </p>
        <p>{author}'s Personal Website</p>
      </header>
    </div>
  );
}

export default App;
