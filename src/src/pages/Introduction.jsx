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
            How has NIL compensation affected the financial divide and competitive balance between Power 4 and non-Power 4 NCAA Division I programs?
          </h2>
        </div>

        {/* Hypothesis */}
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          padding: 24,
          marginBottom: 40,
          borderLeft: `4px solid ${theme.accent}`,
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 800,
            color: theme.white,
            margin: '0 0 16px',
          }}>
            Hypothesis
          </h3>
          <p style={{
            fontSize: 15,
            color: theme.text,
            lineHeight: 1.75,
            margin: '0 0 12px',
          }}>
            NIL compensation has significantly widened the financial gap between Power 4 and non-Power 4 programs, but its effect on competitive balance is more nuanced than a simple "rich get richer" narrative suggests.
          </p>
          <p style={{
            fontSize: 15,
            color: theme.text,
            lineHeight: 1.75,
            margin: 0,
          }}>
            While resource-rich programs are spending dramatically more on athlete compensation, the on-field competitive gap — measured through win percentages, recruiting rankings, and postseason outcomes — has not widened proportionally. This is because money can't override other critical factors: coaching quality, institutional culture, geographic recruiting advantages, and the inefficiencies of an immature NIL marketplace where athlete valuations do not yet reliably predict performance.
          </p>
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
          <CollapsibleSection title="📋 Research Statement">
            <p>
              This capstone project examines the Name, Image, and Likeness (NIL) landscape in NCAA Division I athletics, specifically investigating how the 2021 NCAA policy shift enabling athlete compensation has affected both the financial divide between institutional tiers and competitive balance across sports. Through quantitative analysis of NIL spending data, revenue distributions, recruiting trends, and win percentages, combined with thematic analysis of institutional policies and athlete experiences, this study seeks to determine whether NIL policies have functioned as intended (creating athlete compensation opportunities) or primarily exacerbated existing inequalities between well-funded and under-resourced programs.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="🎯 Purpose & Audience">
            <p>
              This research is intended for academic audiences, NCAA policymakers, athletic directors, and student-athlete advocates who are tasked with understanding the systemic implications of NIL policies. The findings will help inform future policy decisions regarding athlete compensation, institutional spending caps, and competitive fairness in collegiate athletics. The research aims to move beyond anecdotal discussions about NIL and provide empirical evidence about its real-world impact on institutional economics and competitive outcomes.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="⚡ Exigency">
            <p>
              Since the NCAA's 2021 decision to permit NIL deals, the collegiate athletics landscape has undergone rapid and largely unregulated change. Major programs have invested millions in athlete compensation, creating unprecedented financial disparities between Power 4 and non-Power 4 institutions. Yet despite these massive investments, on-field outcomes have not shifted as dramatically as stakeholders anticipated. This disconnect demands urgent investigation. Without empirical evidence about NIL's actual effects, policymakers risk either perpetuating a system that deepens inequality or implementing restrictions that undermine athlete compensation opportunities. This study provides the data needed to inform that critical conversation at a moment when NIL policies are still evolving and malleable.
            </p>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}
