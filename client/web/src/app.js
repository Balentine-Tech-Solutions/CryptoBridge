import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';

// Import pages and components as needed
// import HomePage from './pages/home';
// import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Routes will be configured here */}
        </Routes>
      </div>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
