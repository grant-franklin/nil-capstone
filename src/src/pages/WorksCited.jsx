import React from 'react';
import { theme } from '../styles/theme';

const CitationEntry = ({ children }) => (
  <div
    style={{
      paddingLeft: 40,
      textIndent: -40,
      marginBottom: 16,
      fontSize: 14,
      color: theme.text,
      lineHeight: 1.7,
    }}
  >
    {children}
  </div>
);

const CitationLink = ({ href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#457b9d',
      textDecoration: 'none',
      wordBreak: 'break-word',
    }}
    onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
    onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
  >
    {text}
  </a>
);

const CategorySection = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2
      style={{
        fontSize: 12,
        fontWeight: 800,
        color: theme.accent,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 20,
        paddingBottom: 12,
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      {title}
    </h2>
    <div>{children}</div>
  </div>
);

export default function WorksCited() {
  return (
    <div
      style={{
        background: theme.bg,
        color: theme.text,
        padding: '40px 20px',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: theme.white,
              margin: '0 0 12px',
            }}
          >
            Works Cited
          </h1>
          <p
            style={{
              fontSize: 15,
              color: theme.muted,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Academic sources, policy briefs, data repositories, and industry reports referenced in this capstone project. Citations formatted in MLA style.
          </p>
        </div>

        {/* Academic Sources */}
        <CategorySection title="Academic Sources">
          <CitationEntry>
            Li, Ivan, and Tim Derdenger. "Does Personalized Pricing Increase
            Competition? Evidence from NIL in College Football."{' '}
            <em>Management Science</em>, 2025.{' '}
            <CitationLink
              href="https://doi.org/10.1287/mnsc.2024.06423"
              text="https://doi.org/10.1287/mnsc.2024.06423"
            />
          </CitationEntry>

          <CitationEntry>
            Pitts, Joshua D., and Brent A. Evans. "Show Me the Money! The
            Immediate Impact of Name, Image, and Likeness on College Football
            Recruiting." <em>Journal of Sports Economics</em>, vol. 26, no. 3,
            2025, pp. 316-335.{' '}
            <CitationLink
              href="https://journals.sagepub.com/doi/abs/10.1177/15270025241301021"
              text="https://journals.sagepub.com/doi/abs/10.1177/15270025241301021"
            />
          </CitationEntry>

          <CitationEntry>
            Reddy, Sanjay. "NIL and Data Transparency: Implications for
            Student-Athletes." <em>Georgetown Law Technology Review</em>, 20
            May 2024.{' '}
            <CitationLink
              href="https://georgetownlawtechreview.org/nil-and-data-transparency-implications-for-student-athletes/GLTR-05-2024/"
              text="https://georgetownlawtechreview.org/nil-and-data-transparency-implications-for-student-athletes/GLTR-05-2024/"
            />
          </CitationEntry>
        </CategorySection>

        {/* Policy & Legal */}
        <CategorySection title="Policy & Legal">
          <CitationEntry>
            "College Athlete Compensation: Impacts of the House Settlement."
            <em>Congressional Research Service</em>, 2025.{' '}
            <CitationLink
              href="https://www.congress.gov/crs-product/LSB11349"
              text="https://www.congress.gov/crs-product/LSB11349"
            />
          </CitationEntry>

          <CitationEntry>
            Knight Commission on Intercollegiate Athletics.{' '}
            <em>House v. NCAA Settlement Brief</em>. 2025.{' '}
            <CitationLink
              href="https://www.knightcommission.org/wp-content/uploads/KnightCommissionBrief_HousevNCAA_182025.pdf"
              text="https://www.knightcommission.org/wp-content/uploads/KnightCommissionBrief_HousevNCAA_182025.pdf"
            />
          </CitationEntry>
        </CategorySection>

        {/* Data Sources */}
        <CategorySection title="Data Sources">
          <CitationEntry>
            "Data Dashboard." <em>NCAA NIL Assist</em>, 14 Aug. 2024.{' '}
            <CitationLink
              href="https://nilassist.ncaa.org/data-dashboard/"
              text="https://nilassist.ncaa.org/data-dashboard/"
            />
          </CitationEntry>

          <CitationEntry>
            "Equity in Athletics Disclosure Act." <em>U.S. Department of Education</em>.{' '}
            <CitationLink
              href="https://ope.ed.gov/athletics/"
              text="https://ope.ed.gov/athletics/"
            />
          </CitationEntry>

          <CitationEntry>
            <em>Knight-Newhouse College Athletics Database</em>. Knight
            Commission and Syracuse University, 2025.{' '}
            <CitationLink
              href="https://knightnewhousedata.org/"
              text="https://knightnewhousedata.org/"
            />
          </CitationEntry>

          <CitationEntry>
            <em>On3 NIL</em>. On3, 2025.{' '}
            <CitationLink
              href="https://www.on3.com/nil/"
              text="https://www.on3.com/nil/"
            />
          </CitationEntry>

          <CitationEntry>
            "College Sports Finances Database." <em>Sportico</em>, 18 Feb.
            2025.{' '}
            <CitationLink
              href="https://www.sportico.com/leagues/college-sports/2023/college-sports-finances-database-intercollegiate-1234646029/"
              text="https://www.sportico.com/leagues/college-sports/2023/college-sports-finances-database-intercollegiate-1234646029/"
            />
          </CitationEntry>
        </CategorySection>

        {/* Industry Reports */}
        <CategorySection title="Industry Reports">
          <CitationEntry>
            Lang, Jack. "NIL and Transfer Portals Impact on College
            Athletics." <em>Medium</em>, 9 Dec. 2024.
          </CitationEntry>

          <CitationEntry>
            "NIL at 3: The Annual Opendorse Report." <em>Opendorse</em>, 25
            Nov. 2025.{' '}
            <CitationLink
              href="https://biz.opendorse.com/blog/nil-3-opendorse-report/"
              text="https://biz.opendorse.com/blog/nil-3-opendorse-report/"
            />
          </CitationEntry>

          <CitationEntry>
            "Scoring Big: Unlocking the NIL Opportunity in College Sports."
            <em>OC&C Strategy Consultants</em>, 4 Sept. 2025.{' '}
            <CitationLink
              href="https://www.occstrategy.com/en/article/scoring-big-unlocking-the-nil-opportunity-in-college-sports/"
              text="https://www.occstrategy.com/en/article/scoring-big-unlocking-the-nil-opportunity-in-college-sports/"
            />
          </CitationEntry>

          <CitationEntry>
            Kasimov, Eric. "How NIL Is Reshaping March Madness 2026."
            <em>SportsEpreneur</em>, 2 Mar. 2026.{' '}
            <CitationLink
              href="https://sportsepreneur.com/nil-march-madness-2026/"
              text="https://sportsepreneur.com/nil-march-madness-2026/"
            />
          </CitationEntry>

          <CitationEntry>
            "How the NIL Era Is Reshaping Stadium Development." <em>HVS</em>,
            2025.{' '}
            <CitationLink
              href="https://www.hvs.com/article/10315-how-the-nil-era-is-reshaping-stadium-development"
              text="https://www.hvs.com/article/10315-how-the-nil-era-is-reshaping-stadium-development"
            />
          </CitationEntry>
        </CategorySection>
      </div>
    </div>
  );
}
