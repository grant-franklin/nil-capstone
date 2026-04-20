import React from 'react';
import './Pages.css';

export default function Literature() {
  return (
    <div className="page-container">
      <h1>Literature Review</h1>
      <section className="page-content">
        <h2>Overview</h2>
        <p>
          This section provides a comprehensive review of existing literature on Name, Image,
          and Likeness (NIL) rights in collegiate athletics.
        </p>
        
        <h2>Key Themes</h2>
        <ul>
          <li>Historical development of NIL regulations</li>
          <li>Impact on student-athlete compensation</li>
          <li>Institutional and NCAA perspectives</li>
          <li>Comparative analysis of state-level legislation</li>
        </ul>

        <h2>Notable Findings</h2>
        <p>
          Previous research has shown that NIL policies have significantly altered the landscape
          of collegiate athletics, creating both opportunities and challenges for stakeholders.
        </p>
      </section>
    </div>
  );
}
