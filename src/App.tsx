import React from 'react';
import './App.css';
import Identity from './components/Identity';
import CDP from './components/CDP';
import Loyalty from './components/Loyalty';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fan Engagement Platform</h1>
      </header>
      <main>
        <Identity />
        <CDP />
        <Loyalty />
      </main>
    </div>
  );
}

export default App;