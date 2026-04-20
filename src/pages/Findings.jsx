import React, { useState } from 'react';
import Part3Dashboard from './Part3Dashboard';
import Part4Dashboard from './Part4Dashboard';
import './Pages.css';

export default function Findings() {
  const [activeView, setActiveView] = useState('part3');

  return (
    <div className="page-container">
      <h1>Findings</h1>
      <section className="page-content">
        <p>
          This section presents the key findings from our research on NIL policies
          and their impact on collegiate athletes.
        </p>
      </section>

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveView('part3')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            backgroundColor: activeView === 'part3' ? '#007bff' : '#e9ecef',
            color: activeView === 'part3' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: activeView === 'part3' ? 'bold' : 'normal',
          }}
        >
          Dashboard Explorer
        </button>
        <button
          onClick={() => setActiveView('part4')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: activeView === 'part4' ? '#007bff' : '#e9ecef',
            color: activeView === 'part4' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: activeView === 'part4' ? 'bold' : 'normal',
          }}
        >
          Narrative View
        </button>
      </div>

      {activeView === 'part3' && <Part3Dashboard />}
      {activeView === 'part4' && <Part4Dashboard />}
    </div>
  );
}
