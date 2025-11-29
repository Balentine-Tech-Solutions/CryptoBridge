import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard/GlassCard';
import '../styles/pages.css';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    dayChange: 0,
    assets: []
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // TODO: Replace with actual API calls
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        verified: true
      });

      setPortfolio({
        totalValue: 45230.50,
        dayChange: 1250.75,
        dayChangePercent: 2.84,
        assets: [
          { symbol: 'BTC', amount: 0.5, value: 21000, change: 5 },
          { symbol: 'ETH', amount: 5, value: 16800, change: 3 },
          { symbol: 'USD', amount: 7430.50, value: 7430.50, change: 0 }
        ]
      });

      setTransactions([
        {
          id: 'TXN_001',
          type: 'buy',
          asset: 'BTC',
          amount: 0.5,
          value: 21000,
          date: new Date(),
          status: 'completed'
        },
        {
          id: 'TXN_002',
          type: 'transfer',
          asset: 'ETH',
          amount: 2,
          value: 6720,
          date: new Date(Date.now() - 86400000),
          status: 'completed'
        }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Your financial hub</p>
      </header>

      <section className="portfolio-overview">
        <GlassCard className="portfolio-card">
          <h2>Portfolio Value</h2>
          <div className="portfolio-amount">
            <span className="amount">${portfolio.totalValue.toLocaleString()}</span>
            <span className={`change ${portfolio.dayChange >= 0 ? 'positive' : 'negative'}`}>
              {portfolio.dayChange >= 0 ? '+' : ''}{portfolio.dayChange.toFixed(2)} ({portfolio.dayChangePercent}%)
            </span>
          </div>
        </GlassCard>

        <GlassCard className="portfolio-card">
          <h2>Account Status</h2>
          <div className="account-status">
            <p>✓ Account Verified</p>
            <p>✓ 2FA Enabled</p>
            <p>✓ KYC Approved</p>
          </div>
        </GlassCard>
      </section>

      <section className="assets">
        <h2>Your Assets</h2>
        <div className="assets-table">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Amount</th>
                <th>Value</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.assets.map(asset => (
                <tr key={asset.symbol}>
                  <td>{asset.symbol}</td>
                  <td>{asset.amount}</td>
                  <td>${asset.value.toLocaleString()}</td>
                  <td className={asset.change >= 0 ? 'positive' : 'negative'}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="recent-transactions">
        <h2>Recent Transactions</h2>
        <div className="transactions-list">
          {transactions.map(txn => (
            <GlassCard key={txn.id} className="transaction-item">
              <div className="transaction-info">
                <span className="transaction-type">{txn.type.toUpperCase()}</span>
                <span className="transaction-asset">{txn.asset}</span>
              </div>
              <div className="transaction-amount">
                <span>${txn.value}</span>
              </div>
              <div className="transaction-status">
                <span className={`status ${txn.status}`}>{txn.status}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
