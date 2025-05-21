export const API_CONFIG = {
  url: 'https://api.cohere.com/v2/chat',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
    'Cohere-Version': '2022-12-06'
  },
  model: "command-a-03-2025",
  maxTokens: 300,
  temperature: 0.7
};
