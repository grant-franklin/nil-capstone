import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Dashboard.css';

export default function DashboardPart3() {
  // Sample data for Part 3 visualizations
  const lineChartData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 20 },
    { month: 'Apr', value: 27 },
    { month: 'May', value: 20 },
    { month: 'Jun', value: 30 },
  ];

  const barChartData = [
    { category: 'A', value: 400 },
    { category: 'B', value: 300 },
    { category: 'C', value: 200 },
    { category: 'D', value: 278 },
    { category: 'E', value: 190 },
  ];

  return (
    <div className="dashboard">
      <h2>Part 3: Analysis Dashboard</h2>
      
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Category Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analysis-text">
        <p>
          This dashboard presents key findings and data visualizations from Part 3 of the research.
          The charts above show trend analysis and categorical comparisons relevant to the study.
        </p>
      </div>
    </div>
  );
}
