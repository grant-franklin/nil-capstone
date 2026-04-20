import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme } from '../../styles/theme';
import { cfbBalance } from '../../data/competitiveData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2030', border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: theme.white, fontWeight: 700, margin: 0 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: '3px 0 0' }}>
          {p.name}: {p.value.toFixed(1)}%
        </p>
      ))}
    </div>
  );
};

export default function CFBBalanceLine() {
  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: theme.white, margin: '0 0 16px' }}>CFB Competitive Balance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={cfbBalance}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
          <XAxis dataKey="year" stroke={theme.muted} />
          <YAxis stroke={theme.muted} />
          <Tooltip content={<Tip />} />
          <Legend />
          <Line type="monotone" dataKey="power" stroke={theme.power} name="Power 5 Win %" strokeWidth={2} />
          <Line type="monotone" dataKey="g5" stroke={theme.g5} name="G5 Win %" strokeWidth={2} />
          <Line type="monotone" dataKey="gap" stroke={theme.red} name="Gap" strokeWidth={2} strokeDasharray="5 5" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
