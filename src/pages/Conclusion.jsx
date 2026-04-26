import React, { useState, useEffect } from 'react';
import './Pages.css';

// ═══════════════ THEME ═══════════════
const T = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  accent: "#f4a261", teal: "#2ec4b6", red: "#e63946", blue: "#457b9d",
  purple: "#a855f7", gold: "#d4a017", green: "#2ec4b6",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
};

// ═══════════════ CONCLUSION SECTIONS ═══════════════
const SECTIONS = [
  {
    id: 1,
    number: "01",
    title: "Revisiting the Research Question",
    teaser: "The question had two halves. The data answers the first half clearly and the second with important qualifications.",
    icon: "🎯",
    color: T.accent,
    content: `The research question asked how NIL compensation has affected the financial divide and competitive balance between Power 4 and non-Power 4 NCAA Division I programs. The data answers the first half of that question clearly and the second half with important qualifications.

The financial divide has widened substantially. The revenue gap between Power 5 and Group of 5 athletic departments grew from $80M in 2019 to $115M in 2023 - a 44% increase that coincides directly with the introduction of NIL. Eighty-five of the top 100 NIL-valued athletes attend Power 4 schools, only one is at a non-Power 4 program, and the correlation between NIL spending and recruit quality strengthened from r = 0.50 in 2023 to r = 0.77 in 2025. On the financial side, the evidence is consistent and unambiguous: the rich have gotten richer, faster.

The competitive balance question is more complicated. In football, the gap widened - Power conference teams went from winning at a rate 6.2 percentage points higher than Group of 5 teams before NIL to 8.0 percentage points higher after, and their SRS advantage grew from 5.6 to 7.2. But men's basketball moved in the opposite direction. Power conference teams actually got slightly worse post-NIL (58.8% win rate vs. 59.4% pre-NIL), while High-Major programs gained 1.5 percentage points. Women's basketball was essentially flat. The competitive effect of NIL is sport-dependent, not ...
  },
  {
    id: 2,
    number: "02",
    title: "How the Hypothesis Holds Up",
    teaser: "Most clearly supported in basketball, partially supported in football, and supported by default in women's basketball.",
    icon: "✅",
    color: T.teal,
    content: `The stated hypothesis - that NIL has widened the financial gap but that the competitive gap has not widened proportionally - is supported, with a caveat. It is most clearly supported in basketball, where the financial gap widened dramatically (NIL-per-recruit went from near-parity in 2022 to an 8x gap in 2026) while the competitive gap actually narrowed. It is only partially supported in football, where both gaps widened, though the competitive widening was meaningfully smaller than the financial widening would predict. Women's basketball supports the hypothesis by showing minimal movement.

The proposed mechanism - that NIL spending alone cannot override coaching, culture, scheme fit, and development - is borne out by the weak NIL-to-winning correlation (r ≈ 0.25). Money reliably buys recruits (r = 0.77), and recruits reliably produce team quality (r = 0.68), but the chain from spending to winning is broken by everything that happens between recruitment and game day. The NIL marketplace is still inefficient enough that high spending does not translate directly to high win totals.`,
  },
  {
    id: 3,
    number: "03",
    title: "Contribution to the Larger Conversation",
    teaser: "Three contributions: testing a scholarly disagreement, extending analysis beyond recruiting, and prioritizing public accessibility.",
    icon: "🎓",
    color: T.blue,
    content: `This project contributes three things to the existing NIL literature.

<h3>First, it tests a disagreement</h3>
Li and Derdenger's 2025 Management Science study argued that NIL improved competitive balance. Pitts and Evans's 2025 Journal of Sports Economics study argued that NIL's impact on talent distribution is limited by prohibitive costs. Both arguments are defensible, and the existing literature has not adjudicated between them. This project's cross-sport comparison offers one piece of evidence: both are partially right, and which one is more right depends on the sport. Basketball fits the Li & Derdenger frame. Football fits the Pitts & Evans frame. Women's basketball fits neither cleanly.

<h3>Second, it extends analysis beyond recruiting</h3>
Most published NIL research measures effects on recruiting outcomes because recruiting data is more abundant. This project adds on-field performance data - win percentages, SRS values, and their pre/post changes - which is where the theoretically interesting disconnect actually shows up. The finding that NIL-to-recruiting is strong (r = 0.77) while NIL-to-winning is weak (r = 0.25) is not prominently documented in existing peer-reviewed research, and it has practical implications for how athletic administrators should think about NIL ROI.

<h3>Third, it prioritizes accessibility</h3>
The analysis is presented through interactive web dashboards rather than a traditional research report. Athletic directors, journalists, and fans who need to understand cross-conference NIL patterns can explore the data directly instead of interpreting someone else's static charts. This addresses a real gap - most NIL data is either paywalled in industry reports or buried in academic journals inaccessible to the general sports-literate public.`,
  },
  {
    id: 4,
    number: "04",
    title: "New Questions the Project Raises",
    teaser: "Four follow-up questions about roster size, marketplace maturity, non-revenue sports, and where WBB is heading next.",
    icon: "❓",
    color: T.purple,
    content: `Answering the research question surfaced several follow-up questions this project cannot address on its own.

<h3>Why is the competitive effect sport-dependent?</h3>
The clearest analytical puzzle is why football and basketball moved in opposite directions post-NIL. One theory is roster size - football's 105-player rosters dilute the impact of any single NIL signing, while basketball's 15-player rosters let a single star transform a program. Another is transfer portal dynamics; basketball's portal activity is proportionally larger. A third is that football's media rights disparities are so much larger than basketball's that the landscape was already tilted before NIL. Testing these explanations requires data this project did not collect.

<h3>What happens when the NIL marketplace matures?</h3>
The weak NIL-to-winning correlation is a snapshot of an immature marketplace, not a permanent feature. As valuations become more accurate and the NIL Go clearinghouse imposes more structured compliance, the marketplace should become more efficient - meaning the current disconnect between financial inequality and competitive balance may not last. Tracking that convergence is the most important follow-up question this project raises.

<h3>How will the settlement era reshape non-revenue sports?</h3>
This project focused on the three revenue sports. But the House v. NCAA settlement allows schools to fund revenue sharing out of total athletic budgets, which raises the question of what happens to Olympic and non-revenue sports when athletic departments need to find $20M annually in new compensation spending. Early reporting suggests some schools have begun cutting non-revenue sports, but systematic data does not yet exist.

<h3>Will women's basketball follow football's concentrating pattern or men's basketball's balancing one?</h3>
WBB is the third-largest NIL sport and growing fast. Its competitive balance was essentially flat through the post-NIL period examined here, but that may be a lagging indicator. Which direction it moves will tell us something important about whether the sport-dependent effect is about roster size, media economics, or something else entirely.`,
  },
  {
    id: 5,
    number: "05",
    title: "A Final Word",
    teaser: "The financial arms race is real. The competitive monopoly hasn't arrived - but the window in which it can be resisted may be narrowing.",
    icon: "✍️",
    color: T.gold,
    content: `The data confirms the hypothesis: the financial gap between Power 4 and non-Power 4 programs is widening dramatically in the NIL era, but the on-field competitive gap has not widened proportionally. Football shows the most concerning trend toward consolidation; basketball has actually become more competitive; women's basketball is still taking shape. The NIL marketplace remains immature and inefficient - high spending does not yet reliably translate to winning.

The question for the future is whether this disconnect will hold. As the marketplace matures, valuations sharpen, and revenue sharing takes full effect, the weak correlation between spending and winning may strengthen. The window in which coaching, culture, and creativity can overcome a financial disadvantage may be narrowing - but it has not yet closed.`,
    hasBlockquote: true,
    blockquoteText: "The financial arms race is real. The competitive monopoly hasn't arrived - but the window in which it can be resisted may be narrowing.",
  },
];

// ═══════════════ VERDICT CARD ═══════════════
const VerdictCard = ({ side, accentColor, eyebrow, title, body }) => (
  <div style={{
    background: side === 'left' ? 'rgba(230,57,70,0.07)' : 'rgba(46,196,182,0.07)',
    border: `1px solid ${T.border}`,
    borderLeft: `3px solid ${accentColor}`,
    borderRadius: 10,
    padding: 24,
    flex: 1,
  }}>
    <p style={{ fontSize: 11, color: accentColor, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700, margin: '0 0 8px' }}>
      {eyebrow}
    </p>
    <h3 style={{ fontSize: 18, fontWeight: 700, color: T.white, margin: '0 0 12px' }}>
      {title}
    </h3>
    <p style={{ fontSize: 14, color: T.text, lineHeight: 1.6, margin: 0 }}>
      {body}
    </p>
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
    const paragraphs = section.content.split('\n\n').filter(p => p.trim());
    return (
      <>
        {paragraphs.map((para, i) => {
          if (para.startsWith('<h3>')) {
            const title = para.replace(/<\/?h3>/g, '');
            return <h3 key={i} style={{ fontSize: 17, fontWeight: 700, color: T.white, margin: '20px 0 12px', paddingBottom: 8, borderBottom: `1px solid ${T.border}` }}>{title}</h3>;
          }
          return (
            <p key={i} style={{ fontSize: 15, color: T.text, lineHeight: 1.75, marginBottom: 16 }}>
              {para.split(/(<strong>.*?<\/strong>)/g).map((part, j) => {
                if (part.startsWith('<strong>')) {
                  const text = part.replace(/<\/?strong>/g, '');
                  return <strong key={j} style={{ color: T.white }}>{text}</strong>;
                }
                return <span key={j}>{part}</span>;
              })}
            </p>
          );
        })}
        {section.hasBlockquote && (
          <div style={{
            background: T.cardAlt,
            borderLeft: `3px solid ${section.color}`,
            borderRadius: 8,
            padding: 20,
            marginTop: 24,
          }}>
            <p style={{ fontSize: 17, fontStyle: 'italic', color: T.white, lineHeight: 1.7, margin: 0 }}>
              "{section.blockquoteText}"
            </p>
          </div>
        )}
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
export default function Conclusion() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* HERO HEADER */}
      <div style={{ padding: '60px 24px 40px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 10, color: T.accent, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, margin: '0 0 16px' }}>
          SECTION 5
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: T.white, margin: '0 0 16px', letterSpacing: -1 }}>
          Conclusion
        </h1>
        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, maxWidth: 650, margin: 0 }}>
          Revisiting the research question, testing the hypothesis against the data, and surfacing the questions this project cannot answer on its own.
        </p>
      </div>

      {/* VERDICT SUMMARY */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <VerdictCard
          side="left"
          accentColor={T.red}
          eyebrow="THE FINANCIAL DIVIDE"
          title="Widened Dramatically"
          body="Revenue gap grew 44% ($80M → $115M). 85 of 100 top NIL athletes at Power 4 schools. NIL-to-recruiting correlation strengthened from r=0.50 to r=0.77."
        />
        <VerdictCard
          side="right"
          accentColor={T.green}
          eyebrow="THE COMPETITIVE GAP"
          title="Did Not Follow"
          body="Football widened (+1.8pp). Men's basketball actually narrowed (High-Majors gained +1.5pp). NIL-to-winning correlation stayed weak at r=0.25."
        />
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
