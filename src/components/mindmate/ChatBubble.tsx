import React from 'react';
import { ChatMessage } from '@/lib/types';

interface ChatBubbleProps {
  message: ChatMessage;
  delay?: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, delay = 0 }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`max-w-[80%] sm:max-w-[70%] ${isUser ? 'order-1' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs">🤖</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">MindMate</span>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted text-foreground rounded-bl-md'
          }`}
        >
          {message.content}
        </div>
        <p className={`text-[10px] text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
