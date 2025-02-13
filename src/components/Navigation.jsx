import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/">Ali Abdur-Razzaq</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Gallery</Link>
        <Link to="/about">About</Link>
        {/* <Link to="/contact">Contact</Link> */}
        <Link to="/new-contact">Contact Me</Link>
      </div>
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
};

export default Navigation;
