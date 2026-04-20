import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
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

export default function DashboardPart4() {
  // Sample data for Part 4 visualizations
  const pieChartData = [
    { name: 'Category 1', value: 30 },
    { name: 'Category 2', value: 25 },
    { name: 'Category 3', value: 20 },
    { name: 'Category 4', value: 25 },
  ];

  const barChartData = [
    { name: 'Metric 1', value: 65 },
    { name: 'Metric 2', value: 59 },
    { name: 'Metric 3', value: 80 },
    { name: 'Metric 4', value: 81 },
    { name: 'Metric 5', value: 56 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard">
      <h2>Part 4: Results & Discussion Dashboard</h2>
      
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Distribution Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Comparative Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analysis-text">
        <p>
          This dashboard displays the results and discussions from Part 4 of the research.
          The pie chart shows the distribution of key categories, while the bar chart compares
          various metrics across different measurement points.
        </p>
      </div>
    </div>
  );
}
