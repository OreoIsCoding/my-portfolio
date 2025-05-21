export const API_CONFIG = {
  url: 'https://api.groq.com/openai/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
  },
  model: "llama3-70b-8192",
  maxTokens: 300,
  temperature: 0.5
};
