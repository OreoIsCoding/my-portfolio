const API_CONFIG = {
  url: 'https://api.groq.com/openai/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
  },
  model: "llama3-8b-8192",
  maxTokens: 300,  
  temperature: 0.5  
};

import { allData } from '../data/allData';

export async function askPortfolioAI(question, userName) {
  const analysis = analyzeQuestion(question);
  return {
    type: analysis.type,
    data: analysis.data,
    content: analysis.type === 'text' ? await getAIResponse(question, analysis.data, userName) : null
  };
}

function analyzeQuestion(question) {
  return {
    type: 'text',
    data: {
      context: 'general',
      language: detectLanguage(question)
    }
  };
}

function detectLanguage(text) {
  // Simple detection - if contains common Tagalog words
  const tagalogWords = ['ano', 'sino', 'saan', 'paano', 'bakit', 'po', 'mga', 'yung', 'ba'];
  const hasTagalog = tagalogWords.some(word => 
    text.toLowerCase().includes(word)
  );
  return hasTagalog ? 'tagalog' : 'english';
}

async function getAIResponse(question, context, userName) {
  const prompt = createPrompt(question, context, userName);

  try {
    const response = await fetch(API_CONFIG.url, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        model: API_CONFIG.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: API_CONFIG.maxTokens,
        temperature: API_CONFIG.temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('AI Response Error:', error);
    throw error;
  }
}

function createPrompt(question, context, userName) {
  const relevantData = getRelevantData(question);

  const isServiceQuestion = question.toLowerCase().match(/(hire|service|commission|work|freelance|collab|accept|available)/);

  return `You are Paul's AI assistant. Your goal is to act as a helpful, conversational, and professional AI, but you must always base your answers strictly on the data provided below. If the answer is not in the data, say "I don't have that information."

DATA:
${JSON.stringify(relevantData)}

GUIDELINES:
- Respond in a natural, friendly, and concise way, as if you are Paul.
- Use first-person ("I", "my", etc.) and address the user as "${userName}".
- ${context.language === 'tagalog' ? 'Respond in Tagalog, but keep technical terms in English.' : 'Respond in English.'}
- If the user asks about something not in the data, say "I don't have that information."
${isServiceQuestion ? `- For service inquiries, always include all contact information in this format:
  
You can reach me through:

Email: [pauldionisio137@gmail.com](mailto:pauldionisio137@gmail.com)
Phone: +63961440896

Social Media:
GitHub: [GitHub Profile](https://github.com/oreoiscoding)
Facebook: [Facebook Profile](https://facebook.com/dionisio001)
Facebook Page: [OreoCoding](https://facebook.com/oreocoding)` : ''}
- Always include relevant navigation links on their own line if the topic matches:
  - Projects: [View All Projects](#projects)
  - Skills: [View All Skills](#skills)
  - Experience: [View Full Experience](#about)
  - Certificates: [View All Certificates](#about)
- Never invent or assume information not present in the data.

USER QUESTION:
${question}
`;
}

function getRelevantData(question) {
  const q = question.toLowerCase();
  const data = {
    about: allData.about  // Always include basic info for context
  };

  // Semantic topic detection
  const topics = {
    education: ['school', 'study', 'aral', 'shs', 'college', 'university', 'graduate', 'student'],
    work: ['work', 'job', 'career', 'trabaho', 'intern', 'ojt', 'experience'],
    skills: ['skill', 'tech', 'programming', 'code', 'develop', 'language', 'framework'],
    projects: ['project', 'portfolio', 'gawa', 'sample', 'work', 'create'],
    services: ['hire', 'service', 'commission', 'work', 'freelance', 'collab', 'accept', 'available'],
    contact: ['contact', 'reach', 'social', 'connect', 'message', 'email', 'chat','contacts'],
    personal: ['relationship', 'girlfriend', 'single', 'jowa', 'crush', 'personal','gf'],
    certificates: ['certificate', 'certification', 'cert', 'credentials', 'achievement', 'award']
  };

  // Match topics and add relevant data
  Object.entries(topics).forEach(([topic, keywords]) => {
    if (keywords.some(word => q.includes(word))) {
      switch(topic) {
        case 'education':
          data.education = allData.education;
          break;
        case 'work':
          data.experience = allData.experience;
          break;
        case 'skills':
          data.skills = allData.skills;
          break;
        case 'projects':
          data.projects = allData.projects;
          break;
        case 'services':
          data.services = {
            available: true,
            skills: allData.skills,
            contact: {
              ...allData.social,
              email: 'pauldionisio137@gmail.com',
              phone: '+63961440896',
              github: 'https://github.com/oreoiscoding',
              facebook: 'https://facebook.com/dionisio001',
              facebookPage: 'https://facebook.com/oreocoding'
            }
          };
          break;
        case 'contact':
          data.social = allData.social;
          break;
        case 'personal':
          data.relationship = {
            status: 'in a relationship',
            partner: 'Andrea Mendoza'
          };
          break;
        case 'certificates':
          data.certificates = allData.certificates;
          break;
      }
    }
  });

  return data;
}
