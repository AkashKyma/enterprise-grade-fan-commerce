import React from 'react';
import './App.css';
import IdentityModule from './components/IdentityModule';
import CDPModule from './components/CDPModule';
import LoyaltyModule from './components/LoyaltyModule';
import TicketingModule from './components/TicketingModule';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fan Engagement Platform</h1>
      </header>
      <main>
        <IdentityModule />
        <CDPModule />
        <LoyaltyModule />
        <TicketingModule />
      </main>
    </div>
  );
};

export default App;