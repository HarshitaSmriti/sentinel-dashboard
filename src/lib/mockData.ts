import { ChatSession, MoodEntry, ChatMessage } from './types';

const generateId = () => Math.random().toString(36).substring(2, 12);

const aiResponses = [
  "I hear you, and I want you to know that what you're feeling is completely valid. Would you like to talk more about what's been going on?",
  "It sounds like you're going through a lot right now. Remember, it's okay to take things one step at a time. What feels most overwhelming?",
  "Thank you for sharing that with me. It takes courage to open up. Have you tried any relaxation techniques lately, like deep breathing or a short walk?",
  "I understand that can be really stressful, especially during exam season. Let's break this down together — what's the most pressing thing on your mind?",
  "Your feelings matter, and I'm here to listen without judgment. Sometimes just putting thoughts into words can help. Tell me more?",
  "That's a really insightful observation about yourself. Self-awareness is a powerful tool. What do you think might help you feel a bit better today?",
  "It's perfectly normal to feel that way. Many students experience similar feelings. Would you like me to suggest some coping strategies that others have found helpful?",
  "I appreciate you trusting me with this. Let's explore what's been triggering these feelings. When did you first start noticing them?",
];

export const getRandomAiResponse = (): string => {
  return aiResponses[Math.floor(Math.random() * aiResponses.length)];
};

export const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Feeling stressed about exams',
    date: '2026-04-07',
    messages: [
      { id: 'm1', role: 'user', content: 'I have been feeling really stressed about my upcoming exams.', timestamp: '2026-04-07T10:00:00Z' },
      { id: 'm2', role: 'ai', content: "I hear you, and exam stress is something so many students deal with. It's completely natural to feel this way. Can you tell me what subject is worrying you the most?", timestamp: '2026-04-07T10:00:03Z' },
      { id: 'm3', role: 'user', content: 'Data Structures. I feel like I am so behind.', timestamp: '2026-04-07T10:01:00Z' },
      { id: 'm4', role: 'ai', content: "Feeling behind can be overwhelming, but remember — you don't have to catch up on everything at once. Let's think about one small topic you could start with today. Sometimes breaking it into tiny steps makes it feel manageable. What's one concept you'd like to review first?", timestamp: '2026-04-07T10:01:04Z' },
    ],
  },
  {
    id: '2',
    title: 'Trouble sleeping lately',
    date: '2026-04-06',
    messages: [
      { id: 'm5', role: 'user', content: "I haven't been able to sleep well for the past week.", timestamp: '2026-04-06T23:00:00Z' },
      { id: 'm6', role: 'ai', content: "I'm sorry to hear that. Sleep issues can really affect how you feel during the day. Have you noticed any changes in your routine or anything that might be keeping your mind active at night?", timestamp: '2026-04-06T23:00:03Z' },
    ],
  },
  {
    id: '3',
    title: 'Feeling homesick',
    date: '2026-04-05',
    messages: [
      { id: 'm7', role: 'user', content: 'I really miss my family. Being away from home is hard.', timestamp: '2026-04-05T18:00:00Z' },
      { id: 'm8', role: 'ai', content: "Homesickness is such a common and deeply human feeling, especially when you're living away for the first time. It shows how much your family means to you. Have you been able to call or video chat with them recently?", timestamp: '2026-04-05T18:00:04Z' },
    ],
  },
];

export const mockMoodEntries: MoodEntry[] = [
  { id: '1', mood: 'happy', label: 'Happy', emoji: '😊', score: 5, date: '2026-04-07' },
  { id: '2', mood: 'neutral', label: 'Okay', emoji: '😐', score: 3, date: '2026-04-06' },
  { id: '3', mood: 'sad', label: 'Sad', emoji: '😔', score: 2, date: '2026-04-05' },
  { id: '4', mood: 'sad', label: 'Sad', emoji: '😔', score: 2, date: '2026-04-04' },
  { id: '5', mood: 'tired', label: 'Tired', emoji: '😴', score: 2, date: '2026-04-03' },
  { id: '6', mood: 'neutral', label: 'Okay', emoji: '😐', score: 3, date: '2026-04-02' },
  { id: '7', mood: 'happy', label: 'Happy', emoji: '😊', score: 4, date: '2026-04-01' },
  { id: '8', mood: 'angry', label: 'Frustrated', emoji: '😡', score: 1, date: '2026-03-31' },
  { id: '9', mood: 'happy', label: 'Happy', emoji: '😊', score: 5, date: '2026-03-30' },
  { id: '10', mood: 'neutral', label: 'Okay', emoji: '😐', score: 3, date: '2026-03-29' },
  { id: '11', mood: 'tired', label: 'Tired', emoji: '😴', score: 2, date: '2026-03-28' },
  { id: '12', mood: 'happy', label: 'Happy', emoji: '😊', score: 4, date: '2026-03-27' },
  { id: '13', mood: 'sad', label: 'Sad', emoji: '😔', score: 2, date: '2026-03-26' },
  { id: '14', mood: 'neutral', label: 'Okay', emoji: '😐', score: 3, date: '2026-03-25' },
];

export const moodOptions = [
  { mood: 'happy' as const, emoji: '😊', label: 'Happy', score: 5 },
  { mood: 'neutral' as const, emoji: '😐', label: 'Okay', score: 3 },
  { mood: 'sad' as const, emoji: '😔', label: 'Sad', score: 2 },
  { mood: 'angry' as const, emoji: '😡', label: 'Frustrated', score: 1 },
  { mood: 'tired' as const, emoji: '😴', label: 'Tired', score: 2 },
];
