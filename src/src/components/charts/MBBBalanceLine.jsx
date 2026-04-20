import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { mbbBalance } from '../../data/competitiveData';

// Light theme colors from PART3
const C = {
  power: "#1a3a5c",
  g5: "#22a065",
  fcs: "#d97b1e",
  accent: "#c0392b",
  bg: "#f8f6f1",
  card: "#fff",
  text: "#1a1a1a",
  muted: "#6b7280",
  border: "#e5e2db"
};

const Tip = ({ active, payload, label, fmt = v => v }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 3 }}>{label}</div>
      {payload.map((p, i) => <div key={i} style={{ color: p.color }}>{p.name}: {fmt(p.value)}</div>)}
    </div>
  );
};

export default function MBBBalanceLine() {
  return (
    <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: 18 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px", color: C.text }}>Men's Basketball Win % by Tier</h3>
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
  );
}
