import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme } from '../../styles/theme';
import { nilRecruit } from '../../data/recruitingData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2030', border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: theme.white, fontWeight: 700, margin: 0 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: '3px 0 0' }}>
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function RecruitingNILBar() {
  const [sport, setSport] = useState('fb');

  const dataKeys = sport === 'fb' 
    ? ['fbP4', 'fbNP4']
    : ['bbP4', 'bbNP4'];

  const labels = sport === 'fb'
    ? { fbP4: 'Football P4', fbNP4: 'Football Non-P4' }
    : { bbP4: 'Basketball P4', bbNP4: 'Basketball Non-P4' };

  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: theme.white, margin: 0 }}>Recruiting NIL Spending</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setSport('fb')}
            style={{
              padding: '6px 12px',
              background: sport === 'fb' ? theme.accent : theme.cardAlt,
              color: sport === 'fb' ? '#000' : theme.text,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Football
          </button>
          <button
            onClick={() => setSport('bb')}
            style={{
              padding: '6px 12px',
              background: sport === 'bb' ? theme.accent : theme.cardAlt,
              color: sport === 'bb' ? '#000' : theme.text,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Basketball
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={nilRecruit}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
          <XAxis dataKey="year" stroke={theme.muted} />
          <YAxis stroke={theme.muted} />
          <Tooltip content={<Tip />} />
          <Legend />
          {dataKeys.map(key => (
            <Bar key={key} dataKey={key} fill={theme[key.includes('P4') ? 'power' : 'g5']} name={labels[key]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
