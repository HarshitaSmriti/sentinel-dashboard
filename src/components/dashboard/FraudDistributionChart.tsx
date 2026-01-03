import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FraudDistributionData {
  name: string;
  value: number;
  fill: string;
}

interface FraudDistributionChartProps {
  data: FraudDistributionData[];
  isLoading: boolean;
}

const FraudDistributionChart: React.FC<FraudDistributionChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="h-4 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="h-64 bg-muted/50 rounded animate-pulse" />
      </div>
    );
  }

  const total = data.reduce((acc, item) => acc + item.value, 0);
  const fraudRate = total > 0 ? ((data.find(d => d.name === 'Flagged')?.value || 0) / total * 100).toFixed(1) : '0';

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Fraud Distribution</h3>
          <p className="text-sm text-muted-foreground">Fraud vs Legitimate transactions</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-semibold text-danger">{fraudRate}%</span>
          <p className="text-xs text-muted-foreground">Fraud Rate</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [value.toLocaleString(), 'Transactions']}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FraudDistributionChart;
