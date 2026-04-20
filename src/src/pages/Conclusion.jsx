import React from 'react';
import { theme } from '../styles/theme';

const InsightCard = ({ title, accentColor, bgColor, children }) => (
  <div style={{
    background: bgColor,
    border: `2px solid ${accentColor}`,
    borderRadius: 12,
    padding: 24,
    flex: '1 1 280px',
  }}>
    <h3 style={{
      fontSize: 18,
      fontWeight: 800,
      color: theme.white,
      margin: '0 0 16px',
      paddingBottom: 12,
      borderBottom: `2px solid ${accentColor}`,
    }}>
      {title}
    </h3>
    <ul style={{
      listStyle: 'none',
      padding: 0,
      margin: 0,
    }}>
      {children.map((point, idx) => (
        <li
          key={idx}
          style={{
            fontSize: 14,
            color: theme.text,
            lineHeight: 1.7,
            marginBottom: idx < children.length - 1 ? 12 : 0,
            paddingLeft: 24,
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 0,
              color: accentColor,
              fontWeight: 800,
            }}
          >
            •
          </span>
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const SectionBox = ({ title, children }) => (
  <div style={{
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  }}>
    <h2 style={{
      fontSize: 20,
      fontWeight: 800,
      color: theme.white,
      margin: '0 0 16px',
      paddingBottom: 12,
      borderBottom: `2px solid ${theme.accent}`,
    }}>
      {title}
    </h2>
    <div style={{
      fontSize: 15,
      color: theme.text,
      lineHeight: 1.75,
    }}>
      {children}
    </div>
  </div>
);

export default function Conclusion() {
  const redAccent = '#e63946';
  const redBg = 'rgba(230, 57, 70, 0.07)';
  const greenAccent = '#2ec4b6';
  const greenBg = 'rgba(46, 196, 182, 0.07)';

  return (
    <div style={{
      background: theme.bg,
      color: theme.text,
      padding: '40px 20px',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: 1000,
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
            Conclusion
          </h1>
          <p style={{
            fontSize: 15,
            color: theme.muted,
            lineHeight: 1.6,
            margin: 0,
          }}>
            Synthesizing findings across five dimensions of NIL's impact on collegiate athletics.
          </p>
        </div>

        {/* Two-Column Insight Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            marginBottom: 40,
          }}
        >
          <InsightCard
            title="The Financial Arms Race is Real"
            accentColor={redAccent}
            bgColor={redBg}
          >
            {[
              'Revenue gap grew 44% post-NIL ($80M → $115M)',
              'NIL spending 4.5x–8x higher at Power 4 (sport-dependent)',
              '85 of top 100 NIL athletes compete in Power 4 conferences',
              'Zero Group of 5 schools generate $20.5M annual revenue required for revenue sharing participation',
              'SEC + Big Ten control 51 of top 100 NIL athletes and $64M in analyzed deals',
            ]}
          </InsightCard>

          <InsightCard
            title="But the Monopoly Hasn't Arrived"
            accentColor={greenAccent}
            bgColor={greenBg}
          >
            {[
              'Men\'s basketball competitive balance improved post-NIL (+1.5pp for High-Majors)',
              'NIL→win% correlation remains weak (r=0.25)',
              '5-star recruiting concentration actually loosened slightly (100% → 96.9% to Power 4)',
              'Typical NIL deal stays under $100K; most athletes receive zero',
              'Coaching quality and transfer portal flexibility override raw spending differences in basketball',
            ]}
          </InsightCard>
        </div>

        {/* Hypothesis Confirmation */}
        <SectionBox title="Testing the Hypothesis">
          <p style={{ marginTop: 0, marginBottom: 12 }}>
            This research set out to test whether NIL compensation had significantly widened the financial gap while having a more nuanced effect on competitive balance. The evidence confirms this hypothesis with important sport-specific caveats.
          </p>
          <p style={{ marginBottom: 12 }}>
            <strong style={{ color: theme.accent }}>Financial divide confirmed:</strong> The data unambiguously shows that NIL adoption has accelerated an existing trend of financial divergence. The 44% expansion of the revenue gap, coupled with the 4.5x–8x NIL spending differential and the absolute exclusion of Group of 5 programs from revenue sharing frameworks, demonstrates that NIL has become a primary mechanism of financial stratification in collegiate athletics.
          </p>
          <p style={{ marginBottom: 12 }}>
            <strong style={{ color: theme.accent }}>Competitive balance paradox:</strong> Despite this financial widening, competitive balance has evolved unpredictably. Football shows the predicted consolidation (gap widened 1.8pp), consistent with a "rich get richer" dynamic where massive recruiting investments compound advantages in large-roster sports. Yet basketball reveals an alternative trajectory: improved competitive balance despite larger NIL spending gaps. This reflects the structural differences of smaller-roster sports where targeted recruiting and the transfer portal can rapidly alter competitive trajectories.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong style={{ color: theme.accent }}>Intervening variables matter:</strong> The weak NIL→win% correlation (r=0.25) validates the core hypothesis: money buys talent, but talent doesn't reliably buy wins. Coaching quality, player development systems, scheme fit, injury luck, and team chemistry remain primary determinants of on-field performance. This is not to dismiss NIL's importance — it is to recognize that financial advantage is necessary but insufficient for competitive success.
          </p>
        </SectionBox>

        {/* Future Outlook */}
        <SectionBox title="Future Outlook: The Narrowing Window">
          <p style={{ marginTop: 0, marginBottom: 12 }}>
            As the NIL marketplace matures over the next 5–7 years, several dynamics may shift the current equilibrium. First, the weak correlation between NIL spending and wins may strengthen as market pricing becomes more sophisticated. Currently, NIL valuations are noisy and inefficient — elite athletes are sometimes undervalued, others overvalued relative to actual performance contribution. As NIL platforms, data analytics, and recruiting science improve, pricing will converge on true performance value. This will likely increase the spending-to-wins correlation.
          </p>
          <p style={{ marginBottom: 12 }}>
            Second, revenue sharing may formalize the financial hierarchy. If the NCAA implements spending floors tied to conference revenue (as recently discussed), then institutional NIL spending will become more standardized and predictable — narrowing the current variance that allows outlier coaching successes and transfer portal magic to overcome financial disadvantage.
          </p>
          <p style={{ marginBottom: 12 }}>
            Third, the transfer portal and NIL are now inextricably linked. Early adopters like Texas A&M discovered that NIL without roster continuity produces disappointing results. Programs are learning that NIL must be coupled with thoughtful roster building and development pipelines. As this integration matures, programs that can coordinate NIL spending with transfer portal strategy will pull further ahead of those with fragmented approaches.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong style={{ color: theme.accent }}>Critical insight:</strong> There exists a narrowing but still-open window where coaching excellence, cultural advantage, and geographic recruiting benefits can overcome financial disadvantage. This window is closing — not because money is becoming all-powerful, but because the inefficiencies that currently allow upsets are being systematized away. The next 3–5 years will determine whether this window remains a realistic competitive pathway or becomes a historical artifact.
          </p>
        </SectionBox>

        {/* Questions for Future Research */}
        <SectionBox title="Questions for Future Research">
          <div style={{ marginTop: 0 }}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.accent,
                  marginBottom: 6,
                }}
              >
                Revenue Sharing & Formalization
              </div>
              <p style={{ margin: 0, fontSize: 14, color: theme.text, lineHeight: 1.6 }}>
                Will revenue sharing create a hard ceiling on institutional NIL spending? If so, will this stabilize or accelerate competitive stratification? How will "unshared" revenue (from private donors and non-conference sources) be distinguished from institutional revenue sharing funds?
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.accent,
                  marginBottom: 6,
                }}
              >
                Transfer Portal & Roster Dynamics
              </div>
              <p style={{ margin: 0, fontSize: 14, color: theme.text, lineHeight: 1.6 }}>
                How will the integration of NIL spending with transfer portal activity reshape multiyear roster construction? Will programs develop more sophisticated models for predicting which portal transfers will actually produce wins relative to their NIL cost? Will this advantage accrue further to well-resourced programs with advanced analytics?
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.accent,
                  marginBottom: 6,
                }}
              >
                Women's Sports & Equity
              </div>
              <p style={{ margin: 0, fontSize: 14, color: theme.text, lineHeight: 1.6 }}>
                Women's basketball NIL spending remains underdeveloped. As it grows, will competitive balance shift? Will Title IX compliance pressures accelerate women's NIL investment? What happens to non-revenue sports (soccer, cross country, rowing) as NIL dollars concentrate on football and men's basketball?
              </p>
            </div>

            <div style={{ marginBottom: 0 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.accent,
                  marginBottom: 6,
                }}
              >
                Non-Revenue Sports & Budget Constraints
              </div>
              <p style={{ margin: 0, fontSize: 14, color: theme.text, lineHeight: 1.6 }}>
                As institutional budgets face pressure from revenue sharing allocation, which sports will be cut or de-emphasized? Will Group of 5 programs have to eliminate Olympic sports to fund even minimal NIL commitments? How will this reshape the entire collegiate athletics ecosystem?
              </p>
            </div>
          </div>
        </SectionBox>

        {/* Final Reflection */}
        <div
          style={{
            background: theme.card,
            border: `2px solid ${theme.accent}`,
            borderRadius: 12,
            padding: 28,
            marginBottom: 40,
          }}
        >
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: theme.accent }}>
            FINAL REFLECTION
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: theme.text,
              lineHeight: 1.8,
              fontStyle: 'italic',
            }}
          >
            NIL has not created a level playing field in collegiate athletics. The financial divide is real and growing. Yet NIL has also not delivered the apocalyptic "rich monopoly" that skeptics feared. The truth, as is often the case, lies between extremes: we are witnessing the formalization and acceleration of existing inequalities, not their creation from scratch. For programs with resources, NIL is a tool for consolidating advantage. For underfunded programs, NIL represents a new dimension of competitive disadvantage — but not an insurmountable one. The window for coaching excellence, cultural strength, and strategic execution to overcome financial gaps is narrowing, but it has not yet closed. How that window evolves depends on policy choices around revenue sharing, transfer portal rules, and equity investments in women's and Olympic sports. The capstone project has provided the data; what remains is collective action to determine what kind of collegiate athletics ecosystem we want to build.
          </p>
        </div>
      </div>
    </div>
  );
}
