import { LoginCredentials, SignupCredentials, User, ApiResponse, ChatMessage, MoodEntry } from './types';
import { getRandomAiResponse } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    await delay(800);
    if (credentials.email === 'demo@mindmate.ai' && credentials.password === 'demo123') {
      return {
        success: true,
        data: {
          user: { id: '1', email: credentials.email, name: 'Alex' },
          token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
        },
      };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  logout: async (): Promise<ApiResponse<null>> => {
    await delay(200);
    return { success: true };
  },

  signup: async (credentials: SignupCredentials): Promise<ApiResponse<{ user: User }>> => {
    await delay(800);
    if (credentials.email === 'demo@mindmate.ai') {
      return { success: false, error: 'An account with this email already exists' };
    }
    return {
      success: true,
      data: {
        user: { id: Math.random().toString(36).substring(7), email: credentials.email, name: credentials.email.split('@')[0] },
      },
    };
  },

  verifyToken: async (token: string): Promise<ApiResponse<User>> => {
    await delay(200);
    if (token.startsWith('mock-jwt-token-')) {
      return { success: true, data: { id: '1', email: 'demo@mindmate.ai', name: 'Alex' } };
    }
    return { success: false, error: 'Invalid token' };
  },
};

export const chatApi = {
  sendMessage: async (message: string): Promise<ApiResponse<ChatMessage>> => {
    await delay(1200 + Math.random() * 800);
    return {
      success: true,
      data: {
        id: Math.random().toString(36).substring(2, 12),
        role: 'ai',
        content: getRandomAiResponse(),
        timestamp: new Date().toISOString(),
      },
    };
  },
};

export const moodApi = {
  logMood: async (entry: Omit<MoodEntry, 'id'>): Promise<ApiResponse<MoodEntry>> => {
    await delay(400);
    return {
      success: true,
      data: { ...entry, id: Math.random().toString(36).substring(2, 12) },
    };
  },
};
