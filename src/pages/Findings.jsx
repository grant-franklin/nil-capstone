import React from 'react';
import DashboardPart3 from '../components/DashboardPart3';
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
      
      <DashboardPart3 />
    </div>
  );
}
