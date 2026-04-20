import React, { useState } from 'react';
import { theme } from '../styles/theme';

const AccordionSection = ({ title, children }) => {
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
        onMouseEnter={(e) => e.target.style.background = theme.border}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
      >
        {title}
        <span style={{
          display: 'inline-block',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
          fontSize: 20,
        }}>
          +
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

const DataSourceItem = ({ name, description }) => (
  <div style={{
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: `1px solid ${theme.border}`,
  }}>
    <div style={{
      fontSize: 14,
      fontWeight: 700,
      color: theme.accent,
      marginBottom: 6,
    }}>
      {name}
    </div>
    <div style={{
      fontSize: 15,
      color: theme.text,
      lineHeight: 1.6,
    }}>
      {description}
    </div>
  </div>
);

export default function Methodology() {
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
            Methodology
          </h1>
          <p style={{
            fontSize: 15,
            color: theme.muted,
            lineHeight: 1.6,
            margin: 0,
          }}>
            This section outlines the data sources, processing techniques, analytical methods, and tools used to investigate NIL's impact on collegiate athletics.
          </p>
        </div>

        {/* Accordion Sections */}
        <AccordionSection title="📊 Data Sources">
          <DataSourceItem
            name="EADA (Equity in Athletics Data Analysis)"
            description="Federally mandated revenue and expense data for all Title IV schools. Provides standardized financial reporting across all NCAA Division I programs, enabling direct comparisons of institutional spending on athletics."
          />
          <DataSourceItem
            name="Knight-Newhouse Database"
            description="Athletics finances for 230+ public Division I schools dating back to 2005. Offers longitudinal trends in revenue distribution, operating margins, and spending patterns, crucial for pre- and post-NIL comparisons."
          />
          <DataSourceItem
            name="NCAA NIL Assist"
            description="Aggregated, de-identified NIL deal data reported by sport and conference. Provides anonymized transaction-level insights into NIL market activity while protecting athlete privacy."
          />
          <DataSourceItem
            name="On3"
            description="NIL valuations, roster values, and recruiting rankings based on algorithmic estimates derived from publicly available NIL deals and market signals. Offers real-time market valuations and cross-sport comparisons."
          />
          <DataSourceItem
            name="Sports Reference"
            description="Win/loss records, SRS (Simple Rating System) ratings, and historical performance data. Enables quantitative analysis of competitive balance and longitudinal performance trends across decades."
          />
          <DataSourceItem
            name="247Sports"
            description="Composite recruiting rankings aggregating evaluations from multiple scouts and analysts. Standardizes recruiting talent assessment across all Division I programs."
          />
          <DataSourceItem
            name="combined_recruiting_rankings_1.xlsx"
            description="Custom merged dataset combining recruiting rankings, On3 NIL data, and institutional identifiers. Enables correlation analysis between recruiting talent and NIL compensation."
          />
        </AccordionSection>

        <AccordionSection title="🔧 Data Processing">
          <div style={{
            background: theme.bg,
            border: `1px dashed ${theme.border}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            color: theme.text,
            lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Data Consolidation:</strong> Merged seven separate Excel datasets (EADA, Knight-Newhouse, NCAA NIL Assist, On3 valuations, Sports Reference, 247Sports, and custom recruiting rankings) into unified analysis tables. Standardized institution names, conference assignments, and year identifiers across all sources.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Conference Tier Classification:</strong> Applied ON3ConferenceTierLookup.xlsx to standardize conference-tier assignments. Classified all 130 FBS programs as Power 4 (Big Ten, SEC, ACC, Big 12), Group of 5 (American, MAC, Mid-American, Mountain West, Sun Belt), or FCS (Football Championship Subdivision).
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Name Reconciliation:</strong> Corrected school name inconsistencies (e.g., "University of South Carolina" vs. "USC", "University of Miami (FL)" vs. "Miami", "North Carolina State" vs. "NC State") using fuzzy matching and manual verification. This was critical for joining datasets across different sources.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: theme.accent }}>Per-Recruit Calculations:</strong> Calculated average and median NIL compensation per recruit for each program by dividing total conference/program NIL spending by recruiting class size. Computed average-to-median ratio as an inequality measure within institutional NIL spending.
            </p>
          </div>
        </AccordionSection>

        <AccordionSection title="📈 Analysis Methods">
          <div style={{
            background: theme.bg,
            border: `1px dashed ${theme.border}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            color: theme.text,
            lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Pearson Correlation Analysis:</strong> Computed correlation coefficients for three key relationships: (1) NIL spending → win percentage, (2) NIL spending → recruiting ranking, and (3) recruiting ranking → SRS rating. Correlations measure linear relationship strength; values near 0 indicate weak relationships despite expected intuitive connections.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Longitudinal Comparison:</strong> Segmented analysis into pre-NIL era (2018–2021, before NCAA NIL policy change) and post-NIL era (2022–2026, after NIL legalization). Compared average win percentages, recruiting rankings, financial gaps, and competitive balance metrics between eras to isolate NIL's impact from secular trends.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Cross-Conference Financial Gap Analysis:</strong> Calculated revenue ratios (Power 4 average ÷ Group of 5 average) for each year from 2015 to 2023. Visualized gap trajectories to determine whether NIL adoption accelerated financial divergence or continued pre-existing trends.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: theme.accent }}>Inequality Measurement:</strong> Used average-to-median ratio of NIL deal amounts as an inequality measure. Ratios closer to 1.0 indicate equal distribution; higher ratios signal that top earners substantially skew the average upward, revealing within-program inequality.
            </p>
          </div>
        </AccordionSection>

        <AccordionSection title="💻 Visualization Tools">
          <div style={{
            background: theme.bg,
            border: `1px dashed ${theme.border}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            color: theme.text,
            lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>React & Recharts Library:</strong> Built interactive dashboards using React 18 with Recharts, a composable charting library optimized for responsive visualizations. Recharts components (BarChart, LineChart, ComposedChart, PieChart) handle data rendering, responsive scaling, and user interactions (hover tooltips, custom legends).
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Two Interactive Dashboards:</strong>
              <br />
              <strong>PART 3 (Tabbed Dashboard):</strong> Organized into six tabs representing different aspects of NIL financial disparity and competitive impact. Allows users to navigate between related analyses sequentially.
              <br />
              <strong>PART 4 (Scrolling Narrative):</strong> Long-form scrolling dashboard that tells the NIL story chronologically. Charts integrate with narrative text to guide interpretation, moving from market overview to correlation analysis.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: theme.accent }}>Deployment:</strong> Deployed via GitHub Pages using HashRouter for client-side routing. All data and code are static assets served from a public repository, enabling zero-cost hosting and broad accessibility.
            </p>
          </div>
        </AccordionSection>

        <AccordionSection title="🤖 AI Tool Usage">
          <div style={{
            background: theme.bg,
            border: `1px dashed ${theme.border}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            color: theme.text,
            lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Claude (Anthropic) — Primary AI Assistant:</strong> Used extensively throughout the project for multiple tasks:
            </p>
            <ul style={{ margin: '0 0 12px', paddingLeft: 20, color: theme.text }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Dashboard Code Generation:</strong> Provided data structures and specifications; Claude generated complete React/Recharts components with proper styling, interactivity, and responsiveness.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Data Array Structuring:</strong> Converted raw Excel analysis results into properly formatted JavaScript objects and arrays ready for visualization.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Chart Design & Iteration:</strong> Refined chart layouts, color schemes, tooltip formatting, and responsive behavior through multiple rounds of feedback and regeneration.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Analysis Commentary Drafting:</strong> Generated initial explanatory text for chart interpretations, which I then carefully reviewed, edited, and verified against actual data values.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Deployment Troubleshooting:</strong> Debugged routing issues, GitHub Pages configuration, and build optimization problems through systematic problem-solving.
              </li>
            </ul>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.accent }}>Critical Distinction — Who Made Analytical Decisions:</strong> All analytical decisions were mine: which variables to measure, which correlations to compute, how to interpret findings, what comparisons to emphasize, and what limitations to acknowledge. Claude's role was code generation, formatting, and technical scaffolding — not analysis design.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: theme.accent }}>Verification & Quality Control:</strong> AI-generated text required careful verification. I caught several instances where AI commentary contained unsupported claims or misinterpreted data. By treating AI output as a draft requiring human review — not as authoritative analysis — I maintained analytical integrity while benefiting from faster code development.
            </p>
          </div>
        </AccordionSection>

        <AccordionSection title="⚠️ Limitations & Caveats">
          <div style={{
            background: theme.bg,
            border: `1px dashed ${theme.border}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            color: theme.text,
            lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.red }}>NIL Data Underreporting:</strong> NIL deal data is largely self-reported by athletes, agencies, and brands. Many deals — especially smaller ones or informal arrangements — go unreported. The NCAA NIL Assist database likely captures only a fraction of total NIL market activity. This means our NIL spending figures are conservative underestimates.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.red }}>On3 Valuations Are Estimates:</strong> On3 athlete valuations and roster values are algorithmic estimates derived from publicly available data, not verified transactions. These estimates contain noise and may not accurately reflect actual market value for every athlete.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.red }}>Knight-Newhouse Coverage Gap:</strong> Knight-Newhouse excludes private schools (Duke, Stanford, USC, SMU). These are often high-spending programs, so our financial gap analyses understate total Power 4 spending and may overstate relative Group of 5 competitiveness.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              <strong style={{ color: theme.red }}>EADA Data Lag:</strong> EADA data is typically published 1–2 years after the reporting year. This means our most recent analysis reflects 2022–2023 financials, not current 2024–2025 realities.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: theme.red }}>Correlation ≠ Causation:</strong> All correlations reported are associations, not causal effects. Many confounding variables influence win percentage (coaching quality, player development, strength of schedule, player injuries, transfer eligibility rules). We cannot isolate NIL as the sole driver of competitive outcomes; correlation only indicates co-movement.
            </p>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
