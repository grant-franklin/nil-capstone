import React, { useState, useEffect } from 'react';
import './Pages.css';

// ═══════════════ THEME ═══════════════
const T = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  accent: "#f4a261", teal: "#2ec4b6", red: "#e63946", blue: "#457b9d",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
};

// ═══════════════ LITERATURE SECTIONS ═══════════════
const SECTIONS = [
  {
    id: 1,
    number: "01",
    title: "Overview",
    teaser: "The literature agrees the NIL marketplace is deeply unequal — but scholars sharply disagree about whether financial inequality is actually translating into competitive inequality on the field.",
    icon: "📚",
    color: T.accent,
    content: `The literature on Name, Image, and Likeness (NIL) rights in collegiate athletics has expanded rapidly since the NCAA's interim NIL policy took effect in July 2021. The sources relevant to this project fall into four categories: peer-reviewed economic studies on the competitive effects of athlete compensation, industry reports documenting the NIL marketplace, policy and legal analyses of the House v. NCAA settlement, and public datasets enabling cross-program analysis. Read together, the literature agrees the NIL marketplace is deeply unequal — but scholars sharply disagree about whether that financial inequality is actually translating into competitive inequality on the field. That disagreement is the central tension this project investigates.`,
  },
  {
    id: 2,
    number: "02",
    title: "Historical Development of NIL Regulations",
    teaser: "From a century of NCAA amateurism to the 2021 interim policy and the June 2025 House v. NCAA settlement.",
    icon: "⚖️",
    color: T.red,
    content: `For nearly a century, the NCAA's amateurism model prohibited athletes from receiving compensation beyond scholarships. Li and Derdenger (2025) frame this as an economic cartel — a coordinated restriction that protected dominant programs from having to compete on price. Its legal dismantling accelerated in the late 2010s: by 2020 multiple states had passed NIL laws scheduled to take effect ahead of any NCAA action, and in June 2021 the Supreme Court's unanimous NCAA v. Alston ruling pushed the NCAA to adopt its interim NIL policy on July 1, 2021.

The House v. NCAA settlement (June 2025) marks the most significant change since. Per the Knight Commission's 2025 brief, schools may now share revenue with athletes up to roughly $20.5 million per year, calculated as 22% of average Power Five athletic revenue. The Congressional Research Service adds that participation is optional and that seven groups of athletes have filed appeals. The College Sports Commission's NIL Go clearinghouse is now reviewing and rejecting deals — with reports suggesting as much as 70% of past collective payments would not have been approved.`,
  },
  {
    id: 3,
    number: "03",
    title: "Impact on Student-Athlete Compensation",
    teaser: "A $2.3B marketplace where 68% of deals are under $1,000 and 85 of the top 100 athletes attend Power 4 schools.",
    icon: "💰",
    color: T.teal,
    content: `Industry reports show how money moves through NIL and how unevenly it is distributed. OC&C's 2025 "Scoring Big" estimates the total NIL economy at $2.3 billion, with 50% of deal value in Power 4 conferences and football driving 70% of spend. Most striking: 68% of NIL deals are worth under $1,000. Opendorse's "NIL at 3" report corroborates this with transaction-level data from 150,000+ athletes, reporting 40%+ year-over-year growth.

The NCAA's NIL Assist Dashboard, launched in August 2024, reveals extreme intra-program inequality: in post-settlement men's basketball, the average deal ($8,708) is 107.5 times the median ($81). On3's NIL Top 100 sharpens the top-end picture — 85 of 100 top-valued athletes attend Power 4 schools, and quarterbacks alone represent 31% of the list. Kasimov's SportsEpreneur piece on March Madness 2026 adds case-level examples, including BYU's AJ Dybantsa choosing BYU over traditional powers for a reported $7M NIL package. Together, these sources establish that NIL has produced a superstar economy, not broad-based athlete pay.`,
  },
  {
    id: 4,
    number: "04",
    title: "Institutional & NCAA Perspectives",
    teaser: "The core scholarly disagreement: Li & Derdenger say NIL increased competition. Pitts & Evans say it didn't redistribute talent.",
    icon: "🏛️",
    color: T.blue,
    content: `The most important disagreement in the field is here. Li and Derdenger (2025, Management Science) find that lower-ranked programs attracted higher-quality talent post-NIL and that sportsbook point spreads have tightened — suggesting competition has increased. Pitts and Evans (2025, Journal of Sports Economics) find that while NIL valuations predict recruiting success, the spending needed to meaningfully shift talent distribution is prohibitive for most programs. Both studies can be correct: NIL may increase competition at the margins while remaining insufficient to redistribute talent fundamentally. This project tests where on that spectrum the evidence actually sits.

On the institutional financial side, the Knight-Newhouse College Athletics Database and the federally-mandated EADA dataset together establish that the financial gap between Power 5 and non-Power 5 programs predates NIL by more than a decade — NIL has accelerated the gap, not created it. HVS's 2025 report documents how athletic departments are shifting capital priorities toward revenue-generating facility features. Lang's Medium analysis projects Power 4 schools maxing out the $20.5M cap while non-Power 4 schools spend far less, and Sportico's finance database helps distinguish self-sustaining programs from those reliant on subsidies.`,
  },
  {
    id: 5,
    number: "05",
    title: "Comparative Analysis of State-Level Legislation",
    teaser: "A patchwork of inconsistent disclosure laws that makes systematic NIL research genuinely difficult.",
    icon: "📋",
    color: "#a855f7",
    content: `When the NCAA left NIL implementation to states in 2021, the result was a patchwork of inconsistent disclosure laws. Sanjay Reddy's 2024 article in the Georgetown Law Technology Review documents how state-level approaches vary on nearly every dimension that matters for research: whether deals must be reported, what information is disclosed, whether disclosure is public, and whether collectives face the same rules as direct endorsements. Reddy proposes de-identified public databases — essentially the model the NCAA later adopted with NIL Assist — but notes that voluntary aggregation cannot substitute for federal uniformity. Multiple federal proposals discussed in the CRS report would impose consistent disclosure requirements, but none have passed. For this project, the patchwork is a real methodological limitation: On3's NIL valuations are assembled from a mix of mandatory disclosures, voluntary reports, and algorithmic estimation, with proportions varying by state.`,
  },
  {
    id: 6,
    number: "06",
    title: "Notable Findings",
    teaser: "Five well-established findings across the literature — from market size to the contested question of competitive balance.",
    icon: "🔍",
    color: "#d4a017",
    content: `Synthesizing across themes, five findings from the existing literature are well-established and directly relevant to this project's research question.

First, <strong>the NIL marketplace is enormous and still growing</strong>. Multiple independent sources converge on ~$2.3 billion annually with ~9% projected growth through 2029.

Second, <strong>the market is deeply unequal at every level</strong>. Across conferences (50% of value in Power 4), sports (70% in football), programs (85% of top 100 athletes at Power 4 schools), and athletes within programs (median deal values 50–100x below averages), concentration is the dominant feature.

Third, <strong>NIL spending predicts recruiting outcomes</strong>. Pitts and Evans establish this empirically; On3's rankings show the same pattern visually.

Fourth, <strong>the effect on competitive balance is contested</strong>. Li and Derdenger argue NIL has increased competition; Pitts and Evans argue it is insufficient to redistribute talent. The existing literature has not adjudicated this, and the disagreement is sport-specific in ways neither study explores.

Fifth, <strong>institutional financial pressures extend beyond athlete compensation</strong>. Knight-Newhouse documents escalating total spending; HVS documents shifting facility priorities; the Knight Commission documents a $100M median revenue gap between Power 4 and non-Power 4 schools. NIL is being layered onto an already widening disparity.`,
  },
  {
    id: 7,
    number: "07",
    title: "Gaps This Project Addresses",
    teaser: "Where existing studies stop and this project begins: cross-sport data, on-field outcomes, five post-NIL cycles.",
    icon: "🎯",
    color: T.accent,
    content: `Existing studies focus almost exclusively on football and on recruiting outcomes rather than on-field results, typically using only one or two post-NIL cycles, and present findings in static academic format. This project tests the Li & Derdenger / Pitts & Evans disagreement using <strong>cross-sport data</strong> (football, men's basketball, women's basketball), extends analysis from recruiting to <strong>winning</strong>, uses <strong>five post-NIL years of data</strong> (2022–2026), and presents findings through <strong>interactive web dashboards</strong> — making the analysis accessible to athletic administrators, journalists, and fans who need the information but lack the background to engage with academic papers directly.`,
  },
];

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

  const paragraphs = section.content.split('\n\n').filter(p => p.trim());

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
        <style>{`
          @keyframes fadeScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

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

        {paragraphs.map((para, i) => (
          <p key={i} style={{ fontSize: 15, color: T.text, lineHeight: 1.75, marginBottom: 16, margin: 0 }}>
            {/* Parse inline HTML (strong tags) */}
            {para.split(/(<strong>.*?<\/strong>)/g).map((part, j) => {
              if (part.startsWith('<strong>')) {
                const text = part.replace(/<\/?strong>/g, '');
                return <strong key={j} style={{ color: T.white }}>{text}</strong>;
              }
              return <span key={j}>{part}</span>;
            })}
          </p>
        ))}
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
export default function Literature() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* HERO HEADER */}
      <div style={{ padding: '60px 24px 40px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 10, color: T.accent, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, margin: '0 0 16px' }}>
          SECTION 2
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: T.white, margin: '0 0 16px', letterSpacing: -1 }}>
          Literature Review
        </h1>
        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, maxWidth: 650, margin: 0 }}>
          How scholars, industry analysts, and policymakers have framed the NIL era — and the central disagreement this project investigates.
        </p>
      </div>

      {/* CARD GRID */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {SECTIONS.map(section => (
          <SectionCard key={section.id} section={section} onClick={() => setOpenSection(section)} />
        ))}
      </div>

      {/* MODAL */}
      {openSection && <Modal section={openSection} onClose={() => setOpenSection(null)} />}
    </div>
  );
}
