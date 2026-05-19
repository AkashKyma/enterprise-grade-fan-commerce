import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/profile', label: 'Profile' },
  { path: '/membership', label: 'Membership' },
  { path: '/ticketing', label: 'Ticketing' },
  { path: '/loyalty', label: 'Loyalty' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            Fan Platform
          </Link>
          <nav className="nav">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={pathname === path ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        API: <code>localhost:3000</code> · UI: <code>localhost:8080</code>
      </footer>
    </div>
  );
};

export default Layout;
