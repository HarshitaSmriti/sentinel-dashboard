import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface TransactionTypeData {
  name: string;
  value: number;
  fill: string;
}

interface TransactionTypeChartProps {
  data: TransactionTypeData[];
  isLoading: boolean;
}

const TransactionTypeChart: React.FC<TransactionTypeChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="h-4 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="h-64 bg-muted/50 rounded animate-pulse" />
      </div>
    );
  }

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Transaction Type Breakdown</h3>
          <p className="text-sm text-muted-foreground">Distribution by transaction type</p>
        </div>
      </div>
      <div className="h-64 flex">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-32 flex flex-col justify-center gap-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTypeChart;
