import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard/GlassCard';
import '../styles/pages.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CryptoBridge</h1>
          <p className="hero-subtitle">Bridging Crypto and Traditional Finance</p>
          <p className="hero-description">
            Seamlessly manage your digital assets alongside traditional banking, 
            investments, and remittances all in one secure platform.
          </p>
          
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <GlassCard className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Multi-Currency Support</h3>
            <p>Trade and hold multiple cryptocurrencies and fiat currencies</p>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-icon">🏦</div>
            <h3>Bank Integration</h3>
            <p>Connect with traditional banking services seamlessly</p>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Portfolio Management</h3>
            <p>Track and manage your investments in real-time</p>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Remittance</h3>
            <p>Send money worldwide with competitive rates</p>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Compliant</h3>
            <p>Bank-level security with KYC/AML compliance</p>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile First</h3>
            <p>Access your account anytime, anywhere</p>
          </GlassCard>
        </div>
      </section>

      <section className="stats">
        <h2>Why Choose CryptoBridge?</h2>
        <div className="stats-grid">
          <div className="stat">
            <h3>99.9%</h3>
            <p>Uptime Guarantee</p>
          </div>
          <div className="stat">
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>
          <div className="stat">
            <h3>100%</h3>
            <p>Fund Security</p>
          </div>
          <div className="stat">
            <h3>$0</h3>
            <p>Monthly Fees</p>
          </div>
        </div>
      </section>
    </div>
  );
}
