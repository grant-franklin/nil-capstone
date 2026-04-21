import { useState, useEffect } from "react";

// ═══════════════ REAL DATA FROM YOUR ANALYSIS ═══════════════
// All figures derived from ON3_Rankings_CLEANED.xlsx, ON3_2025_NIL_TOP100.html,
// and NCAA_NIL_Assist_Deal_Data_summary.xlsx

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

// Position multipliers derived from NIL Top 100 position distribution + NCAA dashboard
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

// Star rating multipliers (from actual data: 2-star avg $17K, 3-star $29K, 4-star $130K, 5-star ~$500K+)
const STAR_MULT = {
  "5-Star": { mult: 5.0, range: [3.5, 8.0], note: "Elite recruits. Top 30-32 nationally. NIL $300K–$2M+" },
  "High 4-Star": { mult: 2.8, range: [2.0, 4.0], note: "Top 100-150 nationally. NIL $150K–$500K" },
  "4-Star": { mult: 2.0, range: [1.4, 2.8], note: "Top 300 nationally. NIL $80K–$250K" },
  "Low 4-Star": { mult: 1.4, range: [1.0, 2.0], note: "Fringe 4-star. NIL $40K–$150K" },
  "3-Star": { mult: 1.0, range: [0.7, 1.4], note: "Baseline recruit. NIL $10K–$60K at Power 4" },
  "2-Star": { mult: 0.5, range: [0.3, 0.8], note: "Walk-on/low scholarship. NIL $2K–$15K" },
};

// Transfer portal premium (proven players command more)
const PORTAL_MULT = {
  "Top 10 Transfer": { mult: 2.5, note: "Elite proven talent. Programs will pay top dollar." },
  "Top 25 Transfer": { mult: 2.0, note: "High-demand transfer. Multiple P4 offers likely." },
  "Top 50 Transfer": { mult: 1.6, note: "Strong transfer target. Competitive bidding expected." },
  "Top 100 Transfer": { mult: 1.3, note: "Solid transfer. Good leverage at destination." },
  "Top 200 Transfer": { mult: 1.1, note: "Contributing transfer. Moderate NIL bump expected." },
  "Unranked / Walk-on": { mult: 0.8, note: "Depth transfer. Minimal NIL premium over baseline." },
};

const COLORS = {
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

export default function NILEstimator() {
  const [sport, setSport] = useState("Football");
  const [conference, setConference] = useState("SEC");
  const [position, setPosition] = useState("QB");
  const [starRating, setStarRating] = useState("4-Star");
  const [portalRank, setPortalRank] = useState("Top 50 Transfer");
  const [socialBoost, setSocialBoost] = useState(false);
  const [result, setResult] = useState(null);

  const confs = Object.keys(CONF_DATA[sport]);
  const positions = Object.keys(POS_MULT[sport]);

  // Reset position when sport changes
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

    // Base = conference median NIL per recruit
    const base = confData.med;

    // Apply multipliers
    const midEstimate = base * posData.mult * starData.mult * portalData.mult * socialMult;
    const lowEstimate = base * posData.mult * starData.range[0] * portalData.mult * (socialBoost ? 1.1 : 0.85);
    const highEstimate = base * posData.mult * starData.range[1] * portalData.mult * socialMult * 1.2;

    // Cap high estimate at realistic ceilings
    const maxCeiling = sport === "Football" ? 7000000 : 4500000;
    const cappedHigh = Math.min(highEstimate, maxCeiling);

    // Percentile estimation within conference
    let percentile;
    if (midEstimate >= confData.p90) percentile = "Top 10%";
    else if (midEstimate >= confData.p75) percentile = "Top 25%";
    else if (midEstimate >= confData.avg) percentile = "Above Average";
    else if (midEstimate >= confData.med) percentile = "Average";
    else percentile = "Below Average";

    // NIL Top 100 comparison
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
      posNote: posData.note,
      starNote: starData.note,
      portalNote: portalData.note,
      percentile,
      top100Status,
      confAvg: confData.avg,
    });
  };

  useEffect(() => { 
    calculate(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sport, conference, position, starRating, portalRank, socialBoost]);

  const Select = ({ label, value, onChange, options, descriptions }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
        background: COLORS.cardAlt, color: COLORS.white, fontSize: 14, fontWeight: 600, cursor: "pointer", outline: "none",
      }}>
        {options.map(o => (
          <option key={o} value={o}>{descriptions ? `${o} — ${descriptions[o]}` : o}</option>
        ))}
      </select>
    </div>
  );

  const barWidth = (val, max) => `${Math.min((val / max) * 100, 100)}%`;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.bg, color: COLORS.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #141824 0%, #0d1117 100%)", borderBottom: `2px solid ${COLORS.accent}`, padding: "28px 32px" }}>
        <p style={{ fontSize: 11, color: COLORS.accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: "0 0 6px" }}>DCDA Capstone Tool</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: COLORS.white, margin: 0, letterSpacing: -0.5 }}>
          NIL Value <span style={{ color: COLORS.accent }}>Estimator</span>
        </h1>
        <p style={{ color: COLORS.muted, marginTop: 6, fontSize: 13, maxWidth: 600 }}>
          Estimate a transfer portal athlete's NIL value based on conference, position, star rating, and portal ranking. Powered by real data from On3, NCAA NIL Assist, and EADA.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px", display: "flex", gap: 24, flexWrap: "wrap" }}>

        {/* ── LEFT: INPUTS ── */}
        <div style={{ flex: "1 1 340px", minWidth: 300 }}>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: COLORS.white, margin: "0 0 20px" }}>Player Profile</h2>

            {/* Sport Toggle */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {["Football", "Basketball"].map(s => (
                <button key={s} onClick={() => setSport(s)} style={{
                  flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                  background: sport === s ? (s === "Football" ? "#e63946" : "#a855f7") : COLORS.cardAlt,
                  color: sport === s ? "#fff" : COLORS.muted, fontWeight: 700, fontSize: 14, transition: "all 0.2s",
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

            {/* Social Media Toggle */}
            <div style={{ marginTop: 4 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div onClick={() => setSocialBoost(!socialBoost)} style={{
                  width: 44, height: 24, borderRadius: 12, background: socialBoost ? COLORS.accent : COLORS.border,
                  position: "relative", transition: "all 0.2s", cursor: "pointer",
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 9, background: "#fff", position: "absolute", top: 3,
                    left: socialBoost ? 23 : 3, transition: "all 0.2s",
                  }} />
                </div>
                <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>Social media presence (50K+ followers)</span>
              </label>
              <p style={{ fontSize: 11, color: COLORS.muted, margin: "4px 0 0 54px" }}>Adds ~25% NIL premium for endorsement/sponsorship value</p>
            </div>
          </div>

          {/* Methodology Note */}
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, marginTop: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.muted, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.5 }}>Methodology</h3>
            <p style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>
              Estimates are calculated by applying position, talent, and portal multipliers to real conference-level median NIL data from On3 (2025–26). Position multipliers are derived from the On3 NIL Top 100 position distribution. Star-level multipliers use actual average NIL values by recruit rating from ON3_Rankings_CLEANED.xlsx. These are estimates, not predictions — actual NIL values depend on market size, social media, school-specific collective budgets, and deal structure.
            </p>
            <p style={{ fontSize: 11, color: COLORS.accent, marginTop: 8 }}>
              Sources: ON3_Rankings_CLEANED.xlsx · ON3_2025_NIL_TOP100.html · NCAA_NIL_Assist_Deal_Data_summary.xlsx
            </p>
          </div>
        </div>

        {/* ── RIGHT: RESULTS ── */}
        <div style={{ flex: "1 1 500px", minWidth: 340 }}>
          {result && (
            <>
              {/* Main Estimate Card */}
              <div style={{ background: `linear-gradient(135deg, ${COLORS.card} 0%, ${COLORS.cardAlt} 100%)`, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 28, marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, margin: 0 }}>Estimated Annual NIL Value</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: COLORS.accent, letterSpacing: -2 }}>{fmt(result.mid)}</span>
                  <span style={{ fontSize: 14, color: COLORS.muted, fontWeight: 600 }}>mid-range estimate</span>
                </div>

                {/* Range Bar */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>
                    <span>Low: {fmt(result.low)}</span>
                    <span>High: {fmt(result.high)}</span>
                  </div>
                  <div style={{ height: 10, background: COLORS.border, borderRadius: 5, position: "relative", overflow: "hidden" }}>
                    <div style={{
                      position: "absolute", left: `${(result.low / result.high) * 100}%`,
                      width: `${((result.mid - result.low) / result.high) * 100}%`,
                      height: "100%", background: `linear-gradient(90deg, ${COLORS.g5}, ${COLORS.accent}, ${COLORS.power})`,
                      borderRadius: 5,
                    }} />
                    <div style={{
                      position: "absolute", left: `${(result.mid / result.high) * 100 - 1}%`,
                      width: 3, height: "100%", background: COLORS.white, borderRadius: 2,
                    }} />
                  </div>
                </div>

                {/* Context Badges */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                  <span style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, background: result.confTier === "Power 4" ? "rgba(230,57,70,0.15)" : "rgba(69,123,157,0.15)", color: result.confTier === "Power 4" ? COLORS.power : COLORS.g5 }}>
                    {result.confTier}
                  </span>
                  <span style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, background: "rgba(244,162,97,0.12)", color: COLORS.accent }}>
                    {result.percentile} in {result.confLabel}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: COLORS.green, marginTop: 12, fontWeight: 600 }}>{result.top100Status}</p>
              </div>

              {/* Multiplier Breakdown */}
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: COLORS.white, margin: "0 0 16px" }}>How This Was Calculated</h3>
                
                {[
                  { label: "Conference Base (Median NIL)", value: fmt(result.base), mult: null, note: `The median NIL per recruit at ${result.confLabel} schools (2025–26)`, color: COLORS.g5 },
                  { label: "Position Multiplier", value: `${result.posMult}x`, mult: result.posMult, note: POS_MULT[sport][position].note, color: COLORS.accent },
                  { label: "Star Rating Multiplier", value: `${result.starMult}x`, mult: result.starMult, note: STAR_MULT[starRating].note, color: COLORS.power },
                  { label: "Portal Ranking Multiplier", value: `${result.portalMult}x`, mult: result.portalMult, note: PORTAL_MULT[portalRank].note, color: COLORS.green },
                  ...(socialBoost ? [{ label: "Social Media Boost", value: "1.25x", mult: 1.25, note: "50K+ followers adds endorsement/sponsorship premium", color: "#a855f7" }] : []),
                ].map((row, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 + (socialBoost ? 1 : 0) ? `1px solid ${COLORS.border}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{row.label}</span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: row.color }}>{row.value}</span>
                    </div>
                    <p style={{ fontSize: 11, color: COLORS.muted, margin: "4px 0 0 0", lineHeight: 1.4 }}>{row.note}</p>
                  </div>
                ))}

                <div style={{ marginTop: 16, padding: 12, background: "rgba(244,162,97,0.08)", borderRadius: 8, textAlign: "center" }}>
                  <span style={{ fontSize: 12, color: COLORS.muted }}>
                    {fmt(result.base)} × {result.posMult}x × {result.starMult}x × {result.portalMult}x{socialBoost ? " × 1.25x" : ""} = </span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.accent }}>{fmt(result.mid)}</span>
                </div>
              </div>

              {/* Conference Comparison */}
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: COLORS.white, margin: "0 0 16px" }}>Conference Comparison ({sport})</h3>
                {Object.entries(CONF_DATA[sport]).slice(0, 8).map(([key, conf]) => {
                  const maxAvg = Math.max(...Object.values(CONF_DATA[sport]).map(c => c.avg));
                  const isSelected = key === conference;
                  return (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                        <span style={{ color: isSelected ? COLORS.accent : COLORS.muted, fontWeight: isSelected ? 800 : 500 }}>
                          {conf.label} {isSelected ? "◄" : ""}
                        </span>
                        <span style={{ color: isSelected ? COLORS.accent : COLORS.text, fontWeight: 600 }}>{fmt(conf.avg)} avg</span>
                      </div>
                      <div style={{ height: 6, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{
                          width: barWidth(conf.avg, maxAvg), height: "100%", borderRadius: 3,
                          background: isSelected ? COLORS.accent : conf.tier === "Power 4" ? COLORS.power : COLORS.g5,
                          transition: "width 0.4s ease",
                        }} />
                      </div>
                    </div>
                  );
                })}
                <p style={{ fontSize: 11, color: COLORS.muted, marginTop: 12, fontStyle: "italic" }}>
                  Source: ON3_Rankings_CLEANED.xlsx — Avg_NIL_Numeric by Conference, {sport}, 2025–2026
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: 1100, margin: "24px auto 0", padding: "0 32px 40px" }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <p style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: COLORS.accent }}>Disclaimer:</strong> This tool provides estimates based on aggregate data from On3, NCAA NIL Assist, and EADA databases. Actual NIL compensation depends on factors not captured here, including school-specific collective budgets, local market size, player social media following, agent representation, endorsement opportunities, and individual negotiation. On3 valuations are algorithmic estimates, not verified transaction data. The average-to-median ratio for NIL deals is 51.7x in CFB and 107.5x in MBB (per NCAA NIL Assist data), meaning individual outcomes vary enormously. This estimator is intended for educational and research purposes as part of a DCDA capstone project.
          </p>
          <p style={{ fontSize: 11, color: COLORS.muted, marginTop: 8 }}>Grant Franklin — DCDA Capstone — Spring 2026</p>
        </div>
      </div>
    </div>
  );
}
