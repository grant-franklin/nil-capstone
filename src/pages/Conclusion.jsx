import React from 'react';
import DashboardPart4 from '../components/DashboardPart4';
import './Pages.css';

export default function Conclusion() {
  return (
    <div className="page-container">
      <h1>Conclusion</h1>
      <section className="page-content">
        <p>
          This section synthesizes our findings and presents conclusions
          regarding the impact of NIL policies on collegiate athletics.
        </p>
      </section>

      <DashboardPart4 />

      <section className="page-content">
        <h2>Key Takeaways</h2>
        <ul>
          <li>NIL policies have created new opportunities for student-athlete compensation</li>
          <li>Implementation has revealed both benefits and challenges</li>
          <li>Further regulation and standardization may be needed</li>
          <li>Continued monitoring of outcomes is essential</li>
        </ul>

        <h2>Recommendations for Future Research</h2>
        <p>
          Future studies should continue to track the long-term effects of NIL policies
          and explore emerging trends in athlete compensation and brand partnerships.
        </p>
      </section>
    </div>
  );
}
