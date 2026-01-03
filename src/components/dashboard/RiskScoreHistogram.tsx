import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RiskScoreData {
  range: string;
  count: number;
  fill: string;
}

interface RiskScoreHistogramProps {
  data: RiskScoreData[];
  isLoading: boolean;
}

const RiskScoreHistogram: React.FC<RiskScoreHistogramProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="h-4 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="h-64 bg-muted/50 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Risk Score Distribution</h3>
          <p className="text-sm text-muted-foreground">Transaction risk score buckets</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-danger" />
            <span className="text-muted-foreground">High</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="range" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [value.toLocaleString(), 'Transactions']}
              labelFormatter={(label) => `Risk Score: ${label}`}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
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

export default RiskScoreHistogram;
