import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          NIL Capstone
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Introduction</Link>
          </li>
          <li className="navbar-item">
            <Link to="/literature" className="navbar-link">Literature Review</Link>
          </li>
          <li className="navbar-item">
            <Link to="/methodology" className="navbar-link">Methodology</Link>
          </li>
          <li className="navbar-item">
            <Link to="/findings" className="navbar-link">Findings</Link>
          </li>
          <li className="navbar-item">
            <Link to="/conclusion" className="navbar-link">Conclusion</Link>
          </li>
          <li className="navbar-item">
            <Link to="/works-cited" className="navbar-link">Works Cited</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
