import React, { useState, useRef, ElementType } from 'react';
import logo from './logo.svg';
import './App.css';

function App(props: {appName: string}) {
  const [greeting, setGreeting] = useState("");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>{ props.appName }</h2>
      <p>
        <input value={greeting} onChange={e => setGreeting(e.currentTarget.value)}/>
      </p>
      <p>
        <strong>Greeting: </strong> { greeting } 
      </p>     
    </div>
  );
}

export default App;
