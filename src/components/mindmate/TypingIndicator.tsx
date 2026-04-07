import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs">🤖</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">MindMate</span>
        </div>
        <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-typing" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-typing" style={{ animationDelay: '200ms' }} />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-typing" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
