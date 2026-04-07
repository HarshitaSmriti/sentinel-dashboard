import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, BarChart3, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { moodApi } from '@/lib/api';
import { moodOptions } from '@/lib/mockData';
import { MoodType } from '@/lib/types';
import { useToastNotification } from '@/components/Toast';
import MoodSelector from '@/components/mindmate/MoodSelector';
import Navbar from '@/components/mindmate/Navbar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToastNotification();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const handleMoodSelect = async (mood: MoodType) => {
    setSelectedMood(mood);
    const option = moodOptions.find(m => m.mood === mood);
    if (option) {
      await moodApi.logMood({
        mood: option.mood,
        label: option.label,
        emoji: option.emoji,
        score: option.score,
        date: new Date().toISOString().split('T')[0],
      });
      toast.success('Mood logged!', `You're feeling ${option.label.toLowerCase()} today.`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome */}
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-2">
            How are you feeling today{user?.name ? `, ${user.name}` : ''}?
          </h1>
          <p className="text-muted-foreground">Take a moment to check in with yourself</p>
        </div>

        {/* Mood Selector */}
        <div className="mb-12">
          <MoodSelector selected={selectedMood} onSelect={handleMoodSelect} />
        </div>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <button
            onClick={() => navigate('/chat')}
            className="group p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground mb-1">Start Chat</h3>
            <p className="text-sm text-muted-foreground">Talk to your AI companion about anything on your mind</p>
          </button>

          <button
            onClick={() => navigate('/mood')}
            className="group p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground mb-1">View Mood Insights</h3>
            <p className="text-sm text-muted-foreground">See trends in your emotional well-being over time</p>
          </button>
        </div>

        {/* Wellness tip */}
        <div className="mt-8 p-5 rounded-3xl bg-secondary/50 border border-border">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Daily Wellness Tip</p>
              <p className="text-sm text-muted-foreground">
                Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, exhale for 8. It can help calm your nervous system in moments of stress.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
