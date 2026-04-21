import React, { useState } from 'react';
import './Pages.css';

// ═══════════════ THEME ═══════════════
const T = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  accent: "#f4a261", teal: "#2ec4b6", red: "#e63946", blue: "#457b9d",
  purple: "#a855f7", gold: "#d4a017",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
};

// ═══════════════ CITATIONS DATA ═══════════════
const CITATIONS = [
  // ACADEMIC RESEARCH
  {
    category: "academic",
    type: "Peer-Reviewed Study",
    citation: <>Li, Ivan, and Tim Derdenger. "Does Personalized Pricing Increase Competition? Evidence from NIL in College Football." <em>Management Science</em>, 2025.</>,
    annotation: "Central interpretive framework for this project. Argues NIL improved competitive balance by breaking up the NCAA's pricing cartel — the thesis this project tests against the data.",
    url: "https://doi.org/10.1287/mnsc.2024.06423",
  },
  {
    category: "academic",
    type: "Peer-Reviewed Study",
    citation: <>Pitts, Joshua D., and Brent A. Evans. "Show Me the Money! The Immediate Impact of Name, Image, and Likeness on College Football Recruiting." <em>Journal of Sports Economics</em>, vol. 26, no. 3, 2025, pp. 316–335.</>,
    annotation: "Counterpoint to Li & Derdenger. Argues NIL influences recruiting but not enough to meaningfully shift talent distribution. Frames the limits of NIL as a competitive equalizer.",
    url: "https://journals.sagepub.com/doi/abs/10.1177/15270025241301021",
  },

  // INDUSTRY REPORTS
  {
    category: "industry",
    type: "Industry Report",
    citation: <>"NIL at 3: The Annual Opendorse Report." <em>Opendorse</em>, 25 Nov. 2025.</>,
    annotation: "Platform-level NIL data from 150,000+ athletes and $250M in real transactions. Supplements the NCAA dashboard with granular deal-by-deal breakdowns.",
    url: "https://biz.opendorse.com/blog/nil-3-opendorse-report/",
  },
  {
    category: "industry",
    type: "Strategy Report",
    citation: <>"Scoring Big: Unlocking the NIL Opportunity in College Sports." <em>OC&C Strategy Consultants</em>, 13 Oct. 2025.</>,
    annotation: "Source of the $2.3B market-size estimate and the finding that 50% of NIL value sits in Power 4 conferences. Frames the macro-level distribution of NIL dollars.",
    url: "https://www.occstrategy.com/en/article/scoring-big-unlocking-the-nil-opportunity-in-college-sports/",
  },
  {
    category: "industry",
    type: "Analysis Article",
    citation: <>Lang, Jack. "NIL and Transfer Portals Impact on College Athletics." <em>Medium</em>, 9 Dec. 2024.</>,
    annotation: "Detailed breakdown of estimated NIL and revenue-sharing spending by conference for 2025–26. Used to build comparative financial visualizations.",
    url: "https://medium.com/@lang1356/nil-and-transfer-portals-impact-on-college-athletics-259bff539c25",
  },
  {
    category: "industry",
    type: "Industry Analysis",
    citation: <>"How the NIL Era Is Reshaping Stadium Development." <em>HVS</em>, 2025.</>,
    annotation: "Documents how NIL spending pressure is reshaping athletic facility investment priorities. Adds context on the secondary financial trade-offs of the NIL era.",
    url: "https://www.hvs.com/article/10315-how-the-nil-era-is-reshaping-stadium-development",
  },

  // POLICY & LEGAL
  {
    category: "policy",
    type: "Policy Brief",
    citation: <>"Brief on House v. NCAA Settlement." <em>Knight Commission on Intercollegiate Athletics</em>, 12 Feb. 2025.</>,
    annotation: "Most accessible summary of the settlement's structure. Explains the 22%-of-Power-5-revenue formula behind the $20.5M cap and documents the $100M median revenue gap between Power 4 and non-Power 4 schools.",
    url: "https://www.knightcommission.org/wp-content/uploads/KnightCommissionBrief_HousevNCAA_182025.pdf",
  },
  {
    category: "policy",
    type: "Legal Analysis",
    citation: <>"College Athlete Compensation: Impacts of the House Settlement." <em>Congressional Research Service</em>, Library of Congress, 2025.</>,
    annotation: "Nonpartisan overview of the settlement's legal structure, the College Sports Commission's role, and the seven pending athlete appeals. Establishes policy context for the project.",
    url: "https://www.congress.gov/crs-product/LSB11349",
  },
  {
    category: "policy",
    type: "Law Review Article",
    citation: <>Reddy, Sanjay. "NIL and Data Transparency: Implications for Student-Athletes." <em>Georgetown Law Technology Review</em>, 20 May 2024.</>,
    annotation: "Examines the patchwork of state-level NIL disclosure laws and proposes federal standards. Used to address the methodological limitations of NIL data availability.",
    url: "https://georgetownlawtechreview.org/nil-and-data-transparency-implications-for-student-athletes/GLTR-05-2024/",
  },
  {
    category: "policy",
    type: "Journalistic Analysis",
    citation: <>Kasimov, Eric. "How NIL Is Reshaping March Madness 2026." <em>SportsEpreneur</em>, 6 Mar. 2026.</>,
    annotation: "Current case-level examples including BYU's AJ Dybantsa ($7M NIL package) and LSU's Flau'jae Johnson ($4.5M). Provides vivid examples that bring the data to life.",
    url: "https://sportsepreneur.com/nil-march-madness-2026/",
  },

  // PUBLIC DATASETS
  {
    category: "datasets",
    type: "Federal Dataset",
    citation: <>"Equity in Athletics Disclosure Act." <em>U.S. Department of Education, Office of Postsecondary Education</em>, 2025.</>,
    annotation: "Federally mandated financial reporting for all Title IV institutions. Source of the $115M Power 5 vs. Group of 5 revenue gap finding and the financial baseline for the entire project.",
    url: "https://ope.ed.gov/athletics/",
  },
  {
    category: "datasets",
    type: "Research Database",
    citation: <><em>Knight-Newhouse College Athletics Database</em>. Knight Commission on Intercollegiate Athletics and Syracuse University Newhouse School of Public Communications, 2025.</>,
    annotation: "Longitudinal athletics revenue, expense, and debt data for 230+ public Division I schools back to 2005. Used to trace the financial gap's evolution across pre- and post-NIL eras.",
    url: "https://knightnewhousedata.org/",
  },
  {
    category: "datasets",
    type: "Official NCAA Data",
    citation: <>"Data Dashboard." <em>NCAA NIL Assist</em>, NCAA, 2024.</>,
    annotation: "Aggregated, de-identified NIL deal data reported by Division I institutions. Source of the average-to-median ratio findings (51.7x in football, 107.5x in basketball).",
    url: "https://nilassist.ncaa.org/data-dashboard/",
  },
  {
    category: "datasets",
    type: "Valuation Database",
    citation: <>"About On3 NIL Valuation and Roster Value." <em>On3</em>, 8 Dec. 2024.</>,
    annotation: "Individual athlete NIL valuations and team-level roster value rankings. Source of the 85-of-100 Power 4 concentration finding and the NIL-per-recruit analysis.",
    url: "https://www.on3.com/nil/news/about-on3-nil-valuation-per-post-value/",
  },
];

// ═══════════════ STAT CARD ═══════════════
const Stat = ({ label, value, sub, color = T.accent }) => (
  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${color}`, borderRadius: 10, padding: "12px 16px", flex: "1 1 140px", minWidth: 100 }}>
    <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 800, color: T.white, marginTop: 4 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color, marginTop: 2 }}>{sub}</div>}
  </div>
);

// ═══════════════ CATEGORY PILL ═══════════════
const CategoryPill = ({ label, color, categoryId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: T.card,
        border: `1px solid ${isHovered ? color : T.border}`,
        borderRadius: 999,
        padding: "8px 16px",
        fontSize: 12,
        fontWeight: 700,
        color: isHovered ? color : T.muted,
        cursor: 'pointer',
        transition: 'all 200ms ease',
      }}
    >
      {label}
    </button>
  );
};

// ═══════════════ CITATION CARD ═══════════════
const CitationCard = ({ citation, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderLeft: `3px solid ${isHovered ? color : T.border}`,
        borderRadius: 10,
        padding: "20px 24px",
        transition: 'all 200ms ease',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <p style={{ fontSize: 10, color, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, margin: '0 0 12px' }}>
        {citation.type}
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: T.text, margin: '0 0 8px' }}>
        {citation.citation}
      </p>
      <p style={{ fontSize: 13, fontStyle: 'italic', color: T.muted, lineHeight: 1.6, margin: '8px 0 10px' }}>
        {citation.annotation}
      </p>
      <a
        href={citation.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 12,
          fontWeight: 700,
          color,
          textDecoration: isHovered ? 'underline' : 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          transition: 'all 200ms ease',
        }}
      >
        View source
        <span style={{ transition: 'transform 200ms ease', transform: isHovered ? 'translateX(2px)' : 'translateX(0)' }}>
          →
        </span>
      </a>
    </div>
  );
};

// ═══════════════ CATEGORY SECTION ═══════════════
const CategorySection = ({ categoryId, title, icon, color, description, citations }) => {
  const citationCount = citations.length;

  return (
    <div id={categoryId} style={{ marginBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: T.white, margin: 0, letterSpacing: -0.5 }}>
          {title}
          <span style={{ color: T.muted, fontSize: 18, fontWeight: 400, marginLeft: 8 }}>({citationCount})</span>
        </h2>
      </div>

      <div style={{ width: 60, height: 2, background: color, marginBottom: 16 }} />

      <p style={{ fontSize: 14, fontStyle: 'italic', color: T.muted, margin: '0 0 24px' }}>
        {description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {citations.map((citation, idx) => (
          <CitationCard key={idx} citation={citation} color={color} />
        ))}
      </div>
    </div>
  );
};

// ═══════════════ MAIN COMPONENT ═══════════════
export default function WorksCited() {
  const academic = CITATIONS.filter(c => c.category === 'academic');
  const industry = CITATIONS.filter(c => c.category === 'industry');
  const policy = CITATIONS.filter(c => c.category === 'policy');
  const datasets = CITATIONS.filter(c => c.category === 'datasets');

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* HERO HEADER */}
      <div style={{ padding: '60px 24px 40px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 11, color: T.accent, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, margin: '0 0 16px' }}>
          SECTION 5 · WORKS CITED
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: T.white, margin: '0 0 16px', letterSpacing: -1 }}>
          Works Cited
        </h1>
        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, maxWidth: 650, margin: 0 }}>
          Fourteen sources spanning peer-reviewed research, industry reports, policy analysis, and public datasets. All citations in MLA 9th edition format.
        </p>
      </div>

      {/* STATS STRIP */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 40px', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Stat label="Total Sources" value="14" color={T.accent} />
        <Stat label="Academic" value="2" sub="peer-reviewed" color={T.teal} />
        <Stat label="Industry" value="4" sub="reports & analysis" color={T.blue} />
        <Stat label="Policy & Data" value="8" sub="public datasets" color={T.red} />
      </div>

      {/* CATEGORY NAVIGATION PILLS */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 40px', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        <CategoryPill label="Academic Research" color={T.teal} categoryId="academic" />
        <CategoryPill label="Industry Reports" color={T.blue} categoryId="industry" />
        <CategoryPill label="Policy & Legal" color={T.red} categoryId="policy" />
        <CategoryPill label="Public Datasets" color={T.purple} categoryId="datasets" />
      </div>

      {/* CATEGORY SECTIONS */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px' }}>
        <CategorySection
          categoryId="academic"
          title="Academic Research"
          icon="🎓"
          color={T.teal}
          description="Peer-reviewed economic studies examining NIL's effects on recruiting and competitive balance."
          citations={academic}
        />

        <CategorySection
          categoryId="industry"
          title="Industry Reports"
          icon="📊"
          color={T.blue}
          description="Market-level analysis and transaction data from organizations tracking the NIL economy."
          citations={industry}
        />

        <CategorySection
          categoryId="policy"
          title="Policy & Legal"
          icon="⚖️"
          color={T.red}
          description="Policy briefs, legal analysis, and legislative context shaping the post-House settlement environment."
          citations={policy}
        />

        <CategorySection
          categoryId="datasets"
          title="Public Datasets"
          icon="📂"
          color={T.purple}
          description="The primary quantitative sources — financial, NIL, and performance data — that power this project's analysis."
          citations={datasets}
        />
      </div>
    </div>
  );
}
