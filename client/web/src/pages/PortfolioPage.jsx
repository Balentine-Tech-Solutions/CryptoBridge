import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard/GlassCard';
import '../styles/pages.css';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState({
    assets: [],
    totalValue: 0,
    totalInvested: 0,
    gainLoss: 0
  });
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // TODO: Replace with actual API call
      setPortfolio({
        assets: [
          {
            id: 'BTC',
            symbol: 'BTC',
            name: 'Bitcoin',
            amount: 0.5,
            value: 21000,
            purchasePrice: 35000,
            change24h: 5.2,
            allocation: 46.5
          },
          {
            id: 'ETH',
            symbol: 'ETH',
            name: 'Ethereum',
            amount: 5,
            value: 16800,
            purchasePrice: 2400,
            change24h: 3.1,
            allocation: 37.1
          },
          {
            id: 'USD',
            symbol: 'USD',
            name: 'US Dollar',
            amount: 7430.5,
            value: 7430.5,
            purchasePrice: 1,
            change24h: 0,
            allocation: 16.4
          }
        ],
        totalValue: 45230.5,
        totalInvested: 42500,
        gainLoss: 2730.5
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading portfolio...</div>;

  const gainLossPercent = ((portfolio.gainLoss / portfolio.totalInvested) * 100).toFixed(2);

  return (
    <div className="portfolio-page">
      <header className="page-header">
        <h1>Your Portfolio</h1>
        <p>Track and manage your investments</p>
      </header>

      <section className="portfolio-stats">
        <GlassCard className="stat-card">
          <h3>Total Value</h3>
          <p className="stat-value">${portfolio.totalValue.toLocaleString()}</p>
        </GlassCard>

        <GlassCard className="stat-card">
          <h3>Total Invested</h3>
          <p className="stat-value">${portfolio.totalInvested.toLocaleString()}</p>
        </GlassCard>

        <GlassCard className="stat-card">
          <h3>Gain/Loss</h3>
          <p className={`stat-value ${portfolio.gainLoss >= 0 ? 'positive' : 'negative'}`}>
            {portfolio.gainLoss >= 0 ? '+' : ''}{portfolio.gainLoss.toFixed(2)} ({gainLossPercent}%)
          </p>
        </GlassCard>
      </section>

      <section className="portfolio-assets">
        <h2>Asset Allocation</h2>
        <div className="assets-list">
          {portfolio.assets.map(asset => (
            <GlassCard 
              key={asset.id} 
              className={`asset-card ${selectedAsset?.id === asset.id ? 'selected' : ''}`}
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="asset-header">
                <div className="asset-info">
                  <h3>{asset.symbol}</h3>
                  <p>{asset.name}</p>
                </div>
                <div className="asset-amount">
                  <p className="amount">{asset.amount}</p>
                  <p className="value">${asset.value.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="asset-details">
                <div className="detail">
                  <span>24h Change</span>
                  <span className={asset.change24h >= 0 ? 'positive' : 'negative'}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </span>
                </div>
                <div className="detail">
                  <span>Allocation</span>
                  <span>{asset.allocation}%</span>
                </div>
              </div>

              <div className="asset-bar">
                <div className="progress-bar" style={{ width: `${asset.allocation}%` }}></div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {selectedAsset && (
        <section className="asset-detail">
          <h2>{selectedAsset.name} ({selectedAsset.symbol})</h2>
          <GlassCard>
            <div className="detail-grid">
              <div className="detail-item">
                <span>Current Price</span>
                <p>${(selectedAsset.value / selectedAsset.amount).toLocaleString()}</p>
              </div>
              <div className="detail-item">
                <span>Holdings</span>
                <p>{selectedAsset.amount}</p>
              </div>
              <div className="detail-item">
                <span>Purchase Price</span>
                <p>${selectedAsset.purchasePrice}</p>
              </div>
              <div className="detail-item">
                <span>Total Value</span>
                <p>${selectedAsset.value.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
        </section>
      )}
    </div>
  );
}
