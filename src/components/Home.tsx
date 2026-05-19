import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../config';

const features = [
  {
    title: 'Profile',
    path: '/profile',
    desc: 'Unified fan identity — email, phone, membership.',
    icon: '👤',
  },
  {
    title: 'Membership',
    path: '/membership',
    desc: 'Plans, tiers, and subscriber benefits.',
    icon: '🎫',
  },
  {
    title: 'Ticketing',
    path: '/ticketing',
    desc: 'Events, seats, and digital access.',
    icon: '🎟️',
  },
  {
    title: 'Loyalty',
    path: '/loyalty',
    desc: 'Points, rewards, and engagement.',
    icon: '⭐',
  },
];

const Home: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    axios
      .get(`${API_BASE}/health`, { timeout: 5000 })
      .then(() => setApiStatus('ok'))
      .catch(() => setApiStatus('error'));
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Enterprise Fan Commerce</p>
        <h1>Welcome to the Fan Platform</h1>
        <p className="lead">
          One fan · one identity · one wallet · one access. Explore the modules below.
        </p>
        <span className={`badge badge-${apiStatus}`}>
          {apiStatus === 'loading' && 'Checking API…'}
          {apiStatus === 'ok' && '● API connected'}
          {apiStatus === 'error' && '○ API offline — run npm run api:dev'}
        </span>
      </section>

      <section className="cards">
        {features.map((f) => (
          <Link key={f.path} to={f.path} className="card">
            <span className="card-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <span className="card-cta">Open →</span>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
