import React, { useState, useRef, useEffect } from 'react';
import { Plus, Send, Menu, X } from 'lucide-react';
import { ChatMessage, ChatSession } from '@/lib/types';
import { chatApi } from '@/lib/api';
import { mockChatSessions } from '@/lib/mockData';
import ChatBubble from '@/components/mindmate/ChatBubble';
import TypingIndicator from '@/components/mindmate/TypingIndicator';
import Navbar from '@/components/mindmate/Navbar';

const Chat: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(mockChatSessions);
  const [activeSessionId, setActiveSessionId] = useState(sessions[0]?.id || '');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 12),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setSessions(prev => prev.map(s =>
      s.id === activeSessionId ? { ...s, messages: [...s.messages, userMsg] } : s
    ));
    setInput('');
    setIsTyping(true);

    const result = await chatApi.sendMessage(userMsg.content);
    setIsTyping(false);
    if (result.success && result.data) {
      setSessions(prev => prev.map(s =>
        s.id === activeSessionId ? { ...s, messages: [...s.messages, result.data!] } : s
      ));
    }
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Math.random().toString(36).substring(2, 12),
      title: `New Chat`,
      date: new Date().toISOString().split('T')[0],
      messages: [],
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setSidebarOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-foreground/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-card border-r border-border flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          pt-16 lg:pt-0
        `}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground text-sm">Chat History</h2>
            <button
              onClick={handleNewChat}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-primary"
              aria-label="New chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No chats yet. Start a new conversation!
              </div>
            ) : (
              sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => { setActiveSessionId(session.id); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    session.id === activeSessionId
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <p className="truncate">{session.title}</p>
                  <p className="text-xs opacity-60 mt-0.5">{session.date}</p>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden p-3 border-b border-border">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            {messages.length === 0 && !isTyping ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="mx-auto w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground">Start a conversation</h3>
                  <p className="text-sm text-muted-foreground">
                    Share what's on your mind. I'm here to listen and support you, without judgment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-4">
                {messages.map((msg, i) => (
                  <ChatBubble key={msg.id} message={msg} delay={i * 50} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 sm:px-6">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Talk to me..."
                className="flex-1 px-4 py-3 rounded-2xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-3 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
