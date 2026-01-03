import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TransactionFlowData {
  time: string;
  count: number;
  flagged: number;
}

interface TransactionFlowChartProps {
  data: TransactionFlowData[];
  isLoading: boolean;
}

const TransactionFlowChart: React.FC<TransactionFlowChartProps> = ({ data, isLoading }) => {
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
          <h3 className="font-semibold">Transaction Flow</h3>
          <p className="text-sm text-muted-foreground">Hourly transaction volume</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-muted-foreground">All Transactions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-danger" />
            <span className="text-muted-foreground">Flagged</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--danger))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--danger))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="time" 
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
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCount)"
              name="Transactions"
            />
            <Area
              type="monotone"
              dataKey="flagged"
              stroke="hsl(var(--danger))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorFlagged)"
              name="Flagged"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionFlowChart;
