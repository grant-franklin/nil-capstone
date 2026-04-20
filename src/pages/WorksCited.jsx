import React from 'react';
import './Pages.css';

export default function WorksCited() {
  return (
    <div className="page-container">
      <h1>Works Cited</h1>
      <section className="page-content">
        <h2>References</h2>
        <div className="citations">
          <div className="citation-item">
            <p>
              [1] Author Name, "Article Title", <em>Journal Name</em>, Year, pp. XX-XX.
            </p>
          </div>
          <div className="citation-item">
            <p>
              [2] Author Name, "Book Title", Publisher, Year.
            </p>
          </div>
          <div className="citation-item">
            <p>
              [3] Author Name, "Web Source Title", Website Name, Year.
            </p>
          </div>
          <div className="citation-item">
            <p>
              [4] Author Name, "Article Title", <em>Journal Name</em>, Year, pp. XX-XX.
            </p>
          </div>
          <div className="citation-item">
            <p>
              [5] Author Name, "Study Title", Institution, Year.
            </p>
          </div>
        </div>
        
        <p className="note">
          <em>Note: Replace placeholder citations with your actual research sources.</em>
        </p>
      </section>
    </div>
  );
}
