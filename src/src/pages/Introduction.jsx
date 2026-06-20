import React, { useState } from 'react';
import { theme } from '../styles/theme';

const Stat = ({ value, label, sub, color = theme.accent }) => (
  <div style={{
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderLeft: `3px solid ${color}`,
    borderRadius: 10,
    padding: '16px 20px',
    flex: '1 1 140px',
    minWidth: 140,
  }}>
    <div style={{
      fontSize: 10,
      color: theme.muted,
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontWeight: 700,
      marginBottom: 8,
    }}>
      {label}
    </div>
    <div style={{
      fontSize: 24,
      fontWeight: 800,
      color: theme.white,
      marginBottom: 4,
    }}>
      {value}
    </div>
    {sub && (
      <div style={{
        fontSize: 11,
        color: theme.muted,
        lineHeight: 1.4,
      }}>
        {sub}
      </div>
    )}
  </div>
);

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      marginBottom: 16,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 16,
          fontWeight: 700,
          color: theme.white,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.background = theme.cardAlt}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
      >
        {title}
        <span style={{
          display: 'inline-block',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
          fontSize: 20,
        }}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div style={{
          padding: '0 20px 16px',
          borderTop: `1px solid ${theme.border}`,
          color: theme.text,
          lineHeight: 1.75,
          fontSize: 15,
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function Introduction() {
  return (
    <div style={{
      background: theme.bg,
      color: theme.text,
      padding: '40px 20px',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 800,
          color: theme.white,
          margin: '0 0 8px',
        }}>
          The NIL Divide
        </h1>
        <p style={{
          fontSize: 15,
          color: theme.muted,
          lineHeight: 1.6,
          margin: '0 0 40px',
        }}>
          Welcome to The NIL Divide: Money, Power &amp; Competitive Balance — a Digital Culture and Data Analytics capstone project investigating how Name, Image, and Likeness (NIL) compensation has reshaped NCAA Division I athletics. This interactive site walks through a data-driven analysis of how the NIL era is reshaping the financial and competitive landscape of collegiate sports.
        </p>

        {/* Research Question */}
        <div style={{
          background: theme.card,
          border: `2px solid ${theme.accent}`,
          borderRadius: 12,
          padding: 32,
          marginBottom: 40,
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 12,
            color: theme.accent,
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontWeight: 700,
            marginBottom: 12,
          }}>
            Research Question
          </p>
          <h2 style={{
            fontSize: 28,
            fontWeight: 800,
            color: theme.white,
            margin: '0 0 16px',
            lineHeight: 1.3,
          }}>
            How has the introduction of Name, Image, and Likeness compensation affected the financial divide and competitive balance between Power 4 and non-Power 4 NCAA Division I programs?
          </h2>
        </div>

        {/* Key Statistics */}
        <div style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          <Stat
            value="$2.3B"
            label="Total NIL Market"
            sub="2024-25 season"
            color={theme.accent}
          />
          <Stat
            value="$115M"
            label="Revenue Gap"
            sub="Power 5 vs G5 (2023)"
            color={theme.red}
          />
          <Stat
            value="85%"
            label="P4 in NIL Top 100"
            sub="1 non-Power 4 athlete"
            color={theme.bigten}
          />
          <Stat
            value="r = 0.25"
            label="NIL → Win% Corr."
            sub="Weak"
            color={theme.green}
          />
        </div>

        {/* Collapsible Sections */}
        <div style={{ marginBottom: 40 }}>
          <CollapsibleSection title="📋 Abstract">
            <p>
              Since the NCAA&apos;s interim NIL policy took effect in July 2021 and the House v. NCAA settlement was approved in June 2025, college athletics has entered a new financial era. Schools can now compensate athletes up to $20.5 million annually through direct revenue sharing, and the third-party NIL market has grown to an estimated $2.3 billion. The dominant public narrative holds that this money is concentrating talent and wins at a handful of wealthy programs, producing a &quot;super league&quot; that leaves everyone else behind. This project tests that narrative against the data.
            </p>
            <p>
              Drawing on nine public datasets spanning financial reporting (EADA, Knight-Newhouse), NIL valuations (On3, NCAA NIL Assist, Opendorse), recruiting rankings (On3, 247Sports), and on-field performance (Sports Reference), this study compares Power 4 and non-Power 4 programs across football, men&apos;s basketball, and women&apos;s basketball in the pre-NIL (2018–2021) and post-NIL (2022–2026) eras. Python was used for data cleaning and analysis; React and Recharts power the interactive visualizations.
            </p>
            <p>
              The findings support a more nuanced conclusion than the headlines suggest. The financial gap between Power 5 and Group of 5 athletic departments grew 44% between 2019 and 2023 (from $80M to $115M). Eighty-five of the top 100 NIL-valued athletes attend Power 4 schools, and the correlation between NIL spending and recruit quality has strengthened from r = 0.50 (2023) to r = 0.77 (2025). Yet the competitive effect is sport-dependent: football&apos;s win-percentage gap widened post-NIL, while men&apos;s basketball actually became more competitive, with High-Major programs gaining ground. The correlation between NIL spending and winning remains weak (r ≈ 0.25), indicating that money reliably buys talent but does not yet reliably buy wins. The financial arms race is real — but the competitive monopoly many feared has not yet arrived.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="🗺️ How to Navigate This Site">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>
                <strong>Literature Review</strong> — the academic and industry research shaping this inquiry
              </li>
              <li>
                <strong>Methodology</strong> — data sources, analytical framework, and AI tool reflection
              </li>
              <li>
                <strong>Findings</strong> — interactive dashboards across five research questions
              </li>
              <li>
                <strong>Conclusion</strong> — what the data reveals and what it leaves open
              </li>
              <li>
                <strong>Works Cited</strong> — full bibliography in MLA format
              </li>
            </ul>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}
