import React from 'react';
import { mockMoodEntries } from '@/lib/mockData';
import Navbar from '@/components/mindmate/Navbar';
import MoodChart from '@/components/mindmate/MoodChart';
import InsightCard from '@/components/mindmate/InsightCard';

const MoodDashboard: React.FC = () => {
  const entries = mockMoodEntries;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">Your Mood Insights</h1>
          <p className="text-muted-foreground mt-1">Track your emotional patterns over time</p>
        </div>

        {/* Chart */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-soft animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Mood Over Time</h2>
          <MoodChart entries={entries} />
        </div>

        {/* Insight */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <InsightCard
            title="Pattern Detected"
            message="You've been feeling stressed for the last 3 days. Consider taking a break or talking to someone you trust."
            emoji="💡"
          />
        </div>

        {/* Mood History */}
        <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Mood History</h2>
          <div className="space-y-2">
            {entries.map(entry => (
              <div
                key={entry.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow"
              >
                <span className="text-2xl">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{entry.label}</p>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i <= entry.score ? 'bg-primary' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoodDashboard;
