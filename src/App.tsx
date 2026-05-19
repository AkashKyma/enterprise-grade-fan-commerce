import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Membership from './components/Membership';
import Ticketing from './components/Ticketing';
import Loyalty from './components/Loyalty';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/ticketing" element={<Ticketing />} />
        <Route path="/loyalty" element={<Loyalty />} />
      </Routes>
    </Router>
  );
};

export default App;