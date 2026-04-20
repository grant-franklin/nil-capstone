import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart, ReferenceLine } from "recharts";

const C = { power: "#1a3a5c", g5: "#22a065", fcs: "#d97b1e", accent: "#c0392b", bg: "#f8f6f1", card: "#fff", text: "#1a1a1a", muted: "#6b7280", border: "#e5e2db" };

const revenueData = [
  { year: 2015, power5: 100.5, g5: 33.3, fcs: 18.2, gap: 67.2 },
  { year: 2016, power5: 106.9, g5: 34.6, fcs: 18.9, gap: 72.3 },
  { year: 2017, power5: 115.5, g5: 36.4, fcs: 19.7, gap: 79.1 },
  { year: 2018, power5: 119.5, g5: 37.5, fcs: 20.3, gap: 82.0 },
  { year: 2019, power5: 116.9, g5: 36.9, fcs: 20.1, gap: 80.0 },
  { year: 2020, power5: 98.7, g5: 32.8, fcs: 17.8, gap: 65.9 },
  { year: 2021, power5: 133.1, g5: 40.1, fcs: 22.6, gap: 93.0 },
  { year: 2022, power5: 148.1, g5: 43.9, fcs: 24.5, gap: 104.2 },
  { year: 2023, power5: 161.8, g5: 46.5, fcs: 26.4, gap: 115.3 },
];

const cfbBalance = [
  { year: 2018, power: 55.5, g5: 47.9 }, { year: 2019, power: 55.0, g5: 50.1 },
  { year: 2020, power: 49.9, g5: 47.7 }, { year: 2021, power: 54.5, g5: 49.6 },
  { year: 2022, power: 56.1, g5: 48.3 }, { year: 2023, power: 56.1, g5: 48.4 },
  { year: 2024, power: 56.1, g5: 47.6 }, { year: 2025, power: 56.3, g5: 48.0 },
];

const mbbBalance = [
  { year: 2018, power: 59.8, high: 53.9, low: 51.0 },
  { year: 2019, power: 59.0, high: 55.1, low: 50.8 },
  { year: 2022, power: 59.0, high: 55.8, low: 51.0 },
  { year: 2024, power: 58.2, high: 56.6, low: 50.6 },
  { year: 2026, power: 59.2, high: 55.7, low: 50.6 },
];

const nilConf = [
  { name: "SEC", athletes: 27, nil: 34.6, color: "#c0392b" },
  { name: "Big Ten", athletes: 24, nil: 29.4, color: "#1a3a5c" },
  { name: "Big 12", athletes: 18, nil: 15.7, color: "#d4a017" },
  { name: "ACC", athletes: 15, nil: 14.2, color: "#22a065" },
  { name: "Uncommitted", athletes: 14, nil: 6.0, color: "#95a5a6" },
  { name: "Big East", athletes: 1, nil: 0, color: "#8e44ad" },
  { name: "Non-P4", athletes: 1, nil: 0, color: "#e67e22" },
];

const recruitNIL = [
  { year: 2022, p4_fb: 59, np4_fb: 48, p4_bb: 83, np4_bb: 79 },
  { year: 2023, p4_fb: 72, np4_fb: 21, p4_bb: 77, np4_bb: 117 },
  { year: 2024, p4_fb: 67, np4_fb: 15, p4_bb: 93, np4_bb: 53 },
  { year: 2025, p4_fb: 68, np4_fb: 14, p4_bb: 350, np4_bb: 176 },
  { year: 2026, p4_fb: 57, np4_fb: 13, p4_bb: 368, np4_bb: 46 },
];

const dealData = [
  { sport: "CFB Early", avg: 1582, median: 150, ratio: 10.5 },
  { sport: "CFB Post", avg: 4752, median: 92, ratio: 51.7 },
  { sport: "MBB Early", avg: 3897, median: 500, ratio: 7.8 },
  { sport: "MBB Post", avg: 8708, median: 81, ratio: 107.5 },
  { sport: "WBB Early", avg: 1006, median: 100, ratio: 10.1 },
  { sport: "WBB Post", avg: 1554, median: 54, ratio: 28.8 },
];

const tabs = [
  { id: "revenue", label: "Financial Divide", icon: "💰" },
  { id: "nil", label: "NIL Concentration", icon: "📊" },
  { id: "recruiting", label: "Recruiting & NIL", icon: "🏈" },
  { id: "balance", label: "Competitive Balance", icon: "⚖️" },
  { id: "deals", label: "Deal Structure", icon: "📋" },
];

const Stat = ({ label, value, sub, accent = C.power }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${accent}`, borderRadius: 8, padding: "14px 18px", flex: 1, minWidth: 150 }}>
    <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 800, color: C.text, marginTop: 4 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: accent, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Finding = ({ text }) => (
  <div style={{ marginTop: 16, padding: 14, background: "#fef9f0", borderRadius: 8, border: "1px solid #f0e6d2", fontSize: 13, lineHeight: 1.7 }}>
    <strong>Key Finding:</strong> {text}
  </div>
);

const Tip = ({ active, payload, label, fmt = v => v }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 3 }}>{label}</div>
      {payload.map((p, i) => <div key={i} style={{ color: p.color }}>{p.name}: {fmt(p.value)}</div>)}
    </div>
  );
};

export default function Dashboard() {
  const [tab, setTab] = useState("revenue");
  const [sport, setSport] = useState("fb");

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <div style={{ background: "linear-gradient(135deg, #0d1b2a, #1a3a5c)", padding: "24px 28px 18px", borderBottom: "3px solid #22a065" }}>
        <div style={{ fontSize: 11, color: "#22a065", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>DCDA Capstone Project</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "4px 0 0" }}>NIL & the Financial Divide in NCAA Athletics</h1>
        <p style={{ color: "#8aa4be", fontSize: 12, marginTop: 4 }}>Power 4 vs. Non-Power 4 — Financial Gap, NIL Concentration & Competitive Balance</p>
      </div>

      <div style={{ display: "flex", gap: 3, padding: "12px 28px", background: "#fff", borderBottom: `1px solid ${C.border}`, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "7px 16px", borderRadius: 6, border: "none", cursor: "pointer",
            background: tab === t.id ? C.power : "transparent", color: tab === t.id ? "#fff" : C.muted,
            fontWeight: 700, fontSize: 12, fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap",
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div style={{ padding: "20px 28px", maxWidth: 1050, margin: "0 auto" }}>

        {tab === "revenue" && <>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Stat label="P5 Avg Revenue" value="$162M" sub="+61% since 2015" />
            <Stat label="G5 Avg Revenue" value="$47M" sub="+40% since 2015" accent={C.g5} />
            <Stat label="Revenue Gap" value="$115M" sub="Up 44% since pre-NIL" accent={C.accent} />
            <Stat label="P5/G5 Ratio" value="3.5x" sub="Up from 3.0x in 2015" accent={C.fcs} />
          </div>
          <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>Average Athletic Department Revenue by Tier (2015–2023)</h3>
            <p style={{ fontSize: 11, color: C.muted, margin: "0 0 14px" }}>Source: EADA_CFB_MBB_WBB_Analysis.xlsx → Master Data</p>
            <ResponsiveContainer width="100%" height={360}>
              <ComposedChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${v}M`} tick={{ fontSize: 11 }} />
                <Tooltip content={<Tip fmt={v => `$${v.toFixed(1)}M`} />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <ReferenceLine x={2021} stroke={C.accent} strokeDasharray="6 3" label={{ value: "NIL →", fill: C.accent, fontSize: 10 }} />
                <Bar dataKey="power5" name="Power 5" fill={C.power} radius={[3,3,0,0]} />
                <Bar dataKey="g5" name="Group of 5" fill={C.g5} radius={[3,3,0,0]} />
                <Bar dataKey="fcs" name="FCS" fill={C.fcs} radius={[3,3,0,0]} />
              </ComposedChart>
            </ResponsiveContainer>
            <Finding text="The revenue gap between Power 5 and Group of 5 grew from $67M (2015) to $115M (2023) — a 72% increase. Zero Group of 5 schools have enough surplus to fund the $20.5M revenue sharing cap. Only 10% of Power 5 schools do." />
          </div>
        </>}

        {tab === "nil" && <>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Stat label="Power 4 in Top 100" value="85" sub="85% of all top athletes" />
            <Stat label="Non-Power 4" value="1" sub="Only 1 athlete" accent={C.accent} />
            <Stat label="Top 10 Share" value="33.7%" sub="$35.4M of $104.9M total" accent={C.fcs} />
            <Stat label="QBs in Top 100" value="31" sub="Position concentration" accent={C.g5} />
          </div>
          <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>NIL Top 100: Athletes by Conference</h3>
            <p style={{ fontSize: 11, color: C.muted, margin: "0 0 14px" }}>Source: ON3_2025_NIL_TOP100.html → Tier & Conference fields</p>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={nilConf} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={95} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="athletes" name="Athletes" radius={[0,5,5,0]}>
                  {nilConf.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <Finding text="SEC and Big Ten alone hold 51 of the top 100 NIL athletes ($64M in valuations). Only 1 non-Power 4 athlete (Silas Demary Jr., UConn) appears in the entire top 100. The NIL Top 100 is essentially a Power 4 monopoly." />
          </div>
        </>}

        {tab === "recruiting" && <>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[["fb","Football"],["bb","Basketball"]].map(([k,l]) => (
              <button key={k} onClick={() => setSport(k)} style={{
                padding: "5px 14px", borderRadius: 5, border: "none", cursor: "pointer",
                background: sport === k ? C.power : "#e5e2db", color: sport === k ? "#fff" : C.text,
                fontWeight: 700, fontSize: 11, fontFamily: "inherit",
              }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Stat label="P4 NIL/Recruit (2026)" value={sport==="fb" ? "$57K" : "$368K"} />
            <Stat label="NP4 NIL/Recruit (2026)" value={sport==="fb" ? "$13K" : "$46K"} accent={C.g5} />
            <Stat label="Spending Gap" value={sport==="fb" ? "4.5x" : "8.0x"} sub={sport==="fb" ? "Football" : "Basketball — widening"} accent={C.accent} />
            <Stat label="NIL↔Rating Corr." value="r = 0.77" sub="2025 Football" accent={C.fcs} />
          </div>
          <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>Avg NIL per Recruit — Power 4 vs Non-Power 4 ({sport==="fb"?"Football":"Basketball"})</h3>
            <p style={{ fontSize: 11, color: C.muted, margin: "0 0 14px" }}>Source: ON3_Rankings_CLEANED.xlsx → Avg_NIL_Numeric by Tier</p>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={recruitNIL}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${v}K`} tick={{ fontSize: 11 }} />
                <Tooltip content={<Tip fmt={v => `$${v}K`} />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey={sport==="fb"?"p4_fb":"p4_bb"} name="Power 4" fill={C.power} radius={[3,3,0,0]} />
                <Bar dataKey={sport==="fb"?"np4_fb":"np4_bb"} name="Non-Power 4" fill={C.g5} radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <Finding text={sport==="fb"
              ? "Football NIL spending per recruit is 4.5x higher at Power 4 schools ($57K vs $13K). The correlation between NIL and recruit quality strengthened from r=0.50 (2023) to r=0.77 (2025) — money is becoming a stronger predictor of talent."
              : "Basketball NIL exploded from near-parity in 2022 to an 8x gap in 2026 ($368K vs $46K). Smaller rosters mean each recruit is a bigger investment, driving extreme spending concentration."} />
          </div>
        </>}

        {tab === "balance" && <>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Stat label="CFB Gap" value="+1.8pp" sub="Power gap WIDENED" accent={C.accent} />
            <Stat label="MBB Power" value="-0.7pp" sub="Power DECLINED" accent={C.g5} />
            <Stat label="MBB High-Major" value="+1.5pp" sub="Mid-majors GAINED" accent={C.fcs} />
            <Stat label="WBB" value="Flat" sub="Minimal change" accent={C.muted} />
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: 18, flex: 1, minWidth: 280 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>Football Win % by Tier</h3>
              <p style={{ fontSize: 10, color: C.muted, margin: "0 0 10px" }}>Source: Sports_Reference.xlsx → CFB Data</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={cfbBalance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis domain={[44, 60]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                  <Tooltip content={<Tip fmt={v => `${v.toFixed(1)}%`} />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine x={2021} stroke={C.accent} strokeDasharray="5 3" />
                  <Line dataKey="power" name="Power" stroke={C.power} strokeWidth={3} dot={{ r: 4 }} />
                  <Line dataKey="g5" name="Group of 5" stroke={C.g5} strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: 18, flex: 1, minWidth: 280 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>Men's Basketball Win % by Tier</h3>
              <p style={{ fontSize: 10, color: C.muted, margin: "0 0 10px" }}>Source: Sports_Reference.xlsx → MBB Data</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={mbbBalance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis domain={[48, 62]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                  <Tooltip content={<Tip fmt={v => `${v.toFixed(1)}%`} />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine x={2021} stroke={C.accent} strokeDasharray="5 3" />
                  <Line dataKey="power" name="Power" stroke={C.power} strokeWidth={3} dot={{ r: 4 }} />
                  <Line dataKey="high" name="High-Major" stroke={C.fcs} strokeWidth={3} dot={{ r: 4 }} />
                  <Line dataKey="low" name="Low/Mid-Major" stroke={C.g5} strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <Finding text="Football and basketball tell opposite stories. CFB's competitive gap widened post-NIL (+1.8pp), but MBB Power schools lost ground while High-Majors gained +1.5pp. This supports the hypothesis that NIL's impact is more nuanced than 'rich get richer.'" />
        </>}

        {tab === "deals" && <>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Stat label="MBB Avg/Med Ratio" value="107.5x" sub="$8,708 avg vs $81 median" accent={C.accent} />
            <Stat label="CFB Avg/Med Ratio" value="51.7x" sub="$4,752 avg vs $92 median" />
            <Stat label="Deals Under $100" value="52%" sub="Post-settlement" accent={C.fcs} />
            <Stat label="CFB Ratio Growth" value="10x→52x" sub="Inequality exploded" accent={C.g5} />
          </div>
          <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>NIL Deal Inequality: Average vs Median by Sport & Era</h3>
            <p style={{ fontSize: 11, color: C.muted, margin: "0 0 14px" }}>Source: NCAA_NIL_Assist_-_Deal_Data_summary.xlsx → Raw Data</p>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={dealData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="sport" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${v.toLocaleString()}`} tick={{ fontSize: 10 }} />
                <Tooltip content={<Tip fmt={v => `$${v.toLocaleString()}`} />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="avg" name="Average Deal" fill={C.power} radius={[3,3,0,0]} />
                <Bar dataKey="median" name="Median Deal" fill={C.g5} radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <Finding text="The average-to-median ratio is the best measure of NIL inequality. In MBB post-settlement, the average deal ($8,708) is 107.5x the median ($81). Over 50% of deals are under $100. A tiny number of star players with six-figure deals pull the average far above what the typical athlete earns." />
          </div>
        </>}

        <div style={{ marginTop: 28, padding: "14px 0", borderTop: `1px solid ${C.border}`, fontSize: 10, color: C.muted, textAlign: "center" }}>
          Sources: EADA (U.S. Dept. of Education) · NCAA NIL Assist · On3 NIL Rankings · Sports Reference · Knight-Newhouse Database
          <br/>DCDA Capstone — Grant Franklin — 2026
        </div>
      </div>
    </div>
  );
}
