import React, { useState } from 'react';
import { theme } from '../styles/theme';

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

const SourceCard = ({ author, title, year, journal, annotation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      background: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: 20,
      marginBottom: 16,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
      }}>
        <div style={{ flex: 1 }}>
          <h4 style={{
            fontSize: 15,
            fontWeight: 800,
            color: theme.white,
            margin: '0 0 4px',
          }}>
            {author}
          </h4>
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: theme.accent,
            margin: '0 0 8px',
          }}>
            "{title}"
          </p>
          <p style={{
            fontSize: 12,
            color: theme.muted,
            margin: 0,
          }}>
            {journal} • {year}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            padding: '8px 14px',
            background: isExpanded ? theme.accent : 'transparent',
            border: `1px solid ${theme.accent}`,
            color: isExpanded ? '#000' : theme.accent,
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 12,
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}
        >
          {isExpanded ? 'Hide Annotation' : 'Show Annotation'}
        </button>
      </div>

      {isExpanded && (
        <div style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: `1px solid ${theme.border}`,
          color: theme.text,
          fontSize: 14,
          lineHeight: 1.7,
        }}>
          {annotation}
        </div>
      )}
    </div>
  );
};

export default function Literature() {
  const sources = [
    {
      author: 'Li & Derdenger (2025)',
      title: 'Competitive Balance in NIL Markets',
      year: '2025',
      journal: 'Management Science',
      annotation:
        'This study finds that lower-ranked programs attracted better talent post-NIL and point spreads tightened, directly challenging the "rich get richer" narrative. However, the analysis is limited to football only, leaving open questions about whether these findings extend to other sports with different market dynamics.',
    },
    {
      author: 'Pitts & Evans (2025)',
      title: 'NIL Valuations and Recruiting Success',
      year: '2025',
      journal: 'Journal of Sports Economics',
      annotation:
        'NIL valuations do predict recruiting success, but the cost required to shift elite talent to underfunded schools is prohibitive. Money matters in the NIL market, but it cannot close the competitive gap for institutions lacking the financial resources of Power 4 programs.',
    },
    {
      author: 'Knight Commission',
      title: 'House v NCAA Settlement: Revenue Sharing Brief',
      year: '2025',
      journal: 'Legal Filing',
      annotation:
        'The Knight Commission calculated that revenue sharing caps would be set at approximately 22% of average Power 5 revenue. Their analysis shows that the median Power 4 school generates $100M more annually than the median non-Power 4 school—a structural inequality that NIL policies have not resolved.',
    },
    {
      author: 'OC&C Strategy Consultants',
      title: 'Scoring Big: NIL Market Analysis',
      year: '2025',
      journal: 'Industry Report',
      annotation:
        'The total NIL market is valued at $2.3B, with approximately 50% of spending concentrated in Power 4 institutions. Football drives 70% of total NIL spending, and 68% of all NIL deals are valued under $1,000—highlighting massive inequality between star athletes and typical student-athletes.',
    },
    {
      author: 'Reddy (2024)',
      title: 'Data Transparency and NIL Markets',
      year: '2024',
      journal: 'Georgetown Law Technology Review',
      annotation:
        'State-level disclosure laws for NIL deals are inconsistent and incomplete, creating significant data transparency gaps. This fragmentation makes systematic comparison of NIL spending across institutions and states extremely difficult, limiting the reliability of comparative analysis.',
    },
    {
      author: 'Opendorse',
      title: 'NIL at 3: Market Maturity Report',
      year: '2025',
      journal: 'Industry Report',
      annotation:
        'Year-over-year NIL market growth is 40%. Notably, 55% of top-spending collectives finished in the top 20 for athletics success, suggesting some correlation between NIL spending and competitive outcomes, though causality remains unclear.',
    },
    {
      author: 'Congressional Research Service',
      title: 'House Settlement Legal Framework',
      year: '2025',
      journal: 'Congressional Report',
      annotation:
        'The House settlement introduced an opt-in/opt-out structure for revenue sharing that created complex legal dynamics. Seven athlete appeals have been filed challenging aspects of the settlement, indicating ongoing litigation and regulatory uncertainty.',
    },
    {
      author: 'U.S. Department of Education',
      title: 'EADA User Guide & Data Standards',
      year: '2024',
      journal: 'Federal Guidance',
      annotation:
        'The Equity in Athletics Disclosure Act (EADA) provides federally mandated financial data covering all Title IV institutions. While not NIL-specific, EADA is the most reliable source for comprehensive department finance data and serves as the foundation for revenue and expense analysis in this study.',
    },
  ];

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
        {/* Header */}
        <div style={{
          marginBottom: 40,
        }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            color: theme.white,
            margin: '0 0 12px',
          }}>
            Literature Review
          </h1>
          <p style={{
            fontSize: 15,
            color: theme.muted,
            lineHeight: 1.6,
            margin: 0,
          }}>
            This section summarizes the current research landscape on NIL policy, financial inequality, and competitive balance in NCAA Division I athletics.
          </p>
        </div>

        {/* Accordion Sections */}
        <div style={{ marginBottom: 40 }}>
          <CollapsibleSection title="Overview">
            <p style={{ margin: 0 }}>
              The literature on Name, Image, and Likeness (NIL) policy presents a rapidly evolving and often contradictory picture. Since the NCAA&apos;s 2021 policy shift, scholars, policy organizations, and industry analysts have documented major growth in athlete compensation opportunities, but they also highlight widening resource disparities between institutional tiers. Across the literature, three points recur: the NIL market is expanding quickly, top-end spending is highly concentrated in Power 4 ecosystems, and the relationship between spending and competitive outcomes is significant but not straightforward.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Key Themes">
            <h3 style={{
              color: theme.accent,
              fontSize: 16,
              fontWeight: 700,
              margin: '16px 0 8px',
            }}>
              1) Historical Development
            </h3>
            <p style={{ margin: '0 0 12px' }}>
              Early NIL discussions centered on fairness and athlete rights, but post-2021 scholarship has shifted toward market structure, spending concentration, and institutional adaptation. The legal transition from prohibition to permissive compensation created an immature marketplace where governance, valuation standards, and reporting practices are still unsettled.
            </p>

            <h3 style={{
              color: theme.accent,
              fontSize: 16,
              fontWeight: 700,
              margin: '0 0 8px',
            }}>
              2) Impact on Student-Athlete Compensation
            </h3>
            <p style={{ margin: '0 0 12px' }}>
              Research and industry reporting agree that NIL has increased total compensation volume, but earnings are unevenly distributed. A small group of highly visible athletes capture outsized deals while most athletes receive comparatively modest compensation, indicating that NIL has expanded opportunity without producing equal benefit across the athlete population.
            </p>

            <h3 style={{
              color: theme.accent,
              fontSize: 16,
              fontWeight: 700,
              margin: '0 0 8px',
            }}>
              3) Institutional & NCAA Perspectives
            </h3>
            <p style={{ margin: '0 0 12px' }}>
              Institutional and NCAA-focused sources emphasize structural constraints. Power 4 schools enter the NIL era with far greater baseline revenue, donor support, and media exposure, while non-Power 4 programs face steep budget limitations. Literature tied to House settlement discussions reinforces that these pre-existing financial asymmetries shape how effectively institutions can participate in NIL competition.
            </p>

            <h3 style={{
              color: theme.accent,
              fontSize: 16,
              fontWeight: 700,
              margin: '0 0 8px',
            }}>
              4) Comparative Analysis of State-Level Legislation
            </h3>
            <p style={{ margin: 0 }}>
              Comparative legal analyses show that state-level NIL statutes vary widely in disclosure requirements, enforcement mechanisms, and institutional constraints. This fragmented legal environment creates uneven competitive conditions and reduces data comparability across states, limiting the precision of cross-institution and cross-conference analysis.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Notable Findings">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li style={{ marginBottom: 8 }}><strong>Market concentration is substantial:</strong> Power 4 institutions account for a disproportionate share of top NIL activity and aggregate spending.</li>
              <li style={{ marginBottom: 8 }}><strong>Competitive effects are mixed:</strong> Some evidence suggests NIL can improve talent access for lower-ranked programs, while other work shows high transfer costs still favor wealthy institutions.</li>
              <li style={{ marginBottom: 8 }}><strong>Financial inequality remains structural:</strong> Revenue gaps between Power 4 and non-Power 4 schools predate NIL and continue to shape post-policy outcomes.</li>
              <li style={{ marginBottom: 8 }}><strong>Data quality is inconsistent:</strong> Reporting fragmentation and uneven disclosure standards weaken cross-study comparability and confidence in headline estimates.</li>
              <li><strong>Correlation does not imply causation:</strong> NIL spending correlates with recruiting and performance indicators, but literature cautions against treating these relationships as direct causal effects.</li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Gaps This Project Addresses">
            <p style={{ margin: 0 }}>
              This project addresses a central gap in the literature by integrating financial, NIL, recruiting, and competitive performance data into one comparative framework that evaluates both institutional inequality and competitive outcomes at the same time. Existing studies often isolate one dimension—market size, legal context, recruiting, or win rates—without connecting them across tiers and time periods. By combining these dimensions in a single analysis, this study tests whether NIL expansion primarily reflects existing resource inequality or whether it has produced measurable shifts in competitive balance beyond pre-NIL trends.
            </p>
          </CollapsibleSection>
        </div>

        {/* Synthesis Paragraph */}
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          padding: 24,
          marginBottom: 40,
          borderLeft: `4px solid ${theme.accent}`,
        }}>
          <h2 style={{
            fontSize: 22,
            fontWeight: 800,
            color: theme.white,
            margin: '0 0 16px',
          }}>
            Literature Synthesis
          </h2>
          <p style={{
            fontSize: 15,
            color: theme.text,
            lineHeight: 1.75,
            margin: 0,
          }}>
            The literature on NIL reveals a complex picture. While NIL has undoubtedly created a financial arms race in collegiate athletics, with Power 4 institutions now capturing 50% of a $2.3B market, academic research shows the competitive impact is contested. Some studies (Li & Derdenger 2025) find that NIL tightened competitive balance by enabling lower-ranked programs to attract talent, challenging the "rich get richer" narrative. However, other analyses (Pitts & Evans 2025) show that while NIL valuations predict recruiting outcomes, the costs required to shift elite talent to underfunded schools remain prohibitive. Policy sources reveal the structural inequality is massive: median Power 4 schools generate $100M more revenue than median non-Power 4 peers (Knight Commission 2025). The consensus across sources is that NIL has exacerbated financial disparities without producing proportional competitive advantages, and data transparency gaps continue to complicate systematic analysis.
          </p>
        </div>

        {/* Sources */}
        <h3 style={{
          fontSize: 20,
          fontWeight: 800,
          color: theme.white,
          margin: '0 0 24px',
        }}>
          Key Sources
        </h3>

        {sources.map((source, idx) => (
          <SourceCard key={idx} {...source} />
        ))}
      </div>
    </div>
  );
}
