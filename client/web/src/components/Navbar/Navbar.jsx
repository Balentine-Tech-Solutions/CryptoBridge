import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>CryptoBridge</h1>
        </div>
        <div className="navbar-links">
          {/* Navigation links to be implemented */}
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/services">Services</a>
        </div>
        <div className="navbar-actions">
          <ThemeToggle />
          {/* Additional actions like login/profile */}
        </div>
      </div>
    </nav>
  );
}
