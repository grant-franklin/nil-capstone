import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme, fmt } from '../../styles/theme';
import { nilConf } from '../../data/nilData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2030', border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: theme.white, fontWeight: 700, margin: 0 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: '3px 0 0' }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function NILConferenceBar() {
  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: theme.white, margin: '0 0 16px' }}>NIL Spending by Conference</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={nilConf} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
          <XAxis type="number" stroke={theme.muted} tickFormatter={fmt} />
          <YAxis dataKey="conf" type="category" stroke={theme.muted} width={80} />
          <Tooltip content={<Tip />} />
          <Legend />
          <Bar dataKey="nil" fill={theme.accent} name="NIL Spending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
