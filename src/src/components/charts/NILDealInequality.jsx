import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme, fmt } from '../../styles/theme';
import { nilDeals } from '../../data/nilData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2030', border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: theme.white, fontWeight: 700, margin: 0 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: '3px 0 0' }}>
          {p.name}: ${p.value}
        </p>
      ))}
    </div>
  );
};

export default function NILDealInequality() {
  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: theme.white, margin: '0 0 16px' }}>Deal Structure: Average vs Median</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={nilDeals}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
          <XAxis dataKey="label" stroke={theme.muted} />
          <YAxis stroke={theme.muted} />
          <Tooltip content={<Tip />} />
          <Legend />
          <Bar dataKey="avg" fill={theme.power} name="Average" />
          <Bar dataKey="median" fill={theme.accent} name="Median" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
