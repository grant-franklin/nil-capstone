import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, ComposedChart } from "recharts";
import NILEstimator from "./NILEstimator";

// ═══════════════ THEME ═══════════════
const T = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  power: "#e63946", g5: "#457b9d", fcs: "#6b7280", accent: "#f4a261",
  sec: "#ff6b35", bigten: "#0072ce", big12: "#d4a017", acc: "#2ec4b6",
  fb: "#e63946", bb: "#a855f7", wbb: "#ec4899",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
  green: "#2ec4b6", red: "#e63946",
};

const fmt = (n) => { if (n >= 1e6) return `$${(n/1e6).toFixed(1)}M`; if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`; return `$${n}`; };

// ═══════════════ ALL DATA ═══════════════
const revenueByTier = [
  { tier: "Power 5", revenue: 161816092, expenses: 155082046, cfb: 75882787, mbb: 16829874, wbb: 4295969, schools: 69 },
  { tier: "Group of 5", revenue: 46520680, expenses: 46454944, cfb: 14637881, mbb: 4395052, wbb: 2554247, schools: 60 },
  { tier: "FCS", revenue: 26373854, expenses: 26186629, cfb: 5291977, mbb: 2766070, wbb: 1711621, schools: 128 },
];
const revenueTimeline = [
  { year: 2015, p5: 100521239, g5: 33308205, gap: 67213034 },
  { year: 2016, p5: 106872957, g5: 34567056, gap: 72305901 },
  { year: 2017, p5: 115466113, g5: 36357634, gap: 79108479 },
  { year: 2018, p5: 119515037, g5: 37522462, gap: 81992575 },
  { year: 2019, p5: 116858301, g5: 36906375, gap: 79951926 },
  { year: 2020, p5: 98665289, g5: 32810895, gap: 65854394 },
  { year: 2021, p5: 133078928, g5: 40053903, gap: 93025025 },
  { year: 2022, p5: 148098471, g5: 43908381, gap: 104190091 },
  { year: 2023, p5: 161816092, g5: 46520680, gap: 115295412 },
];
const nilConf = [
  { conf: "SEC", athletes: 27, nil: 34600000 },
  { conf: "Big Ten", athletes: 24, nil: 29400000 },
  { conf: "Big 12", athletes: 18, nil: 15700000 },
  { conf: "ACC", athletes: 15, nil: 14200000 },
  { conf: "Other/HS", athletes: 15, nil: 9500000 },
  { conf: "Non-P4", athletes: 1, nil: 0 },
];
const nilDeals = [
  { label: "CFB Early", avg: 1582, median: 150, ratio: 10.5 },
  { label: "CFB Post", avg: 4752, median: 92, ratio: 51.7 },
  { label: "MBB Early", avg: 3897, median: 500, ratio: 7.8 },
  { label: "MBB Post", avg: 8708, median: 81, ratio: 107.5 },
  { label: "WBB Early", avg: 1006, median: 100, ratio: 10.1 },
  { label: "WBB Post", avg: 1554, median: 54, ratio: 28.8 },
];
const cfbBalance = [
  { year: 2018, power: 55.5, g5: 47.9, gap: 7.6 },
  { year: 2019, power: 55.0, g5: 50.1, gap: 4.9 },
  { year: 2020, power: 49.9, g5: 47.7, gap: 2.2 },
  { year: 2021, power: 54.5, g5: 49.6, gap: 4.9 },
  { year: 2022, power: 56.1, g5: 48.3, gap: 7.8 },
  { year: 2023, power: 56.1, g5: 48.4, gap: 7.6 },
  { year: 2024, power: 56.1, g5: 47.6, gap: 8.4 },
  { year: 2025, power: 56.3, g5: 48.0, gap: 8.3 },
];
const nilRecruit = [
  { year: 2022, fbP4: 58806, fbNP4: 47823, bbP4: 82652, bbNP4: 78628 },
  { year: 2023, fbP4: 71992, fbNP4: 21227, bbP4: 77218, bbNP4: 116971 },
  { year: 2024, fbP4: 66685, fbNP4: 14618, bbP4: 93125, bbNP4: 53033 },
  { year: 2025, fbP4: 67654, fbNP4: 14320, bbP4: 350098, bbNP4: 175814 },
  { year: 2026, fbP4: 57298, fbNP4: 12542, bbP4: 367897, bbNP4: 45762 },
];
const corrData = [
  { year: 2022, nilWin: 0.089, scoreSRS: 0.633 },
  { year: 2023, nilWin: 0.250, scoreSRS: 0.729, nilRating: 0.498 },
  { year: 2024, nilWin: 0.338, scoreSRS: 0.675, nilRating: 0.683 },
  { year: 2025, nilWin: 0.282, scoreSRS: 0.676, nilRating: 0.769 },
];

// ═══════════════ UI COMPONENTS ═══════════════
const Tip = ({ active, payload, label, dollarFmt }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a2030", border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <p style={{ color: T.white, fontWeight: 700, margin: 0 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: "3px 0 0" }}>
          {p.name}: {dollarFmt ? fmt(p.value) : typeof p.value === "number" && p.value < 10 ? p.value.toFixed(3) : p.value}
        </p>
      ))}
    </div>
  );
};

const Stat = ({ label, value, sub, color = T.accent, small }) => (
  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${color}`, borderRadius: 10, padding: small ? "12px 16px" : "16px 20px", flex: "1 1 140px", minWidth: small ? 120 : 140 }}>
    <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: small ? 18 : 24, fontWeight: 800, color: T.white, marginTop: 3 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Source = ({ children }) => (
  <p style={{ fontSize: 11, color: T.muted, margin: "0 0 16px", fontStyle: "italic" }}>Source: {children}</p>
);

const Finding = ({ children }) => (
  <div style={{ margin: "16px 0", padding: "14px 18px", background: "rgba(244,162,97,0.07)", borderLeft: `3px solid ${T.accent}`, borderRadius: "0 10px 10px 0" }}>
    <span style={{ fontSize: 12, fontWeight: 800, color: T.accent, textTransform: "uppercase", letterSpacing: 0.5 }}>Key Finding</span>
    <p style={{ fontSize: 14, color: T.text, margin: "6px 0 0", lineHeight: 1.65 }}>{children}</p>
  </div>
);

const Section = ({ id, children }) => (
  <section id={id} style={{ padding: "60px 0", borderBottom: `1px solid ${T.border}` }}>{children}</section>
);

const H2 = ({ children, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <h2 style={{ fontSize: 28, fontWeight: 800, color: T.white, margin: 0, letterSpacing: -0.8, lineHeight: 1.2 }}>{children}</h2>
    {sub && <p style={{ fontSize: 14, color: T.muted, marginTop: 6, lineHeight: 1.5 }}>{sub}</p>}
  </div>
);

const P = ({ children }) => <p style={{ fontSize: 15, color: T.text, lineHeight: 1.75, margin: "0 0 16px" }}>{children}</p>;

const ChartWrap = ({ children }) => (
  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, margin: "20px 0" }}>
    {children}
  </div>
);

// ═══════════════ NAV ═══════════════
const NAV = [
  { id: "financial", label: "Financial Divide" },
  { id: "nil", label: "NIL Concentration" },
  { id: "recruiting", label: "Recruiting" },
  { id: "competitive", label: "Competitive Balance" },
  { id: "correlations", label: "Does Money Buy Wins?" },
  { id: "estimator", label: "NIL Estimator" },
];

// ═══════════════ MAIN ═══════════════
export default function Part4Dashboard() {
  const [activeNav, setActiveNav] = useState("financial");
  const [sportToggle, setSportToggle] = useState("fb");

  useEffect(() => {
    const handler = () => {
      for (const { id } of [...NAV].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveNav(id); break; }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* ── STICKY SUB-NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(11,14,20,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 2, overflowX: "auto", padding: "10px 0" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              padding: "7px 14px", borderRadius: 7, border: "none", cursor: "pointer", whiteSpace: "nowrap",
              background: activeNav === n.id ? T.accent : "transparent",
              color: activeNav === n.id ? "#000" : T.muted,
              fontWeight: 700, fontSize: 12, transition: "all 0.2s",
            }}>{n.label}</button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* ══════════════ SECTION 1: FINANCIAL DIVIDE ══════════════ */}
        <Section id="financial">
          <H2 sub="How wide is the gap, and is it growing?">Section 1: The Financial Divide</H2>
          <P>The financial disparity between Power 5 and Group of 5 athletic departments has been growing for decades - but the NIL era has accelerated it dramatically. Using EADA data filed with the U.S. Department of Education, we can trace the revenue gap from 2015 to 2023 and measure exactly how much the landscape has shifted since NIL's introduction in July 2021.</P>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 4px" }}>Average Total Athletic Revenue by Tier (2023)</h3>
            <Source><a href="https://ope.ed.gov/athletics/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Equity in Athletics Disclosure Act (EADA), U.S. Department of Education</a></Source>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueByTier} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="tier" tick={{ fill: T.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: T.muted, fontSize: 11 }} tickFormatter={v => `$${(v/1e6).toFixed(0)}M`} />
                <Tooltip content={<Tip dollarFmt />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="revenue" name="Revenue" radius={[6,6,0,0]}>
                  {revenueByTier.map((_, i) => <Cell key={i} fill={[T.power, T.g5, T.fcs][i]} />)}
                </Bar>
                <Bar dataKey="expenses" name="Expenses" radius={[6,6,0,0]} fillOpacity={0.4}>
                  {revenueByTier.map((_, i) => <Cell key={i} fill={[T.power, T.g5, T.fcs][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <Finding>Power 5 schools average $161.8M in revenue - 3.5x more than Group of 5 ($46.5M) and 6.1x more than FCS ($26.4M). Zero Group of 5 schools have enough surplus to fund the $20.5M revenue sharing cap. Only 10% of Power 5 schools do.</Finding>
          </ChartWrap>

          <P>The gap isn't just big - it's compounding. The ratio of Power 5 to Group of 5 revenue has climbed steadily from 3.0x in 2015 to 3.5x in 2023. COVID briefly compressed the gap in 2020, but it rebounded sharply, and the post-COVID acceleration coincides directly with NIL's introduction.</P>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 4px" }}>Revenue Gap: Power 5 vs. Group of 5 (2015–2023)</h3>
            <Source><a href="https://ope.ed.gov/athletics/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Equity in Athletics Disclosure Act (EADA), U.S. Department of Education</a></Source>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={revenueTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="year" tick={{ fill: T.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: T.muted, fontSize: 11 }} tickFormatter={v => `$${(v/1e6).toFixed(0)}M`} />
                <Tooltip content={<Tip dollarFmt />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area dataKey="p5" name="Power 5" fill={T.power} fillOpacity={0.12} stroke={T.power} strokeWidth={2.5} />
                <Area dataKey="g5" name="Group of 5" fill={T.g5} fillOpacity={0.12} stroke={T.g5} strokeWidth={2.5} />
                <Line dataKey="gap" name="Revenue Gap" stroke={T.accent} strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: T.accent }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: T.muted }}>← Pre-NIL </span>
              <span style={{ fontSize: 11, color: T.accent, fontWeight: 700, margin: "0 12px" }}>▼ NIL begins Jul 2021</span>
              <span style={{ fontSize: 11, color: T.muted }}> Post-NIL →</span>
            </div>
            <Finding>The revenue gap grew from $80M (2019) to $115M (2023) - a 44% increase in just four years. That $35M increase alone exceeds the entire annual budget of many FCS programs.</Finding>
          </ChartWrap>
        </Section>

        {/* ══════════════ SECTION 2: NIL CONCENTRATION ══════════════ */}
        <Section id="nil">
          <H2 sub="Where are the NIL dollars going?">Section 2: NIL Concentration</H2>
          <P>The NIL marketplace has exploded to an estimated $2.3 billion, but that money is not distributed evenly. Analysis of the On3 NIL Top 100 reveals that the highest-value athletes are overwhelmingly concentrated at Power 4 schools, and within those schools, at a handful of positions.</P>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            <Stat label="Power 4 Athletes" value="85 of 100" color={T.power} small />
            <Stat label="Non-Power 4" value="1 of 100" sub="Silas Demary Jr. (UConn)" color={T.g5} small />
            <Stat label="Top 10 Hold" value="33.7%" sub="$35.4M of $104.9M total" color={T.accent} small />
          </div>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 4px" }}>NIL Top 100: Athletes by Conference</h3>
            <Source><a href="https://www.on3.com/nil/rankings/player/nil-100/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>On3 NIL Top 100 Rankings</a></Source>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={nilConf} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis type="number" tick={{ fill: T.muted, fontSize: 11 }} />
                <YAxis dataKey="conf" type="category" tick={{ fill: T.text, fontSize: 12, fontWeight: 600 }} width={80} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="athletes" name="Athletes" radius={[0,6,6,0]}>
                  {nilConf.map((_, i) => <Cell key={i} fill={[T.sec, T.bigten, T.big12, T.acc, T.muted, T.fcs][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <Finding>The SEC and Big Ten together account for 51 of the top 100 athletes and $64M of $104.9M in known NIL valuations. These are the same conferences with the largest media rights deals - creating a reinforcing cycle of revenue, talent, and exposure.</Finding>
          </ChartWrap>

          <P>The inequality extends beyond which schools get the money - it's also about how deals are structured. NCAA NIL Assist data reveals an extreme gap between average and median deal values, meaning a tiny number of massive deals distort the landscape while most athletes earn very little.</P>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 4px" }}>NIL Deal Inequality: Average vs. Median</h3>
            <Source><a href="https://nilassist.ncaa.org/data-dashboard/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>NCAA NIL Assist Data Dashboard</a></Source>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={nilDeals}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="label" tick={{ fill: T.muted, fontSize: 11 }} />
                <YAxis tick={{ fill: T.muted, fontSize: 11 }} tickFormatter={v => `$${v.toLocaleString()}`} />
                <Tooltip content={<Tip dollarFmt />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="avg" name="Average Deal" fill={T.power} radius={[4,4,0,0]} />
                <Bar dataKey="median" name="Median Deal" fill={T.accent} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <Finding>Post-settlement, the average MBB deal ($8,708) is 107.5x the median ($81). Over 50% of all deals are under $100. The NIL system has created a superstar economy - not broad-based athlete compensation.</Finding>
          </ChartWrap>
        </Section>

        {/* ══════════════ SECTION 3: RECRUITING ══════════════ */}
        <Section id="recruiting">
          <H2 sub="Is NIL reshaping where talent goes?">Section 3: Recruiting & NIL Spending</H2>
          <P>If the financial gap is widening and NIL dollars are concentrated at Power 4 schools, the next question is whether that money is translating into a recruiting advantage. Using On3's recruiting rankings and NIL valuations from 2022–2026, we can measure the spending gap per recruit and track how talent distribution has shifted.</P>

          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[["fb", "Football", T.fb], ["bb", "Basketball", T.bb]].map(([k, l, c]) => (
              <button key={k} onClick={() => setSportToggle(k)} style={{
                padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                background: sportToggle === k ? c : "transparent", color: sportToggle === k ? "#fff" : T.muted,
                fontWeight: 700, fontSize: 13,
              }}>{l}</button>
            ))}
          </div>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 4px" }}>Avg NIL Per Recruit: Power 4 vs. Non-Power 4 ({sportToggle === "fb" ? "Football" : "Basketball"})</h3>
            <Source><a href="https://www.on3.com/nil/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>On3 NIL Valuations and Recruiting Rankings</a></Source>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={nilRecruit} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="year" tick={{ fill: T.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: T.muted, fontSize: 11 }} tickFormatter={v => fmt(v)} />
                <Tooltip content={<Tip dollarFmt />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey={sportToggle === "fb" ? "fbP4" : "bbP4"} name="Power 4" fill={T.power} radius={[6,6,0,0]} />
                <Bar dataKey={sportToggle === "fb" ? "fbNP4" : "bbNP4"} name="Non-Power 4" fill={T.g5} radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <Finding>
              {sportToggle === "fb"
                ? "Football's NIL spending gap is 4.5x in 2026 ($57K vs $13K per recruit). Power 4 programs hold 96.9% of all 5-star recruits post-NIL - down only slightly from 100% pre-NIL."
                : "Basketball's NIL gap exploded from near-parity in 2022 to 8x in 2026 ($368K vs $46K). Smaller rosters mean each recruit is a bigger share of the team, so schools concentrate spending on a few difference-makers."
              }
            </Finding>
          </ChartWrap>
        </Section>

        {/* ══════════════ SECTION 4: COMPETITIVE BALANCE ══════════════ */}
        <Section id="competitive">
          <H2 sub="Is the money gap producing a bigger gap on the field?">Section 4: Competitive Balance</H2>
          <P>This is the central tension of the project. The financial gap is widening, NIL is concentrated at the top, and spending predicts recruiting quality - but does all of that actually translate to a wider competitive gap on the field? The answer depends on which sport you're watching.</P>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 4px" }}>CFB Win Percentage: Power vs. Group of 5 (2018–2025)</h3>
            <Source><a href="https://www.sports-reference.com/cfb/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Sports Reference — College Football</a></Source>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={cfbBalance}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="year" tick={{ fill: T.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: T.muted, fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[44, 60]} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="power" name="Power Win%" stroke={T.power} strokeWidth={3} dot={{ r: 4 }} />
                <Line dataKey="g5" name="Group of 5 Win%" stroke={T.g5} strokeWidth={3} dot={{ r: 4 }} />
                <Area dataKey="gap" name="Gap (pp)" fill={T.accent} fillOpacity={0.08} stroke={T.accent} strokeWidth={1.5} strokeDasharray="5 3" />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: T.muted }}>← Pre-NIL </span>
              <span style={{ fontSize: 11, color: T.accent, fontWeight: 700, margin: "0 12px" }}>▼ NIL Jul 2021</span>
              <span style={{ fontSize: 11, color: T.muted }}> Post-NIL →</span>
            </div>
            <Finding>CFB's competitive gap widened from 6.2pp (2018-19) to 8.0pp (2022-25). Power teams aren't just winning more - their SRS advantage grew from 5.6 to 7.2, meaning they're winning by larger margins against stronger opponents.</Finding>
          </ChartWrap>

          <P>But basketball tells a different story. Power conference teams actually saw their win percentage decline slightly post-NIL, while High-Major programs like Gonzaga, Marquette, and Saint Mary's gained ground. Women's basketball showed minimal change.</P>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 12px" }}>Cross-Sport Competitive Balance Summary</h3>
            <Source><a href="https://www.sports-reference.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Sports Reference — College Football and College Basketball</a></Source>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Sport", "Metric", "Pre-NIL", "Post-NIL", "Change", "Verdict"].map(h => (
                      <th key={h} style={{ background: T.cardAlt, color: T.muted, padding: "11px 14px", textAlign: "left", borderBottom: `2px solid ${T.border}`, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sport: "CFB", metric: "Win % Gap", pre: "6.2pp", post: "8.0pp", change: "+1.8pp", verdict: "Widened", vColor: T.red },
                    { sport: "MBB", metric: "Power Win %", pre: "59.4%", post: "58.8%", change: "-0.6pp", verdict: "Narrowed", vColor: T.green },
                    { sport: "MBB", metric: "High-Major Win %", pre: "54.5%", post: "56.0%", change: "+1.5pp", verdict: "Gained", vColor: T.green },
                    { sport: "WBB", metric: "Power Win %", pre: "59.0%", post: "59.4%", change: "+0.4pp", verdict: "Flat", vColor: T.muted },
                    { sport: "WBB", metric: "High-Major Win %", pre: "49.0%", post: "50.8%", change: "+1.8pp", verdict: "Gained", vColor: T.green },
                  ].map((r, i) => (
                    <tr key={i} style={{ background: i % 2 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                      <td style={{ padding: "10px 14px", fontWeight: 700, color: r.sport === "CFB" ? T.fb : r.sport === "MBB" ? T.bb : T.wbb }}>{r.sport}</td>
                      <td style={{ padding: "10px 14px" }}>{r.metric}</td>
                      <td style={{ padding: "10px 14px", color: T.muted }}>{r.pre}</td>
                      <td style={{ padding: "10px 14px", color: T.white, fontWeight: 600 }}>{r.post}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 700, color: r.vColor }}>{r.change}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: `${r.vColor}18`, color: r.vColor }}>{r.verdict}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Finding>The competitive impact of NIL is sport-dependent. Football is consolidating toward Power programs, but basketball actually became more competitive post-NIL - High-Majors gained +1.5pp. This supports the theory that NIL breaks up the NCAA "cartel" most effectively in sports with smaller rosters.</Finding>
          </ChartWrap>
        </Section>

        {/* ══════════════ SECTION 5: CORRELATIONS ══════════════ */}
        <Section id="correlations">
          <H2 sub="Testing whether NIL spending predicts on-field success">Section 5: Does Money Buy Wins?</H2>
          <P>The final analytical question: if we know that NIL spending predicts recruiting quality, does it also predict winning? By correlating On3's NIL data with Sports Reference's performance metrics, we can test this directly.</P>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            <Stat label="NIL → Recruit Rating" value="r = 0.77" sub="Strong & growing" color={T.green} small />
            <Stat label="NIL → Win %" value="r = 0.25" sub="Weak" color={T.accent} small />
            <Stat label="Recruit Score → SRS" value="r = 0.68" sub="Strong (talent matters)" color={T.power} small />
          </div>

          <ChartWrap>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: "0 0 4px" }}>Correlation Strength Over Time</h3>
            <Source><a href="https://www.on3.com/nil/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>On3 NIL Rankings</a> and <a href="https://www.sports-reference.com/cfb/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Sports Reference</a> (merged on Team + Year)</Source>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={corrData}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="year" tick={{ fill: T.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: T.muted, fontSize: 11 }} domain={[0, 1]} tickFormatter={v => `r=${v.toFixed(1)}`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="nilRating" name="NIL → Recruit Rating" stroke={T.green} strokeWidth={3} dot={{ r: 5 }} connectNulls />
                <Line dataKey="scoreSRS" name="Recruit Score → SRS" stroke={T.power} strokeWidth={3} dot={{ r: 5 }} />
                <Line dataKey="nilWin" name="NIL → Win%" stroke={T.accent} strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <Finding>Money buys talent (r=0.77), and talent predicts team quality (r=0.68) - but money does NOT reliably predict winning (r=0.25). Coaching, scheme fit, player development, and team chemistry all intervene between spending and results. The NIL market is still inefficient.</Finding>
          </ChartWrap>
        </Section>

        {/* ══════════════ SECTION 6: NIL ESTIMATOR ══════════════ */}
        <Section id="estimator">
          <H2 sub="Apply the findings: estimate NIL value for any athlete">Section 6: NIL Value Estimator</H2>
          <P>This interactive tool applies the patterns we found in the data to estimate what an athlete might earn in NIL compensation. It uses real median NIL figures by conference, position multipliers derived from the NIL Top 100 distribution, and adjustments for star rating, transfer portal status, and social media presence.</P>
          <P>Remember the key finding from Section 5: NIL spending strongly predicts recruiting quality (r=0.77) but only weakly predicts wins (r=0.25). Treat this tool as an estimate of market value for talent, not a prediction of on-field success.</P>
          <NILEstimator />
        </Section>
      </div>
    </div>
  );
}
