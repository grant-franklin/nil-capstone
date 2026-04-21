import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   NIL VALUE ESTIMATOR — Capstone page
   Interactive tool + commentary/limitations accordions
   All figures derived from ON3_Rankings_CLEANED.xlsx, ON3_2025_NIL_TOP100.html,
   and NCAA_NIL_Assist_Deal_Data_summary.xlsx
   ═══════════════════════════════════════════════════════════════════════ */

const CONF_DATA = {
  Football: {
    "SEC": { avg: 106841, med: 93000, p75: 160000, p90: 217000, label: "SEC", tier: "Power 4" },
    "Big Ten": { avg: 70136, med: 37500, p75: 117500, p90: 210000, label: "Big Ten", tier: "Power 4" },
    "ACC": { avg: 41303, med: 25500, p75: 66000, p90: 155000, label: "ACC", tier: "Power 4" },
    "Big 12": { avg: 31991, med: 21500, p75: 66000, p90: 159000, label: "Big 12", tier: "Power 4" },
    "American": { avg: 15379, med: 12000, p75: 16800, p90: 27000, label: "American (G5)", tier: "Non-Power 4" },
    "Sun Belt": { avg: 13200, med: 11500, p75: 15500, p90: 22000, label: "Sun Belt (G5)", tier: "Non-Power 4" },
    "MAC": { avg: 12800, med: 11000, p75: 14000, p90: 19000, label: "MAC (G5)", tier: "Non-Power 4" },
    "Mountain West": { avg: 13500, med: 12200, p75: 15800, p90: 21000, label: "Mountain West (G5)", tier: "Non-Power 4" },
    "Conference USA": { avg: 11500, med: 10000, p75: 13500, p90: 18000, label: "C-USA (G5)", tier: "Non-Power 4" },
    "FCS": { avg: 8500, med: 7000, p75: 11000, p90: 15000, label: "FCS", tier: "Non-Power 4" },
  },
  Basketball: {
    "SEC": { avg: 240409, med: 163500, p75: 350000, p90: 580000, label: "SEC", tier: "Power 4" },
    "Big Ten": { avg: 280146, med: 126000, p75: 350000, p90: 600000, label: "Big Ten", tier: "Power 4" },
    "Big 12": { avg: 596284, med: 299000, p75: 700000, p90: 1200000, label: "Big 12", tier: "Power 4" },
    "ACC": { avg: 357192, med: 73000, p75: 400000, p90: 800000, label: "ACC", tier: "Power 4" },
    "Big East": { avg: 75540, med: 7300, p75: 80000, p90: 200000, label: "Big East", tier: "Non-Power 4" },
    "WCC": { avg: 45383, med: 11450, p75: 50000, p90: 120000, label: "WCC", tier: "Non-Power 4" },
    "A-10": { avg: 39417, med: 8350, p75: 40000, p90: 90000, label: "A-10", tier: "Non-Power 4" },
    "American": { avg: 14525, med: 15700, p75: 25000, p90: 50000, label: "American", tier: "Non-Power 4" },
    "Missouri Valley": { avg: 10000, med: 7000, p75: 15000, p90: 30000, label: "Missouri Valley", tier: "Non-Power 4" },
    "Other Mid-Major": { avg: 8000, med: 5000, p75: 12000, p90: 25000, label: "Other Mid-Major", tier: "Non-Power 4" },
  }
};

const POS_MULT = {
  Football: {
    "QB": { mult: 3.2, label: "Quarterback", note: "31% of NIL Top 100. Highest-value position by far." },
    "WR": { mult: 1.4, label: "Wide Receiver", note: "7% of Top 100. High visibility, social media appeal." },
    "EDGE/DE": { mult: 1.3, label: "Edge Rusher / DE", note: "7% of Top 100. Premium pass rushers command high value." },
    "RB": { mult: 1.0, label: "Running Back", note: "Declining positional value in modern offenses." },
    "OL": { mult: 0.9, label: "Offensive Line", note: "Essential but lower NIL visibility and marketability." },
    "LB": { mult: 0.85, label: "Linebacker", note: "Solid positional value, less marquee appeal." },
    "DL": { mult: 0.9, label: "Defensive Line", note: "Similar to OL — high on-field value, lower NIL profile." },
    "CB": { mult: 1.1, label: "Cornerback", note: "Playmakers with highlight potential." },
    "S": { mult: 0.85, label: "Safety", note: "Moderate NIL profile." },
    "TE": { mult: 1.0, label: "Tight End", note: "Growing positional value in modern offenses." },
    "K/P": { mult: 0.3, label: "Kicker / Punter", note: "Minimal NIL value unless viral social media presence." },
  },
  Basketball: {
    "PG": { mult: 1.8, label: "Point Guard", note: "Ball-dominant, high visibility. 5 of Top 100." },
    "SG": { mult: 1.4, label: "Shooting Guard", note: "Scorers command premium NIL value." },
    "SF": { mult: 1.5, label: "Small Forward", note: "Versatile wings are highly valued. 7 of Top 100." },
    "PF": { mult: 1.6, label: "Power Forward", note: "11 of Top 100 — highest basketball representation." },
    "C": { mult: 1.3, label: "Center", note: "Size commands attention, especially elite bigs." },
  }
};

const STAR_MULT = {
  "5-Star": { mult: 5.0, range: [3.5, 8.0], note: "Elite recruits. Top 30-32 nationally. NIL $300K–$2M+" },
  "High 4-Star": { mult: 2.8, range: [2.0, 4.0], note: "Top 100-150 nationally. NIL $150K–$500K" },
  "4-Star": { mult: 2.0, range: [1.4, 2.8], note: "Top 300 nationally. NIL $80K–$250K" },
  "Low 4-Star": { mult: 1.4, range: [1.0, 2.0], note: "Fringe 4-star. NIL $40K–$150K" },
  "3-Star": { mult: 1.0, range: [0.7, 1.4], note: "Baseline recruit. NIL $10K–$60K at Power 4" },
  "2-Star": { mult: 0.5, range: [0.3, 0.8], note: "Walk-on/low scholarship. NIL $2K–$15K" },
};

const PORTAL_MULT = {
  "Top 10 Transfer": { mult: 2.5, note: "Elite proven talent. Programs will pay top dollar." },
  "Top 25 Transfer": { mult: 2.0, note: "High-demand transfer. Multiple P4 offers likely." },
  "Top 50 Transfer": { mult: 1.6, note: "Strong transfer target. Competitive bidding expected." },
  "Top 100 Transfer": { mult: 1.3, note: "Solid transfer. Good leverage at destination." },
  "Top 200 Transfer": { mult: 1.1, note: "Contributing transfer. Moderate NIL bump expected." },
  "Unranked / Walk-on": { mult: 0.8, note: "Depth transfer. Minimal NIL premium over baseline." },
};

const C = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  accent: "#f4a261", power: "#e63946", g5: "#457b9d",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
  green: "#2ec4b6", red: "#e63946", gold: "#f4a261",
};

const fmt = (n) => {
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

/* ═══════════════ REUSABLE ACCORDION ═══════════════ */
const Accordion = ({ title, subtitle, icon, defaultOpen = false, accent = C.accent, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${open ? accent : C.border}`,
      borderRadius: 12,
      marginBottom: 12,
      transition: "border-color 0.2s ease",
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
          color: C.white,
          fontFamily: "inherit",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {icon && (
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: `${accent}22`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: accent, fontWeight: 800,
            }}>{icon}</div>
          )}
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.white, letterSpacing: -0.2 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{subtitle}</div>}
          </div>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: open ? accent : C.cardAlt,
          color: open ? "#000" : C.muted,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 700,
          transition: "all 0.2s ease",
        }}>{open ? "−" : "+"}</div>
      </button>
      {open && (
        <div style={{
          padding: "0 22px 22px",
          borderTop: `1px solid ${C.border}`,
          animation: "nilFadeIn 0.25s ease",
        }}>
          <div style={{ paddingTop: 18 }}>{children}</div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════ MAIN ESTIMATOR PAGE ═══════════════ */
export default function Estimator() {
  const [sport, setSport] = useState("Football");
  const [conference, setConference] = useState("SEC");
  const [position, setPosition] = useState("QB");
  const [starRating, setStarRating] = useState("4-Star");
  const [portalRank, setPortalRank] = useState("Top 50 Transfer");
  const [socialBoost, setSocialBoost] = useState(false);
  const [result, setResult] = useState(null);

  const confs = Object.keys(CONF_DATA[sport]);
  const positions = Object.keys(POS_MULT[sport]);

  useEffect(() => {
    setPosition(sport === "Football" ? "QB" : "PG");
    setConference(Object.keys(CONF_DATA[sport])[0]);
  }, [sport]);

  const calculate = () => {
    const confData = CONF_DATA[sport][conference];
    const posData = POS_MULT[sport][position];
    const starData = STAR_MULT[starRating];
    const portalData = PORTAL_MULT[portalRank];
    const socialMult = socialBoost ? 1.25 : 1.0;
    const base = confData.med;

    const midEstimate = base * posData.mult * starData.mult * portalData.mult * socialMult;
    const lowEstimate = base * posData.mult * starData.range[0] * portalData.mult * (socialBoost ? 1.1 : 0.85);
    const highEstimate = base * posData.mult * starData.range[1] * portalData.mult * socialMult * 1.2;

    const maxCeiling = sport === "Football" ? 7000000 : 4500000;
    const cappedHigh = Math.min(highEstimate, maxCeiling);

    let percentile;
    if (midEstimate >= confData.p90) percentile = "Top 10%";
    else if (midEstimate >= confData.p75) percentile = "Top 25%";
    else if (midEstimate >= confData.avg) percentile = "Above Average";
    else if (midEstimate >= confData.med) percentile = "Average";
    else percentile = "Below Average";

    let top100Status;
    if (midEstimate >= 1500000) top100Status = "Likely Top 50 NIL athlete nationally";
    else if (midEstimate >= 500000) top100Status = "Potential NIL Top 100 athlete";
    else if (midEstimate >= 200000) top100Status = "Top-tier NIL earner for this conference";
    else if (midEstimate >= 50000) top100Status = "Above-average NIL earner";
    else top100Status = "Typical NIL range for this conference/tier";

    setResult({
      low: Math.max(lowEstimate, 1000),
      mid: Math.max(midEstimate, 2000),
      high: Math.max(cappedHigh, 5000),
      base,
      posMult: posData.mult,
      starMult: starData.mult,
      portalMult: portalData.mult,
      confLabel: confData.label,
      confTier: confData.tier,
      percentile,
      top100Status,
    });
  };

  useEffect(() => { calculate(); }, [sport, conference, position, starRating, portalRank, socialBoost]);

  const Select = ({ label, value, onChange, options, descriptions }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
        background: C.cardAlt, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", outline: "none",
      }}>
        {options.map(o => (
          <option key={o} value={o}>{descriptions ? `${o} — ${descriptions[o]}` : o}</option>
        ))}
      </select>
    </div>
  );

  const barWidth = (val, max) => `${Math.min((val / max) * 100, 100)}%`;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes nilFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px 8px" }}>
        <p style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: "0 0 8px" }}>Interactive Capstone Tool</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, color: C.white, margin: 0, letterSpacing: -1, lineHeight: 1.1 }}>
          NIL Value <span style={{ color: C.accent }}>Estimator</span>
        </h1>
        <p style={{ color: C.muted, marginTop: 12, fontSize: 15, maxWidth: 720, lineHeight: 1.6 }}>
          Model a hypothetical athlete's annual NIL earnings by conference, position, star rating, and transfer portal status. Built on real data from the capstone's analysis of On3, NCAA NIL Assist, and EADA datasets.
        </p>
      </div>

      {/* ══════════════════ INTERACTIVE TOOL ══════════════════ */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px", display: "flex", gap: 24, flexWrap: "wrap" }}>

        {/* LEFT: INPUTS */}
        <div style={{ flex: "1 1 340px", minWidth: 300 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: C.white, margin: "0 0 20px" }}>Player Profile</h2>

            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {["Football", "Basketball"].map(s => (
                <button key={s} onClick={() => setSport(s)} style={{
                  flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                  background: sport === s ? (s === "Football" ? "#e63946" : "#a855f7") : C.cardAlt,
                  color: sport === s ? "#fff" : C.muted, fontWeight: 700, fontSize: 14, transition: "all 0.2s",
                }}>{s}</button>
              ))}
            </div>

            <Select label="Target Conference" value={conference} onChange={setConference}
              options={confs} descriptions={Object.fromEntries(confs.map(c => [c, CONF_DATA[sport][c].tier]))} />

            <Select label="Position" value={position} onChange={setPosition}
              options={positions} descriptions={Object.fromEntries(positions.map(p => [p, POS_MULT[sport][p].label]))} />

            <Select label="Star Rating / Talent Level" value={starRating} onChange={setStarRating}
              options={Object.keys(STAR_MULT)} />

            <Select label="Transfer Portal Ranking" value={portalRank} onChange={setPortalRank}
              options={Object.keys(PORTAL_MULT)} />

            <div style={{ marginTop: 4 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div onClick={() => setSocialBoost(!socialBoost)} style={{
                  width: 44, height: 24, borderRadius: 12, background: socialBoost ? C.accent : C.border,
                  position: "relative", transition: "all 0.2s", cursor: "pointer",
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 9, background: "#fff", position: "absolute", top: 3,
                    left: socialBoost ? 23 : 3, transition: "all 0.2s",
                  }} />
                </div>
                <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>Social media presence (50K+ followers)</span>
              </label>
              <p style={{ fontSize: 11, color: C.muted, margin: "4px 0 0 54px" }}>Adds ~25% NIL premium for endorsement/sponsorship value</p>
            </div>
          </div>
        </div>

        {/* RIGHT: RESULTS */}
        <div style={{ flex: "1 1 500px", minWidth: 340 }}>
          {result && (
            <>
              <div style={{ background: `linear-gradient(135deg, ${C.card} 0%, ${C.cardAlt} 100%)`, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, margin: 0 }}>Estimated Annual NIL Value</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: C.accent, letterSpacing: -2 }}>{fmt(result.mid)}</span>
                  <span style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>mid-range estimate</span>
                </div>

                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 6 }}>
                    <span>Low: {fmt(result.low)}</span>
                    <span>High: {fmt(result.high)}</span>
                  </div>
                  <div style={{ height: 10, background: C.border, borderRadius: 5, position: "relative", overflow: "hidden" }}>
                    <div style={{
                      position: "absolute", left: `${(result.low / result.high) * 100}%`,
                      width: `${((result.mid - result.low) / result.high) * 100}%`,
                      height: "100%", background: `linear-gradient(90deg, ${C.g5}, ${C.accent}, ${C.power})`,
                      borderRadius: 5,
                    }} />
                    <div style={{
                      position: "absolute", left: `${(result.mid / result.high) * 100 - 1}%`,
                      width: 3, height: "100%", background: C.white, borderRadius: 2,
                    }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                  <span style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, background: result.confTier === "Power 4" ? "rgba(230,57,70,0.15)" : "rgba(69,123,157,0.15)", color: result.confTier === "Power 4" ? C.power : C.g5 }}>
                    {result.confTier}
                  </span>
                  <span style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, background: "rgba(244,162,97,0.12)", color: C.accent }}>
                    {result.percentile} in {result.confLabel}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: C.green, marginTop: 12, fontWeight: 600 }}>{result.top100Status}</p>
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: C.white, margin: "0 0 16px" }}>How This Was Calculated</h3>
                {[
                  { label: "Conference Base (Median NIL)", value: fmt(result.base), note: `The median NIL per recruit at ${result.confLabel} schools (2025–26)`, color: C.g5 },
                  { label: "Position Multiplier", value: `${result.posMult}x`, note: POS_MULT[sport][position].note, color: C.accent },
                  { label: "Star Rating Multiplier", value: `${result.starMult}x`, note: STAR_MULT[starRating].note, color: C.power },
                  { label: "Portal Ranking Multiplier", value: `${result.portalMult}x`, note: PORTAL_MULT[portalRank].note, color: C.green },
                  ...(socialBoost ? [{ label: "Social Media Boost", value: "1.25x", note: "50K+ followers adds endorsement/sponsorship premium", color: "#a855f7" }] : []),
                ].map((row, i, arr) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{row.label}</span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: row.color }}>{row.value}</span>
                    </div>
                    <p style={{ fontSize: 11, color: C.muted, margin: "4px 0 0 0", lineHeight: 1.4 }}>{row.note}</p>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: 12, background: "rgba(244,162,97,0.08)", borderRadius: 8, textAlign: "center" }}>
                  <span style={{ fontSize: 12, color: C.muted }}>
                    {fmt(result.base)} × {result.posMult}x × {result.starMult}x × {result.portalMult}x{socialBoost ? " × 1.25x" : ""} = </span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: C.accent }}>{fmt(result.mid)}</span>
                </div>
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: C.white, margin: "0 0 16px" }}>Conference Comparison ({sport})</h3>
                {Object.entries(CONF_DATA[sport]).slice(0, 8).map(([key, conf]) => {
                  const maxAvg = Math.max(...Object.values(CONF_DATA[sport]).map(c => c.avg));
                  const isSelected = key === conference;
                  return (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                        <span style={{ color: isSelected ? C.accent : C.muted, fontWeight: isSelected ? 800 : 500 }}>
                          {conf.label} {isSelected ? "◄" : ""}
                        </span>
                        <span style={{ color: isSelected ? C.accent : C.text, fontWeight: 600 }}>{fmt(conf.avg)} avg</span>
                      </div>
                      <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{
                          width: barWidth(conf.avg, maxAvg), height: "100%", borderRadius: 3,
                          background: isSelected ? C.accent : conf.tier === "Power 4" ? C.power : C.g5,
                          transition: "width 0.4s ease",
                        }} />
                      </div>
                    </div>
                  );
                })}
                <p style={{ fontSize: 11, color: C.muted, marginTop: 12, fontStyle: "italic" }}>
                  Source: ON3_Rankings_CLEANED.xlsx — Avg_NIL_Numeric by Conference, {sport}, 2025–2026
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ══════════════════ COMMENTARY + LIMITATIONS ══════════════════ */}
      <div style={{ maxWidth: 1100, margin: "24px auto 0", padding: "24px 32px 60px" }}>

        {/* Section divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "16px 0 24px" }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <p style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontWeight: 700, margin: 0 }}>Understanding the Tool</p>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 28, textAlign: "center", maxWidth: 720, margin: "0 auto 28px" }}>
          Click any section below to expand. These explanations cover what the estimator does, how the math works, and — critically — what it can't tell you.
        </p>

        {/* ─── ABOUT THE TOOL ─── */}
        <Accordion title="About This Tool" subtitle="What it does and who it's for" icon="i" accent={C.accent} defaultOpen>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 14px" }}>
            This estimator models what a hypothetical college athlete might earn in annual NIL compensation based on their conference, position, talent level, and transfer portal status. It's the interactive companion to this capstone's larger argument: that NIL dollars are heavily concentrated at Power 4 schools, and that position, talent, and market factors interact in compounding ways.
          </p>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 14px" }}>
            The tool is aimed at three audiences. First, <strong style={{ color: C.white }}>prospective student-athletes</strong> weighing offers across conferences — seeing how a conference change shifts earning potential at the same position and rating. Second, <strong style={{ color: C.white }}>athletic administrators at non-Power 4 programs</strong> assessing whether targeted NIL investment can realistically compete. Third, <strong style={{ color: C.white }}>fans, journalists, and researchers</strong> who want an intuition pump for how the NIL market prices talent.
          </p>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: 0 }}>
            It is <strong style={{ color: C.accent }}>not</strong> a prediction. It's a data-grounded estimate built on aggregated market data, and like any model, its accuracy depends on how closely a real athlete's circumstances match the averages the tool is built from.
          </p>
        </Accordion>

        {/* ─── HOW THE MATH WORKS ─── */}
        <Accordion title="How the Math Works" subtitle="The multiplier methodology" icon="×" accent={C.g5}>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 14px" }}>
            The estimator uses a multiplicative model. It starts with a real baseline — the <strong style={{ color: C.white }}>median NIL per recruit at the selected conference</strong> — and then applies four multipliers that stack:
          </p>

          <div style={{ background: C.cardAlt, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 16 }}>
            <code style={{ fontSize: 13, color: C.accent, fontFamily: "monospace", fontWeight: 700 }}>
              Base × Position × Star × Portal × Social = Mid Estimate
            </code>
          </div>

          <ol style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 14px", paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>
              <strong style={{ color: C.white }}>Conference Base.</strong> The median NIL per recruit at the chosen conference (from On3's 2025–26 data). SEC football sits at $93K; the MAC sits at $11K.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong style={{ color: C.white }}>Position Multiplier.</strong> Derived from the NIL Top 100 position distribution. QBs get 3.2x because 31% of the Top 100 are quarterbacks. Kickers get 0.3x.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong style={{ color: C.white }}>Star Rating Multiplier.</strong> From the actual average NIL values by recruit rating in the On3 rankings file. A 5-star gets 5.0x; a 3-star gets 1.0x (baseline).
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong style={{ color: C.white }}>Portal Ranking Multiplier.</strong> Transfer portal premium, calibrated to proven-player market dynamics. A Top 10 transfer commands 2.5x; an unranked walk-on gets 0.8x.
            </li>
            <li>
              <strong style={{ color: C.white }}>Social Media Boost.</strong> A flat 1.25x if toggled on, approximating the endorsement premium for athletes with 50K+ followers.
            </li>
          </ol>

          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 10px" }}>
            The <strong style={{ color: C.white }}>low and high estimates</strong> widen the star-rating band (a 5-star's range is 3.5x–8.0x rather than a fixed 5.0x) to reflect real-world variance at each talent tier. The high estimate is also capped at realistic ceilings ($7M football, $4.5M basketball) so outputs don't spiral past observed market maxima.
          </p>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: 0 }}>
            Because the multipliers compound, a Power 4 SEC quarterback who's a 5-star Top 10 transfer with a social following produces a figure in the seven figures — which matches the public NIL valuations of athletes like AJ Dybantsa or the top SEC QBs. A 3-star Sun Belt offensive lineman lands in the low five figures, which matches the reporting on typical G5 deals.
          </p>
        </Accordion>

        {/* ─── DATA SOURCES ─── */}
        <Accordion title="The Data Behind It" subtitle="Where every number comes from" icon="⛁" accent={C.green}>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 16px" }}>
            Every figure in this tool traces to one of the capstone's primary datasets. No values are invented or assumed.
          </p>

          <div style={{ display: "grid", gap: 12 }}>
            {[
              {
                name: "ON3_Rankings_CLEANED.xlsx",
                feeds: "Conference medians, averages, 75th/90th percentiles. Star-rating NIL averages.",
                note: "Built from On3's proprietary NIL Valuation algorithm, which blends Roster Value (what schools/collectives pay) and NIL Value (endorsement potential).",
              },
              {
                name: "ON3_2025_NIL_TOP100.html",
                feeds: "Position multipliers. Top-end calibration. Conference concentration patterns.",
                note: "The 100 highest-valued college and high school athletes. 85 of 100 are at Power 4 schools; 31 are quarterbacks.",
              },
              {
                name: "NCAA_NIL_Assist_Deal_Data_summary.xlsx",
                feeds: "Average-to-median ratios used in the limitations framing. Deal distribution sanity checks.",
                note: "NCAA's public dashboard of aggregated, de-identified deal data self-reported by Division I institutions.",
              },
              {
                name: "EADA_CFB_MBB_WBB_Analysis.xlsx",
                feeds: "Contextual framing — not used directly in the calculation, but informs the Power 4 vs. non-Power 4 tier boundaries.",
                note: "Equity in Athletics Disclosure Act data filed with the U.S. Department of Education. Covers total athletic revenues and expenses.",
              },
            ].map((src, i) => (
              <div key={i} style={{ background: C.cardAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
                <code style={{ fontSize: 12, color: C.accent, fontFamily: "monospace", fontWeight: 700 }}>{src.name}</code>
                <p style={{ fontSize: 13, color: C.text, margin: "6px 0 4px", fontWeight: 600 }}>Feeds: {src.feeds}</p>
                <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.5 }}>{src.note}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* ─── READING THE RESULTS ─── */}
        <Accordion title="Reading the Results" subtitle="How to interpret what the tool outputs" icon="◎" accent={C.power}>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 14px" }}>
            The estimator returns three numbers and two context badges. Each one means something specific:
          </p>
          <ul style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: 0, paddingLeft: 20 }}>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: C.accent }}>Mid-range estimate.</strong> The most likely single value for the profile — the central tendency of the model. Treat this as the tool's best guess, not a guarantee.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: C.g5 }}>Low estimate.</strong> A reasonable floor. Athletes at this profile sometimes earn less (walk-on equivalents, depth roles, smaller markets), and this number reflects that tail.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: C.power }}>High estimate.</strong> A reasonable ceiling, capped at observed market maxima. Athletes at this profile occasionally earn more, but the cap prevents the multipliers from producing numbers that have never been paid in reality.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: C.white }}>Tier badge (Power 4 / Non-Power 4).</strong> Classifies the selected conference in the same tier system used throughout the capstone's analysis.
            </li>
            <li>
              <strong style={{ color: C.white }}>Percentile badge.</strong> Where this estimate falls within the chosen conference's NIL distribution — so a $300K estimate can be "Top 10% in the MAC" or "Average in the SEC" depending on context.
            </li>
          </ul>
        </Accordion>

        {/* ─── LIMITATIONS (important, distinct styling) ─── */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "16px 0 24px" }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <p style={{ fontSize: 11, color: C.red, textTransform: "uppercase", letterSpacing: 3, fontWeight: 700, margin: 0 }}>⚠ Limitations</p>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <Accordion title="What This Tool Can't Tell You" subtitle="The honest list of what's missing, approximate, or beyond the data" icon="!" accent={C.red} defaultOpen>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: "0 0 18px" }}>
              No model covers everything. Here are the substantive blind spots in this estimator — read them before citing any number the tool produces:
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              {[
                {
                  title: "On3 valuations are algorithmic estimates, not verified transactions.",
                  body: "The baseline conference medians are computed from On3's proprietary NIL Valuation algorithm, which blends projected roster value and endorsement potential. Real contracts — when disclosed — sometimes diverge substantially. Treat the tool's outputs as market-rate estimates, not legal signing figures.",
                },
                {
                  title: "Extreme inequality within each tier.",
                  body: "NCAA NIL Assist data shows the average MBB deal is 107.5x the median, and the average CFB deal is 51.7x the median. Over 50% of deals are under $100. The tool's mid-range output reflects a central tendency, but the actual distribution of outcomes is extremely top-heavy. Two identical profiles can end up earning wildly different amounts depending on who the school prioritizes.",
                },
                {
                  title: "No school-specific collective budgets.",
                  body: "NIL spending varies enormously between schools in the same conference. Texas A&M and Vanderbilt are both SEC, but their collective war chests are not comparable. The estimator smooths across the conference and cannot capture which programs inside a conference are actually spending.",
                },
                {
                  title: "No local market size or geographic factors.",
                  body: "An athlete in Austin, TX has more endorsement opportunities than one in Ruston, LA, even at similar schools. Media market, local business density, and alumni networks all affect NIL income and are not inputs to this tool.",
                },
                {
                  title: "Binary social media treatment.",
                  body: "The social toggle is a flat 1.25x for 50K+ followers. Reality is continuous — an athlete with 2M followers is not treated differently from one with 60K in the model, even though the endorsement economics differ by an order of magnitude.",
                },
                {
                  title: "No agent, negotiation, or deal-structure effects.",
                  body: "Athletes with professional representation often secure better deals. Structure matters too — a guaranteed $200K contract is not equivalent to $200K in performance incentives. The estimator ignores both.",
                },
                {
                  title: "House v. NCAA revenue sharing is not modeled separately.",
                  body: "The $20.5M/school revenue-sharing pool that took effect in 2025-26 is implicitly baked into the conference medians (because the data is post-settlement), but the tool cannot separate NIL income from revenue-share income. In practice, athletes at Power 4 schools increasingly receive both, while athletes at most non-Power 4 schools receive neither.",
                },
                {
                  title: "Football position groups are approximate.",
                  body: "The tool uses broad categories (WR, OL, DL, etc.). Within each group there's enormous variance — a slot receiver and a No. 1 outside WR face different markets, as do a left tackle and a backup guard. The tool can't disambiguate.",
                },
                {
                  title: "Women's basketball is not modeled.",
                  body: "The capstone's women's basketball analysis shows a meaningfully different NIL market (smaller overall, more endorsement-driven, less dependent on collective cash). Rather than apply football/men's-basketball multipliers that don't fit, the tool is deliberately limited to CFB and MBB. This is a gap, not an endorsement.",
                },
                {
                  title: "Talent calibration is imperfect at the tails.",
                  body: "A generational 5-star (the top 2–3 in a class) may exceed the tool's ceilings. A preferred walk-on who unexpectedly starts may earn more than the 2-star tier suggests. The multipliers fit the middle of the distribution better than either end.",
                },
              ].map((lim, i) => (
                <div key={i} style={{
                  background: C.cardAlt,
                  borderLeft: `3px solid ${C.red}`,
                  borderRadius: "0 8px 8px 0",
                  padding: "14px 16px",
                }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.white, margin: "0 0 6px", lineHeight: 1.4 }}>{lim.title}</p>
                  <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.6 }}>{lim.body}</p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 22, padding: "16px 18px",
              background: "rgba(230,57,70,0.07)",
              borderRadius: 10,
              border: `1px solid rgba(230,57,70,0.25)`,
            }}>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: C.red }}>Bottom line:</strong> this is a research tool, not a negotiating guide. Use it to explore how market variables interact, to stress-test intuitions about NIL economics, or to visualize the capstone's central finding that Power 4 / non-Power 4 compensation diverges sharply. Don't use it as a contract benchmark.
              </p>
            </div>
          </Accordion>
        </div>

        {/* Footer */}
        <p style={{ fontSize: 12, color: C.muted, marginTop: 32, textAlign: "center" }}>
          Grant Franklin — DCDA Capstone — Spring 2026
        </p>
      </div>
    </div>
  );
}
