export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: { label: string; actionId: string }[]; // Optional array for interactive actions
};

// Define the structure for chat history compatible with Genkit flow
export type ChatHistoryItem = {
  role: 'user' | 'assistant';
  content: string;
};
