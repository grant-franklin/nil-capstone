import React from 'react';
import { theme, fmt } from '../../styles/theme';
import { cfbBalance, mbbBalance } from '../../data/competitiveData';

export default function CompetitiveTable() {
  const latestCFB = cfbBalance[cfbBalance.length - 1];
  const latestMBB = mbbBalance[mbbBalance.length - 1];

  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: theme.white, margin: '0 0 24px' }}>Cross-Sport Summary</h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 14,
          color: theme.text,
        }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${theme.border}` }}>
              <th style={{ padding: 12, textAlign: 'left', fontWeight: 800, color: theme.white }}>Sport</th>
              <th style={{ padding: 12, textAlign: 'center', fontWeight: 800, color: theme.white }}>Year</th>
              <th style={{ padding: 12, textAlign: 'center', fontWeight: 800, color: theme.power }}>Power Win %</th>
              <th style={{ padding: 12, textAlign: 'center', fontWeight: 800, color: theme.g5 }}>G5/High Win %</th>
              <th style={{ padding: 12, textAlign: 'center', fontWeight: 800, color: theme.red }}>Gap</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
              <td style={{ padding: 12, fontWeight: 600 }}>College Football</td>
              <td style={{ padding: 12, textAlign: 'center' }}>{latestCFB.year}</td>
              <td style={{ padding: 12, textAlign: 'center', color: theme.power }}>{latestCFB.power.toFixed(1)}%</td>
              <td style={{ padding: 12, textAlign: 'center', color: theme.g5 }}>{latestCFB.g5.toFixed(1)}%</td>
              <td style={{ padding: 12, textAlign: 'center', color: theme.red }}>{latestCFB.gap.toFixed(1)}%</td>
            </tr>
            <tr>
              <td style={{ padding: 12, fontWeight: 600 }}>Men's Basketball</td>
              <td style={{ padding: 12, textAlign: 'center' }}>{latestMBB.year}</td>
              <td style={{ padding: 12, textAlign: 'center', color: theme.power }}>{latestMBB.power.toFixed(1)}%</td>
              <td style={{ padding: 12, textAlign: 'center', color: theme.g5 }}>{latestMBB.high.toFixed(1)}%</td>
              <td style={{ padding: 12, textAlign: 'center', color: theme.red }}>{(latestMBB.power - latestMBB.low).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 24, padding: '16px', background: theme.cardAlt, borderRadius: 8, borderLeft: `3px solid ${theme.accent}` }}>
        <p style={{ fontSize: 12, color: theme.muted, margin: 0, lineHeight: 1.6 }}>
          <strong>Key Finding:</strong> Despite significant NIL spending advantages, Power conferences maintain only modest competitive advantages in football (gap of {latestCFB.gap.toFixed(1)}%) compared to basketball variations across tiers.
        </p>
      </div>
    </div>
  );
}
