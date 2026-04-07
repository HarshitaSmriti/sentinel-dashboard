import React from 'react';

interface InsightCardProps {
  title: string;
  message: string;
  emoji: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, message, emoji }) => {
  return (
    <div className="p-5 rounded-3xl bg-secondary/50 border border-border">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{emoji}</span>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
