import React from 'react';
import { Transaction } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveActivityFeedProps {
  transactions: Transaction[];
  isLoading: boolean;
  onSelect?: (tx: Transaction) => void;
}

const statusConfig = {
  pending: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted' },
  processed: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  flagged: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10' },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ transactions, isLoading, onSelect }) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="h-4 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <h3 className="font-semibold">Live Activity Feed</h3>
        </div>
        <span className="text-xs text-muted-foreground">Real-time updates</span>
      </div>
      
      <div className="space-y-2">
        {transactions.map((tx, idx) => {
          const config = statusConfig[tx.status];
          const StatusIcon = config.icon;
          
          return (
            <div
              key={tx.id}
              onClick={() => onSelect?.(tx)}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border border-border/50 transition-all',
                onSelect && 'cursor-pointer hover:bg-muted/50 hover:border-border',
                idx === 0 && 'animate-fade-in'
              )}
            >
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', config.bg)}>
                <StatusIcon className={cn('w-5 h-5', config.color)} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm truncate">{tx.nameOrig}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium text-sm truncate">{tx.nameDest}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant={tx.type.toLowerCase().replace('_', '-') as any} className="text-[10px]">
                    {tx.type}
                  </Badge>
                  <span>•</span>
                  <span>{format(new Date(tx.timestamp), 'HH:mm:ss')}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">{formatCurrency(tx.amount)}</p>
                <Badge 
                  variant={tx.status === 'flagged' ? 'destructive' : tx.status === 'processed' ? 'default' : 'secondary'}
                  className="text-[10px]"
                >
                  {tx.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveActivityFeed;
