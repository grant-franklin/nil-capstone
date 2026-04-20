import React from 'react';
import './Pages.css';

export default function Methodology() {
  return (
    <div className="page-container">
      <h1>Methodology</h1>
      <section className="page-content">
        <h2>Research Design</h2>
        <p>
          This study employed a mixed-methods approach combining qualitative interviews
          and quantitative data analysis.
        </p>

        <h2>Data Collection</h2>
        <ul>
          <li>Surveys administered to student-athletes across multiple institutions</li>
          <li>In-depth interviews with coaches and athletic administrators</li>
          <li>Analysis of NIL compensation data</li>
          <li>Review of institutional policies and NCAA guidelines</li>
        </ul>

        <h2>Sample Size</h2>
        <p>
          The study included responses from [X] student-athletes across [Y] universities,
          representing [Z] different sports and regions.
        </p>

        <h2>Analysis Methods</h2>
        <p>
          Statistical analysis was conducted using [methods], while qualitative data
          underwent thematic analysis to identify key patterns and themes.
        </p>
      </section>
    </div>
  );
}
