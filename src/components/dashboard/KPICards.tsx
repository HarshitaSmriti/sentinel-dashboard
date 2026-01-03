import React from 'react';
import { DashboardStats } from '@/lib/types';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Activity, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardsProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

const formatCurrency = (num: number): string => {
  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
};

const KPICards: React.FC<KPICardsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-card border border-border animate-pulse">
            <div className="h-4 w-24 bg-muted rounded mb-3" />
            <div className="h-8 w-20 bg-muted rounded mb-2" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  const fraudRate = stats ? ((stats.flaggedTransactions / stats.totalTransactions) * 100).toFixed(2) : '0';
  const avgAmount = stats ? stats.totalVolume / stats.totalTransactions : 0;

  const kpis = [
    {
      label: 'Total Transactions (24h)',
      value: formatNumber(stats?.totalTransactions || 0),
      icon: Activity,
      trend: '+12.5%',
      trendUp: true,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Flagged Transactions',
      value: formatNumber(stats?.flaggedTransactions || 0),
      icon: AlertTriangle,
      trend: '-3.2%',
      trendUp: false,
      color: 'text-danger',
      bgColor: 'bg-danger/10',
    },
    {
      label: 'Fraud Rate',
      value: `${fraudRate}%`,
      icon: Percent,
      trend: '-0.5%',
      trendUp: false,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Avg Transaction Amount',
      value: formatCurrency(avgAmount),
      icon: DollarSign,
      trend: '+8.1%',
      trendUp: true,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{kpi.label}</span>
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', kpi.bgColor)}>
              <kpi.icon className={cn('w-4 h-4', kpi.color)} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">{kpi.value}</span>
            <span className={cn(
              'text-xs flex items-center gap-0.5',
              kpi.trendUp ? 'text-success' : 'text-danger'
            )}>
              {kpi.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {kpi.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
