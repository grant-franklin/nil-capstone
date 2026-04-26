import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Introduction from './pages/Introduction';
import Literature from './pages/Literature';
import Methodology from './pages/Methodology';
import Findings from './pages/Findings';
import Conclusion from './pages/Conclusion';
import WorksCited from './pages/WorksCited';
import Estimator from './pages/Estimator';
import './App.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Introduction' },
    { path: '/literature', label: 'Literature' },
    { path: '/methodology', label: 'Methodology' },
    { path: '/findings', label: 'Findings' },
    { path: '/conclusion', label: 'Conclusion' },
    { path: '/works-cited', label: 'Works Cited' },
    { path: '/estimator', label: 'NIL Estimator' },
  ];

  return (
    <nav className="navbar">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-button ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

const Hero = () => (
  <div className="hero">
    <div className="hero-content">
      <span className="hero-label">DCDA Capstone Project</span>
      <h1 className="hero-title">The NIL Divide: Money, Power & Competitive Balance</h1>
      <p className="hero-subtitle">Grant Franklin - DCDA Capstone - Spring 2026</p>
    </div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Hero />
        <Navigation />
        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/literature" element={<Literature />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/findings" element={<Findings />} />
              <Route path="/conclusion" element={<Conclusion />} />
              <Route path="/works-cited" element={<WorksCited />} />
              <Route path="/estimator" element={<Estimator />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
