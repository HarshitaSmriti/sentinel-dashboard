// User
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
}

// Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

// Mood
export type MoodType = 'happy' | 'neutral' | 'sad' | 'angry' | 'tired';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  label: string;
  emoji: string;
  score: number;
  date: string;
  note?: string;
}

// API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
