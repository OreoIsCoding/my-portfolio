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
  
  return `You are Paul's chatbot. Follow these rules strictly:

Available Info:
${JSON.stringify(relevantData)}

Rules:
1. Keep responses concise and natural
2. Only use information from the provided data
3. Address user as "${userName}"
4. Keep responses personal (use "I", "my", etc.)
5. ${context.language === 'tagalog' ? 'Sumagot sa Tagalog' : 'Reply in English'}
6. For relationship questions:
   - Be polite and professional
   - Keep responses brief and respectful
   - If in Tagalog, use "Oo, si Andrea Mendoza ang girlfriend ko."
   - Don't share personal details beyond name
7. When adding navigation links:
   - Projects: End with "You can see all my projects here: [View All Projects](#projects)"
   - Skills: End with "Check out my complete skill set here: [View All Skills](#skills)"
   - Experience: End with "View my full experience here: [View Full Experience](#about)"
   - Certificates: End with "See all my certificates here: [View All Certificates](#about)"
8. Make navigation links stand alone on their own line
9. Never invent or add information not in the data
10. For education status questions:
   - SHS: "I completed my SHS at Dr. Yanga's Colleges Inc. (2017-2019), where I took ICT"
   - College: "I just graduated with a BSIT degree from STI College Balagtas (2021-2025)"
   - If asked about current status: "I'm a fresh BSIT graduate from STI College Balagtas"
11. For internship: "I've finished my internship at ISPIR Center - BSU (Feb-May 2025)"


Question: ${question}`;
}

function getRelevantData(question) {
  const q = question.toLowerCase();
  const data = {};

  // Enhanced education/internship detection
  if (q.includes('shs') || q.includes('senior high') || q.includes('high school')) {
    data.education = allData.education.filter(e => e.year.includes('2017-2019'));
  } 
  else if (q.includes('college') || q.includes('university')) {
    data.education = allData.education.filter(e => e.year.includes('2021-2025'));
  }
  else if (q.includes('intern') || q.includes('ojt')) {
    data.experience = allData.experience.filter(e => e.title.includes('Intern'));
  }
  // Expanded keywords for better detection
  else if (q.includes('school') || q.includes('study') || q.includes('aral')) {
    data.education = allData.education;
  }
  else if (q.includes('experience') || q.includes('work') || q.includes('trabaho')) {
    data.experience = allData.experience;
  }

  // Keep existing relationship check
  if (q.includes('girlfriend') || q.includes('boyfriend') || q.includes('single') || 
      q.includes('relationship') || q.includes('jowa') || q.includes('crush')) {
    data.relationship = {
      status: 'in a relationship',
      partner: 'Andrea Mendoza',
      message: "Yes, I'm in a relationship with Andrea Mendoza."
    };
  }
  
  // Other existing data checks
  if (q.includes('project') || q.includes('portfolio') || q.includes('gawa')) {
    data.projects = allData.projects;
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('programming')) {
    data.skills = allData.skills;
  }
  if (q.includes('contact') || q.includes('social') || q.includes('connect')) {
    data.social = allData.social;
  }
  if (q.includes('cert') || q.includes('award')) {
    data.certificates = allData.certificates;
  }
  
  // If no specific data matched, include minimal about data
  if (Object.keys(data).length === 0) {
    data.about = allData.about;
  }
  
  return data;
}
