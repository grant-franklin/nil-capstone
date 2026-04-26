import React, { useState, useEffect } from 'react';
import './Pages.css';

// ═══════════════ THEME ═══════════════
const T = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  accent: "#f4a261", teal: "#2ec4b6", red: "#e63946", blue: "#457b9d",
  purple: "#a855f7", gold: "#d4a017",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
};

// ═══════════════ METHODOLOGY SECTIONS ═══════════════
const SECTIONS = [
  {
    id: 1,
    number: "01",
    title: "Overview",
    teaser: "A mixed-methods design: primarily quantitative comparison across two eras (pre-NIL 2018–2021, post-NIL 2022–2026) and three program tiers.",
    icon: "🧭",
    color: T.accent,
    content: `This project uses a mixed-methods design that is primarily quantitative, supported by qualitative context drawn from academic research, policy documents, and industry reports. The analytical frame is comparative and longitudinal: programs are grouped into three tiers (Power 5/Power 4, Group of 5/High-Major, and FCS/Low-Major) and compared across two eras - pre-NIL (2018-2021) and post-NIL (2022-2026). The research relies entirely on publicly available secondary data; no surveys, interviews, or proprietary datasets were used.`,
  },
  {
    id: 2,
    number: "02",
    title: "Data Collection",
    teaser: "Nine public datasets - EADA, Knight-Newhouse, NCAA NIL Assist, On3, Sports Reference, and more - consolidated into a single pipeline.",
    icon: "📥",
    color: T.teal,
    content: `Nine public datasets were consolidated into a single analytical pipeline. Each was chosen for a specific role in the comparison. Data was downloaded in native formats (Excel, CSV, and in one case scraped from an embedded JavaScript object in the On3 Top 100 HTML page) and processed in Python.`,
    datasets: [
      { name: "Equity in Athletics Disclosure Act (EADA)", desc: "Federally mandated financial reporting for all Title IV institutions. Source of the $115M Power 5 vs. Group of 5 revenue gap finding." },
      { name: "Knight-Newhouse College Athletics Database", desc: "Longitudinal athletics revenue, expense, and debt data for 230+ public Division I schools back to 2005." },
      { name: "NCAA NIL Assist Dashboard", desc: "Aggregated deal-level NIL data by sport, conference, position, and deal type. Source of the average-to-median ratio findings (51.7x in football, 107.5x in basketball)." },
      { name: "On3 NIL Top 100", desc: "Individual athlete NIL valuations. Source of the 85-of-100 Power 4 concentration finding." },
      { name: "On3 Recruiting Rankings", desc: "Team-level recruiting rankings with embedded NIL estimates, 2022–2026." },
      { name: "Sports Reference", desc: "Win-loss records, Simple Rating System (SRS), and point differentials for CFB, men's basketball, and women's basketball, 2018–2025." },
      { name: "247Sports", desc: "Historical recruiting rankings, used to cross-verify On3 data." },
      { name: 'Opendorse "NIL at 3" Report', desc: "Platform-level NIL transaction data from 150,000+ athletes, used as market-level context." },
      { name: "Policy briefs (OC&C, Knight Commission, CRS)", desc: "Qualitative interpretation and regulatory context." },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Sample Size & Scope",
    teaser: "230+ public Division I schools, three revenue sports, 2015–2026. About 12% of records dropped - mostly private schools excluded from EADA.",
    icon: "🎯",
    color: T.blue,
    content: `Financial analysis covered all 230+ public Division I institutions tracked by Knight-Newhouse and the full EADA universe of Title IV schools. Competitive and recruiting analysis covered three revenue sports: FBS football, Division I men's basketball, and Division I women's basketball. Temporal coverage runs from 2015–2023 for financial data, 2018–2025 for competitive performance, and 2022–2026 for recruiting. Approximately 12% of team-year records were dropped due to unresolvable missing data - most often private schools excluded from EADA reporting (Duke, Stanford, USC, Notre Dame, and similar).

Programs were grouped into three tiers following EADA conference classification. Basketball uses a slightly different tier structure than football because the Big East, West Coast Conference, and American have different competitive positions in basketball than they do in football.`,
  },
  {
    id: 4,
    number: "04",
    title: "Analysis Methods",
    teaser: "Three techniques: tier-level aggregation, pre/post-NIL difference testing, and Pearson correlation on team-year records.",
    icon: "🔬",
    color: T.red,
    content: `Three analytical techniques produced the findings presented in the dashboards.

<h3>Tier-level aggregation</h3>
For each year and sport, program-level data was aggregated by tier to produce summary statistics (mean, median, min, max) for revenue, expenses, NIL spending, recruit ratings, win percentage, and SRS. This produced the comparative bar and line charts in the Findings section.

<h3>Pre-NIL / Post-NIL difference testing</h3>
For each metric, the 2018–2021 and 2022–2026 periods were averaged and compared. Differences are reported in percentage points for ratio metrics (win %) and in raw dollars for financial metrics. Formal statistical significance testing was not performed because some tier-year cells have sample sizes too small for reliable p-values. The goal was descriptive comparison, not inferential proof.

<h3>Pearson correlation</h3>
Three correlations are central to the project's findings: NIL spending vs. recruit rating (r ≈ 0.77), recruit score vs. team SRS (r ≈ 0.68), and NIL spending vs. win percentage (r ≈ 0.25). These were computed using pandas' .corr() method on team-year records.`,
  },
  {
    id: 5,
    number: "05",
    title: "Technical Stack",
    teaser: "Python 3.11 for data processing, React + Vite + Recharts for the web app, GitHub Pages for deployment.",
    icon: "⚙️",
    color: T.purple,
    content: ``,
    techStack: [
      { label: "Data processing", value: "Python 3.11 with pandas, NumPy, and openpyxl" },
      { label: "Visualization", value: "Recharts (React charting library)" },
      { label: "Web application", value: "React 18 with Vite, react-router-dom (HashRouter)" },
      { label: "Deployment", value: "GitHub Pages via the gh-pages package" },
      { label: "Version control", value: "Git and GitHub" },
    ],
    techNote: "HashRouter was chosen over BrowserRouter because GitHub Pages does not support server-side route rewrites - a decision made after an initial BrowserRouter attempt produced broken links on deployed builds.",
  },
  {
    id: 6,
    number: "06",
    title: "Scope Choices & Limitations",
    teaser: "Three deliberate restrictions and one critical caveat: this analysis measures correlation and change, not causation.",
    icon: "⚠️",
    color: T.gold,
    content: `Three deliberate scope restrictions shaped what this project does and does not claim. First, non-revenue sports were excluded because NIL activity in them is too sparse for cross-conference comparison. Second, private schools are missing from the financial analysis because EADA and Knight-Newhouse cover only public institutions. Third, EADA financial data currently runs through 2023, which is two full NIL years but only the first year under the House v. NCAA settlement.

The project also measures correlation and temporal change, not causation. When a post-NIL period shows a widened financial gap, this analysis cannot prove NIL caused the widening rather than reflecting trends that NIL accelerated. Language throughout the Findings section is deliberately descriptive.`,
  },
  {
    id: 7,
    number: "07",
    title: "AI Tool Usage & Reflection",
    teaser: "Honest disclosure of what I delegated to AI, what I kept, what worked, what didn't, and what I learned.",
    icon: "🤖",
    color: T.accent,
    content: `I used Anthropic's Claude at multiple stages of this project. Honest disclosure is more useful than a generic acknowledgment, so what follows is a specific account of what I delegated, what I kept, and what I learned.

<h3>What I Used AI For</h3>
The most substantial assistance was in building the React application. I came into this project comfortable with Python and data analysis but had never built a React/Vite app from scratch or deployed to GitHub Pages. Claude acted as a pair programmer for the front-end build - I described what I wanted each page to do, and we iterated on JSX components together. I also used Claude for code generation in the data-cleaning pipeline (particularly team name normalization across datasets), for translating chart concepts into Recharts component code, and for drafting initial versions of several written sections on this site, which I then edited heavily for voice and accuracy.

<h3>What I Did Not Delegate</h3>
The research question, hypothesis, data-source selection, and interpretation of findings are my own. I chose which sources to use, which comparisons to make, and what the results meant. I also kept all of the domain judgment calls - when data was ambiguous, I made the call myself after checking source reporting.

<h3>What Worked</h3>
AI-assisted development let me spend more time on the analytical and interpretive work rather than fighting configuration issues. Claude was also a useful writing partner: I would draft or describe an idea, Claude would propose a cleaner version, and I would edit that for voice and accuracy. The final prose is mine; the velocity at which I produced it was accelerated.

<h3>What Didn't Work</h3>
AI tools made confident errors that required verification. Early in the project, Claude gave me GitHub setup instructions in the wrong order (create remote repo before local init, which is backwards). I caught it because I had enough Git background to notice, but the experience made clear that AI-generated technical instructions need review even when they look authoritative. I also started out trying to embed Python-generated charts into a static HTML site via CDN scripts - an AI-suggested approach that worked in isolation but broke on deployment. Rebuilding as a proper React application was a significantly larger lift but produced a much cleaner result. The lesson: AI tools are good at generating options, not always at recommending the one that will hold up long-term.

<h3>What I Learned</h3>
Working with AI forced me to be more explicit about my intent at every step. When I couldn't cleanly describe what I wanted, the output was bad. When I could, the output was good. That discipline of articulating requirements before writing code is something I'll carry into future projects whether I'm using AI assistance or not. AI tools are excellent for reducing friction on technical implementation and polishing prose - but they are not a substitute for domain knowledge, judgment about what the data means, or the work of deciding what question is worth asking in the first place.`,
  },
];

// ═══════════════ STAT CARD ═══════════════
const Stat = ({ label, value, sub, color = T.accent, small = true }) => (
  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${color}`, borderRadius: 10, padding: small ? "12px 16px" : "16px 20px", flex: "1 1 140px", minWidth: 120 }}>
    <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: small ? 18 : 24, fontWeight: 800, color: T.white, marginTop: 3 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color, marginTop: 2 }}>{sub}</div>}
  </div>
);

// ═══════════════ MODAL COMPONENT ═══════════════
const Modal = ({ section, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const renderContent = () => {
    // Data Collection modal with dataset list
    if (section.id === 2) {
      return (
        <>
          <p style={{ fontSize: 15, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>{section.content}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginBottom: 20 }}>
            {section.datasets.map((ds, i) => (
              <div key={i} style={{ background: T.cardAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 14, color: T.white, fontWeight: 700, margin: '0 0 4px' }}>{ds.name}</p>
                <p style={{ fontSize: 13, color: T.muted, margin: 0, lineHeight: 1.5 }}>{ds.desc}</p>
              </div>
            ))}
          </div>
        </>
      );
    }

    // Technical Stack modal with spec sheet
    if (section.id === 5) {
      return (
        <>
          <div style={{ marginBottom: 20 }}>
            {section.techStack.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 12, marginBottom: 12, borderBottom: i < section.techStack.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ flex: '0 0 140px', fontSize: 13, color: T.muted, fontWeight: 600 }}>{item.label}</div>
                <div style={{ flex: 1, fontSize: 13, color: T.white, fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: T.muted, fontStyle: 'italic', lineHeight: 1.6, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}` }}>{section.techNote}</p>
        </>
      );
    }

    // Standard content with h3 support
    const paragraphs = section.content.split('\n\n').filter(p => p.trim());
    return (
      <>
        {paragraphs.map((para, i) => {
          const trimmedPara = para.trim();
          if (trimmedPara.startsWith('<h3>')) {
            const title = trimmedPara.replace(/<\/?h3>/g, '');
            return <h3 key={i} style={{ fontSize: 17, fontWeight: 700, color: T.white, margin: '20px 0 12px', paddingBottom: 8, borderBottom: `1px solid ${T.border}` }}>{title}</h3>;
          }
          return (
            <p key={i} style={{ fontSize: 15, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>
              {trimmedPara.split(/(<strong>.*?<\/strong>)/g).map((part, j) => {
                if (part.startsWith('<strong>')) {
                  const text = part.replace(/<\/?strong>/g, '');
                  return <strong key={j} style={{ color: T.white }}>{text}</strong>;
                }
                return <span key={j}>{part}</span>;
              })}
            </p>
          );
        })}
      </>
    );
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, borderLeft: `4px solid ${section.color}`,
        maxWidth: 720, maxHeight: '85vh', overflow: 'auto', padding: 40,
        animation: 'fadeScale 0.2s ease-out',
      }}>
        <style>{`@keyframes fadeScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>

        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: 28,
          color: T.muted, cursor: 'pointer', transition: 'color 0.2s',
        }} onMouseEnter={e => e.target.style.color = T.white} onMouseLeave={e => e.target.style.color = T.muted}>
          ×
        </button>

        <p style={{ fontSize: 10, color: T.muted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, margin: '0 0 8px' }}>
          SECTION {section.number}
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: T.white, margin: 0, letterSpacing: -0.5, marginBottom: 24 }}>
          {section.title}
        </h2>

        {renderContent()}
      </div>
    </div>
  );
};

// ═══════════════ CARD COMPONENT ═══════════════
const SectionCard = ({ section, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      style={{
        background: T.card, border: `1px solid ${isHovered ? section.color : T.border}`, borderLeft: `3px solid ${section.color}`,
        borderRadius: 10, padding: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', boxShadow: isHovered ? `0 8px 32px ${section.color}20` : 'none',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{ fontSize: 24 }}>{section.icon}</span>
        <p style={{ fontSize: 9, color: T.muted, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700, margin: 0 }}>
          {section.number} / {section.title.split(' ')[0]}
        </p>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: T.white, margin: '12px 0 8px', lineHeight: 1.3 }}>
        {section.title}
      </h3>
      <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5, margin: '8px 0 12px' }}>
        {section.teaser}
      </p>
      <p style={{ fontSize: 12, color: section.color, fontWeight: 600, margin: 0 }}>
        Read more →
      </p>
    </button>
  );
};

// ═══════════════ MAIN COMPONENT ═══════════════
export default function Methodology() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* HERO HEADER */}
      <div style={{ padding: '60px 24px 40px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 10, color: T.accent, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, margin: '0 0 16px' }}>
          SECTION 3
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: T.white, margin: '0 0 16px', letterSpacing: -1 }}>
          Methodology
        </h1>
        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, maxWidth: 650, margin: 0 }}>
          How the data was collected, processed, and analyzed - plus honest disclosure about scope, limits, and AI tool usage.
        </p>
      </div>

      {/* QUICK STATS */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 40px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Stat label="DATA SOURCES" value="9" color={T.accent} small />
        <Stat label="SPORTS COVERED" value="3" sub="CFB, MBB, WBB" color={T.teal} small />
        <Stat label="YEARS ANALYZED" value="2015–2026" color={T.red} small />
        <Stat label="PROGRAMS TRACKED" value="230+" sub="Public Division I" color={T.blue} small />
      </div>

      {/* CARD GRID */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {SECTIONS.map(section => (
          <SectionCard key={section.id} section={section} onClick={() => setOpenSection(section)} />
        ))}
      </div>

      {/* MODAL */}
      {openSection && <Modal section={openSection} onClose={() => setOpenSection(null)} />}
    </div>
  );
}
