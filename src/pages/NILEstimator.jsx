import React, { useState } from "react";

// Base NIL values by sport (Power 4 average, 3-star recruit baseline)
const BASE_NIL = {
  Football: 45000,
  Basketball: 35000,
};

// Position multipliers
const POSITION_MULT = {
  Football: {
    QB: { mult: 2.5, label: "Quarterback", note: "Face of the program. Commands 2-3x average." },
    RB: { mult: 1.5, label: "Running Back", note: "Offensive backbone. 10 of Top 100 recruits." },
    WR: { mult: 1.8, label: "Wide Receiver", note: "Skill positions most marketable. 20+ of Top 100." },
    OL: { mult: 0.8, label: "Offensive Lineman", note: "Critical but less marketable. Elite tackles: 1.2x" },
    DL: { mult: 1.2, label: "Defensive Lineman", note: "Pass rushers premium. Star talent: 1.5-2.0x" },
    LB: { mult: 0.9, label: "Linebacker", note: "Defensive anchor. Premium for elite playmakers." },
    DB: { mult: 1.3, label: "Defensive Back", note: "Coverage specialists valued. 15+ of Top 100." },
    TE: { mult: 1.4, label: "Tight End", note: "Elite TE scarce. Top prospects: 2.0-2.5x baseline." },
  },
  Basketball: {
    PG: { mult: 1.7, label: "Point Guard", note: "Floor general. Premium for Elite one-and-dones." },
    SG: { mult: 1.4, label: "Shooting Guard", note: "Scorers command premium NIL value." },
    SF: { mult: 1.5, label: "Small Forward", note: "Versatile wings are highly valued. 7 of Top 100." },
    PF: { mult: 1.6, label: "Power Forward", note: "11 of Top 100 - highest basketball representation." },
    C: { mult: 1.3, label: "Center", note: "Size commands attention, especially elite bigs." },
  },
};

// Star rating multipliers
const STAR_MULT = {
  "5-Star": { mult: 5.0, range: [3.5, 8.0], note: "Elite recruits. Top 30-32 nationally. NIL $300K–$2M+" },
  "High 4-Star": { mult: 2.8, range: [2.0, 4.0], note: "Top 100-150 nationally. NIL $150K–$500K" },
  "4-Star": { mult: 2.0, range: [1.4, 2.8], note: "Top 300 nationally. NIL $80K–$250K" },
  "Low 4-Star": { mult: 1.4, range: [1.0, 2.0], note: "Fringe 4-star. NIL $40K–$150K" },
  "3-Star": { mult: 1.0, range: [0.7, 1.4], note: "Baseline recruit. NIL $10K–$60K at Power 4" },
  "2-Star": { mult: 0.5, range: [0.3, 0.8], note: "Walk-on/low scholarship. NIL $2K–$15K" },
};

// Transfer portal premium
const PORTAL_MULT = {
  "Top 10 Transfer": { mult: 2.5, note: "Elite proven talent. Programs will pay top dollar." },
  "Top 25 Transfer": { mult: 2.0, note: "High-demand transfer. Multiple P4 offers likely." },
  "Top 50 Transfer": { mult: 1.6, note: "Strong transfer target. Competitive bidding expected." },
  "Top 100 Transfer": { mult: 1.3, note: "Solid transfer. Good leverage at destination." },
  "Top 200 Transfer": { mult: 1.1, note: "Contributing transfer. Moderate NIL bump expected." },
  "Unranked / Walk-on": { mult: 0.8, note: "Depth transfer. Minimal NIL premium over baseline." },
};

const COLORS = {
  bg: "#0b0e14",
  card: "#12161f",
  cardAlt: "#161b27",
  border: "#1e2736",
  accent: "#f4a261",
  power: "#e63946",
  g5: "#457b9d",
  text: "#e2e8f0",
  muted: "#7a8ba5",
  white: "#fff",
  green: "#2ec4b6",
  red: "#e63946",
  gold: "#f4a261",
};

const fmt = (n) => {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

export default function NILEstimator() {
  const [sport, setSport] = useState("Football");
  const [position, setPosition] = useState("QB");
  const [starRating, setStarRating] = useState("4-Star");
  const [transferStatus, setTransferStatus] = useState("High School");

  // Calculate NIL estimate
  const calculateNIL = () => {
    const base = BASE_NIL[sport];
    const posMult = POSITION_MULT[sport][position]?.mult || 1.0;
    const starMult = STAR_MULT[starRating]?.mult || 1.0;
    const transferMult = transferStatus === "High School" ? 1.0 : PORTAL_MULT[transferStatus]?.mult || 1.0;

    return Math.round(base * posMult * starMult * transferMult);
  };

  const estimate = calculateNIL();

  // Get position info
  const posInfo = POSITION_MULT[sport][position];
  const starInfo = STAR_MULT[starRating];
  const transferInfo = transferStatus === "High School" ? null : PORTAL_MULT[transferStatus];

  const T = COLORS;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, padding: "40px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>NIL Estimator Tool</h1>
        <p style={{ fontSize: 14, color: T.muted, textAlign: "center", marginBottom: 40 }}>
          Data-driven estimates based on real NIL deals from top recruits and transfers
        </p>

        {/* Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
          {/* Sport Selector */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, textTransform: "uppercase" }}>
              Sport
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Football", "Basketball"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSport(s);
                    setPosition(Object.keys(POSITION_MULT[s])[0]);
                  }}
                  style={{
                    padding: "12px 16px",
                    background: sport === s ? T.accent : T.card,
                    border: `1px solid ${sport === s ? T.accent : T.border}`,
                    color: sport === s ? "#000" : T.text,
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, textTransform: "uppercase" }}>
              Star Rating
            </label>
            <select
              value={starRating}
              onChange={(e) => setStarRating(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: T.card,
                border: `1px solid ${T.border}`,
                color: T.text,
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {Object.keys(STAR_MULT).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, textTransform: "uppercase" }}>
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: T.card,
                border: `1px solid ${T.border}`,
                color: T.text,
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {Object.entries(POSITION_MULT[sport]).map(([key, val]) => (
                <option key={key} value={key}>
                  {key} - {val.label}
                </option>
              ))}
            </select>
          </div>

          {/* Transfer Status */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, textTransform: "uppercase" }}>
              Player Status
            </label>
            <select
              value={transferStatus}
              onChange={(e) => setTransferStatus(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: T.card,
                border: `1px solid ${T.border}`,
                color: T.text,
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              <option value="High School">High School Recruit</option>
              {Object.keys(PORTAL_MULT).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Estimate Card */}
        <div
          style={{
            background: T.cardAlt,
            border: `2px solid ${T.accent}`,
            borderRadius: 12,
            padding: 32,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 13, color: T.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Estimated NIL Deal Value
          </p>
          <h2 style={{ fontSize: 48, fontWeight: 700, color: T.accent, margin: "8px 0 20px 0" }}>
            {fmt(estimate)}
          </h2>
          <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.6 }}>
            Based on {sport} position ({POSITION_MULT[sport][position]?.label}), {starRating} rating, and {transferStatus} status
          </p>
        </div>

        {/* Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
          {/* Position Info */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Position</p>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{posInfo?.label}</p>
            <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.5 }}>{posInfo?.note}</p>
            <p style={{ fontSize: 12, color: T.accent, marginTop: 8, fontWeight: 600 }}>+{((posInfo?.mult - 1) * 100).toFixed(0)}% from base</p>
          </div>

          {/* Star Rating Info */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Star Rating</p>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{starRating}</p>
            <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.5 }}>{starInfo?.note}</p>
            <p style={{ fontSize: 12, color: T.accent, marginTop: 8, fontWeight: 600 }}>
              {fmt(starInfo?.range[0] * BASE_NIL[sport])} – {fmt(starInfo?.range[1] * BASE_NIL[sport])}
            </p>
          </div>

          {/* Transfer Info */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Player Status</p>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{transferStatus}</p>
            <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.5 }}>
              {transferInfo?.note || "Baseline NIL pricing applies to most high school recruits."}
            </p>
            {transferInfo && <p style={{ fontSize: 12, color: T.accent, marginTop: 8, fontWeight: 600 }}>+{((transferInfo.mult - 1) * 100).toFixed(0)}% from base</p>}
          </div>
        </div>

        {/* Calculation Breakdown */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: 20, marginBottom: 32 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>How the Estimate Works</h3>
          <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.8 }}>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: T.text }}>Base NIL ({sport}):</strong> {fmt(BASE_NIL[sport])} (3-star Power 4 baseline)
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: T.text }}>Position Multiplier:</strong> ×{(POSITION_MULT[sport][position]?.mult || 1).toFixed(2)}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: T.text }}>Star Rating Multiplier:</strong> ×{(STAR_MULT[starRating]?.mult || 1).toFixed(2)}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: T.text }}>Transfer Status Multiplier:</strong> ×{(transferStatus === "High School" ? 1 : (PORTAL_MULT[transferStatus]?.mult || 1)).toFixed(2)}
            </div>
            <div style={{ paddingTop: 12, borderTop: `1px solid ${T.border}`, marginTop: 12 }}>
              <strong style={{ color: T.accent, fontSize: 13 }}>Estimated Deal Value: {fmt(estimate)}</strong>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div style={{ background: T.cardAlt, border: `1px solid ${T.border}`, borderRadius: 8, padding: 20, marginBottom: 32 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Key Insights</h3>
          <ul style={{ fontSize: 12, color: T.muted, lineHeight: 2, paddingLeft: 20 }}>
            <li>
              <strong style={{ color: T.text }}>Position Premium:</strong> QBs, WRs, and DBs command 1.5–2.5x baseline. Linemen are 0.8–1.2x.
            </li>
            <li>
              <strong style={{ color: T.text }}>Star Ratings Drive Value:</strong> 5-stars average ~5x 3-star baseline; 2-stars ~0.5x.
            </li>
            <li>
              <strong style={{ color: T.text }}>Transfer Portal Premium:</strong> Proven talent can earn 2.5x more than high school recruits.
            </li>
            <li>
              <strong style={{ color: T.text }}>Power 4 Advantage:</strong> P4 schools pay 1.5–2x more NIL than G5 programs on average.
            </li>
            <li>
              <strong style={{ color: T.text }}>Market Reality:</strong> This tool estimates median deals. Elite talent often exceeds projections significantly.
            </li>
          </ul>
        </div>

        {/* Data Note */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 16,
            borderTop: `1px solid ${T.border}`,
            fontSize: 11,
            color: T.muted,
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          Data: On3 2026 Transfer Portal Rankings, On3 2026 Team Rankings (NIL Avg + blue-chip%), ON3 Conference Tier Lookup
          <br />
          Grant Franklin · DCDA Capstone · Spring 2026
        </div>
      </div>
    </div>
  );
}
