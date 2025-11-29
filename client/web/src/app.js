import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import styles
import './styles/index.css';
import './styles/theme.css';
import './styles/glass.css';
import './styles/popover.css';
import './styles/accessibility.css';

// Import components
import Navbar from './components/Navbar/Navbar';

// Import pages and components as needed
// import HomePage from './pages/home';
// import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            {/* Routes will be configured here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
