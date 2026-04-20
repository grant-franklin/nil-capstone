import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme } from '../../styles/theme';
import { corrData } from '../../data/correlationData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2030', border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: theme.white, fontWeight: 700, margin: 0 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: '3px 0 0' }}>
          {p.name}: {p.value.toFixed(3)}
        </p>
      ))}
    </div>
  );
};

export default function CorrelationLine() {
  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: theme.white, margin: '0 0 16px' }}>Does Money Buy Wins? (Correlation)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={corrData}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
          <XAxis dataKey="year" stroke={theme.muted} />
          <YAxis stroke={theme.muted} domain={[0, 1]} />
          <Tooltip content={<Tip />} />
          <Legend />
          <Line type="monotone" dataKey="nilWin" stroke={theme.power} name="NIL-Win Correlation" strokeWidth={2} />
          <Line type="monotone" dataKey="scoreSRS" stroke={theme.g5} name="Score SRS" strokeWidth={2} />
          <Line type="monotone" dataKey="nilRating" stroke={theme.accent} name="NIL Rating" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
