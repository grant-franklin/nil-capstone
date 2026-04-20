import React from 'react';
import Part4Dashboard from './Part4Dashboard';
import './Pages.css';

export default function Findings() {
  return (
    <div className="page-container">
      <h1>Findings</h1>
      <section className="page-content">
        <p>
          This section presents the key findings from our research on NIL policies
          and their impact on collegiate athletes.
        </p>
      </section>

      <Part4Dashboard />
    </div>
  );
}
