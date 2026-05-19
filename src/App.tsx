import React from 'react';
import Identity from './components/Identity';
import CDP from './components/CDP';
import Loyalty from './components/Loyalty';
import Ticketing from './components/Ticketing';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Fan Engagement Platform</h1>
      <Identity />
      <CDP />
      <Loyalty />
      <Ticketing />
    </div>
  );
};

export default App;