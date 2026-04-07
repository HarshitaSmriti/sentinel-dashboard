import React from 'react';
import { moodOptions } from '@/lib/mockData';
import { MoodType } from '@/lib/types';

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex justify-center gap-3 sm:gap-5 flex-wrap">
      {moodOptions.map(option => (
        <button
          key={option.mood}
          onClick={() => onSelect(option.mood)}
          className={`flex flex-col items-center gap-2 p-4 sm:p-5 rounded-3xl border transition-all duration-300 ${
            selected === option.mood
              ? 'bg-primary/10 border-primary shadow-soft scale-105'
              : 'bg-card border-border hover:border-primary/30 hover:shadow-soft'
          }`}
        >
          <span className="text-3xl sm:text-4xl animate-bounce-in">{option.emoji}</span>
          <span className={`text-xs font-medium ${
            selected === option.mood ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
