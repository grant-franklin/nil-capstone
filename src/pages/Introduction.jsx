import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const T = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  accent: "#f4a261", teal: "#2ec4b6", red: "#e63946", blue: "#457b9d",
  purple: "#a855f7", gold: "#d4a017", green: "#2ec4b6",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
};

const useResponsive = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { width, isMobile: width < 768, isTablet: width >= 768 && width < 1024, isDesktop: width >= 768 };
};

const Stat = ({ label, value, accent = T.accent, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile } = useResponsive();
  const statPadding = isMobile ? "14px 16px" : "16px 20px";
  const labelSize = isMobile ? 10 : 11;
  const valueSize = isMobile ? 20 : 24;

  return (
    <div style={{ flex: isMobile ? "1 1 100%" : "1 1 140px", minWidth: isMobile ? "100%" : 100, minHeight: '44px' }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${accent}`,
          borderRadius: 10, padding: statPadding, width: '100%', minHeight: isMobile ? '100px' : 'auto',
          cursor: 'pointer', transition: 'all 200ms ease', textAlign: 'left',
        }}
        onMouseEnter={(e) => { if (description) { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = `0 4px 16px ${accent}20`; } }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: labelSize, color: T.muted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, margin: '0 0 8px' }}>{label}</p>
            <p style={{ fontSize: valueSize, fontWeight: 800, color: T.white, margin: '4px 0', wordBreak: 'break-word' }}>{value}</p>
          </div>
          {description && (
            <div style={{ fontSize: 16, color: accent, marginLeft: 12, display: 'flex', alignItems: 'center', transition: 'transform 200ms ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', minWidth: '20px', minHeight: '44px', justifyContent: 'center' }}>↓</div>
          )}
        </div>
      </button>
      {description && (
        <div style={{ maxHeight: isExpanded ? '300px' : '0px', overflow: 'hidden', transition: 'max-height 300ms ease', marginTop: isExpanded ? 12 : 0 }}>
          <div style={{ background: T.cardAlt, border: `1px solid ${T.border}`, borderRadius: 8, padding: isMobile ? '14px 12px' : '12px 16px', fontSize: isMobile ? 12 : 13, color: T.muted, lineHeight: 1.6, fontStyle: 'italic' }}>{description}</div>
        </div>
      )}
    </div>
  );
};

const NavCard = ({ number, title, description, route }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useResponsive();
  const navPadding = isMobile ? "14px 16px" : "18px 20px";
  const titleSize = isMobile ? 13 : 15;
  const arrowSize = isMobile ? 16 : 18;

  return (
    <Link to={route} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: T.card, border: `1px solid ${isHovered ? T.accent + '66' : T.border}`, borderRadius: 10,
          padding: navPadding, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
          transition: 'all 200ms ease', transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          boxShadow: isHovered ? `0 4px 16px ${T.accent}20` : 'none', minHeight: '44px',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 12, color: T.muted, fontFamily: 'monospace', fontWeight: 700, margin: 0 }}>{number}</p>
          <p style={{ fontSize: titleSize, fontWeight: 700, color: T.white, margin: '4px 0 4px', wordBreak: 'break-word' }}>{title}</p>
          <p style={{ fontSize: isMobile ? 11 : 12, color: T.muted, margin: 0 }}>{description}</p>
        </div>
        <div style={{ fontSize: arrowSize, color: T.accent, marginLeft: isMobile ? 12 : 16, transition: 'transform 200ms ease', transform: isHovered ? 'translateX(4px)' : 'translateX(0)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>→</div>
      </div>
    </Link>
  );
};

export default function Introduction() {
  const [expandedAbstract, setExpandedAbstract] = useState(false);
  const { isMobile } = useResponsive();

  const heroPadding = isMobile ? '40px 16px 30px' : '80px 24px 60px';
  const heroFontSize = isMobile ? 28 : 52;
  const h2FontSize = isMobile ? 20 : 28;
  const taglineFontSize = isMobile ? 14 : 17;
  const sectionPaddingX = isMobile ? '16px' : '24px';
  const sectionPaddingY = isMobile ? '30px' : '60px';
  const statGap = isMobile ? 8 : 12;
  const navGridCols = isMobile ? '1' : 'repeat(auto-fit, minmax(280px, 1fr))';
  const ctaPadding = isMobile ? '20px 16px' : '28px 32px';

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: heroPadding, minHeight: isMobile ? 'auto' : '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: 60, height: 1, background: T.accent, marginBottom: 16 }} />
        <p style={{ fontSize: 11, color: T.accent, textTransform: 'uppercase', letterSpacing: 2.5, fontWeight: 700, margin: 0, marginBottom: 20 }}>DCDA Capstone Project · Spring 2026</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: heroFontSize, fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: -1, maxWidth: 800 }}>
          <span style={{ color: T.white }}>The NIL Divide:</span><br /><span style={{ color: T.accent }}>Money, Power & Competitive Balance</span>
        </h1>
        <p style={{ fontSize: taglineFontSize, color: T.muted, lineHeight: 1.5, maxWidth: 650, margin: '0 0 24px' }}>How Name, Image, and Likeness compensation is reshaping NCAA Division I athletics - and what the data actually shows.</p>
        <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>Grant Franklin · Digital Culture & Data Analytics</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: `0 ${sectionPaddingX} ${sectionPaddingY}` }}>
        <div style={{ background: `linear-gradient(135deg, ${T.card}, ${T.cardAlt})`, border: `1px solid ${T.border}`, borderLeft: `4px solid ${T.accent}`, borderRadius: 12, padding: isMobile ? '20px 16px' : '32px 36px' }}>
          <p style={{ fontSize: 10, color: T.accent, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, margin: '0 0 12px' }}>The Research Question</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 16 : 22, fontWeight: 700, color: T.white, fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>How has the introduction of Name, Image, and Likeness compensation affected the financial divide and competitive balance between Power 4 and non-Power 4 NCAA Division I programs?</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: `0 ${sectionPaddingX} ${sectionPaddingY}`, display: 'flex', gap: statGap, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Stat label="Revenue gap (2023)" value="$115M" accent={T.red} description="The average revenue difference between Power 4 and Group of 5 athletic departments in 2023, illustrating the financial chasm that NIL operates on top of." />
        <Stat label="Top NIL athletes at Power 4" value="85 of 100" accent={T.blue} description="Per On3's 2025 NIL 100 rankings, 85 of the top 100 highest-valued athletes play at Power 4 schools - evidence that NIL money concentrates where institutional resources already do." />
        <Stat label="NIL → recruit quality" value="r = 0.77" accent={T.green} description="A strong positive correlation between program NIL spending and incoming recruiting class rankings, suggesting NIL is reshaping where top recruits land." />
        <Stat label="NIL → winning" value="r = 0.25" accent={T.accent} description="A weak correlation between NIL spending and on-field wins, indicating money buys talent acquisition more reliably than it buys results." />
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: `0 ${sectionPaddingX} ${sectionPaddingY}` }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: h2FontSize, fontWeight: 800, color: T.white, margin: '0 0 20px', letterSpacing: -0.5 }}>Abstract</h2>
        <p style={{ fontSize: isMobile ? 13 : 15, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>Since the NCAA's interim NIL policy took effect in July 2021 and the House v. NCAA settlement was approved in June 2025, college athletics has entered a new financial era. Schools can now compensate athletes up to $20.5 million annually through direct revenue sharing, and the third-party NIL market has grown to an estimated $2.3 billion. The dominant public narrative holds that this money is concentrating talent and wins at a handful of wealthy programs, producing a 'super league' that leaves everyone else behind. This project tests that narrative against the data.</p>
        <div style={{ maxHeight: expandedAbstract ? '1000px' : '0px', overflow: 'hidden', transition: 'max-height 400ms ease' }}>
          <p style={{ fontSize: isMobile ? 13 : 15, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>Drawing on nine public datasets spanning financial reporting (EADA, Knight-Newhouse), NIL valuations (On3, NCAA NIL Assist, Opendorse), recruiting rankings (On3, 247Sports), and on-field performance (Sports Reference), this study compares Power 4 and non-Power 4 programs across football, men's basketball, and women's basketball in the pre-NIL (2018–2021) and post-NIL (2022–2026) eras. Python was used for data cleaning and analysis; React and Recharts power the interactive visualizations.</p>
          <p style={{ fontSize: isMobile ? 13 : 15, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>The findings support a <span style={{ fontStyle: 'italic' }}>more</span> nuanced conclusion than the headlines suggest. The financial gap between Power 5 and Group of 5 athletic departments grew 44% between 2019 and 2023 (from $80M to $115M). Eighty-five of the top 100 NIL-valued athletes attend Power 4 schools, and the correlation between NIL spending and recruit quality has strengthened from r = 0.50 (2023) to r = 0.77 (2025). Yet the competitive effect is sport-dependent: football's win-percentage gap widened post-NIL, while men's basketball actually became more competitive, with High-Major programs gaining ground. The correlation between NIL spending and winning remains weak (r ≈ 0.25), indicating that money reliably buys talent but does not yet reliably buy wins. The financial arms race is real — but the competitive monopoly many feared has not yet arrived.</p>
        </div>
        <button onClick={() => setExpandedAbstract(!expandedAbstract)} style={{ background: 'none', border: 'none', color: T.accent, fontSize: isMobile ? 12 : 13, fontWeight: 700, cursor: 'pointer', padding: '8px 0', transition: 'transform 300ms ease', transform: expandedAbstract ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-flex', alignItems: 'center', gap: 4, minHeight: '44px' }}>
          Read {expandedAbstract ? 'less' : 'full abstract'} ↓
        </button>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: `0 ${sectionPaddingX} ${sectionPaddingY}` }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: h2FontSize, fontWeight: 800, color: T.white, margin: '0 0 8px', letterSpacing: -0.5 }}>Where to Go Next</h2>
        <p style={{ fontSize: isMobile ? 13 : 14, color: T.muted, margin: '0 0 20px' }}>Each section tackles a different piece of the question. Start here and follow in order, or jump to what interests you most.</p>
        <div style={{ display: 'grid', gridTemplateColumns: navGridCols, gap: statGap }}>
          <NavCard number="01" title="Literature Review" description="The academic and industry research shaping this inquiry" route="/literature" />
          <NavCard number="02" title="Methodology" description="Data sources, analytical framework, and AI tool reflection" route="/methodology" />
          <NavCard number="03" title="Findings" description="Interactive dashboards across five research questions" route="/findings" />
          <NavCard number="04" title="Conclusion" description="What the data reveals and what it leaves open" route="/conclusion" />
          <NavCard number="05" title="Works Cited" description="Full bibliography in MLA format" route="/works-cited" />
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: `0 ${sectionPaddingX} ${sectionPaddingY}` }}>
        <div style={{ background: `linear-gradient(135deg, ${T.accent}14, transparent)`, border: `1px solid ${T.accent}4d`, borderRadius: 12, padding: ctaPadding, display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 16 : 24, flexWrap: isMobile ? 'wrap' : 'nowrap', flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 16 : 22, fontWeight: 700, color: T.white, margin: '0 0 8px', letterSpacing: -0.5 }}>Ready to see the data?</p>
            <p style={{ fontSize: isMobile ? 12 : 14, color: T.muted, margin: 0 }}>The Findings section is where the project lives - five interactive dashboards with all the analysis.</p>
          </div>
          <Link to="/findings" style={{ textDecoration: 'none', display: 'block' }}>
            <button style={{ background: T.accent, color: T.bg, padding: '12px 20px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: isMobile ? 13 : 14, cursor: 'pointer', transition: 'opacity 200ms ease', whiteSpace: 'nowrap', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.target.style.opacity = '0.9'} onMouseLeave={e => e.target.style.opacity = '1'}>
              Jump to Findings →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
