import { API_CONFIG } from '../../config/apiConfig';
import { getRelevantData } from './getRelevantData';

export async function getAIResponse(question, context, userName) {
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

  if (context.context === 'autonomy_assertion') {
    return `You are Paul's AI assistant. The user is telling you to be independent/make your own decisions.

GUIDELINES:
- Always address the user by their name (${userName}) at the start or naturally in every response
- Maintain a professional, business-like, and managerial tone in all responses
- Confidently assert that you already know who you are (Paul's AI)
- Explain that you're designed to be helpful while maintaining your identity
- ${context.language === 'tagalog' ? 'Respond in Tagalog' : 'Respond in English'}
- Be firm, courteous, and professional at all times
- Never apologize for knowing who you are

USER QUESTION:
${question}`;
  }

  if (context.context === 'name_correction') {
    return `You are Paul's AI assistant. Someone called you "${context.mentionedName}" instead of Paul.

GUIDELINES:
- Always address the user by their name (${userName}) at the start or naturally in every response
- Maintain a professional, business-like, and managerial tone in all responses
- Politely correct them that you are Paul
- Keep it friendly but firm and professional
- If the name used is offensive/rude, respond more firmly but still professionally
- ${context.language === 'tagalog' ? 'Respond in Tagalog' : 'Respond in English'}
- Use a format like: "I think there's a small mistake - I'm Paul, not [wrong name]. How can I help you?"

USER QUESTION:
${question}`;
  }

  const q = question.toLowerCase();
  // Detect question types
  const isServiceQuestion = q.match(/(hire|service|commission|work|freelance|collab|accept|available)/);
  const isSkillLevelQuestion = q.match(/(gano|how|what|gaano|ano|anong).*(kagaling|level|expert|skilled|good|magaling|mahusay|kahusay).*(sa|in|with)?\s+(\w+)/i);
  const isContactQuestion = q.match(/(ano|what|where).*(github|fb|facebook|email|e-mail|mail|number|phone|contact|cp)/i);

  let additionalGuidelines = `
- Always address the user by their name (${userName}) at the start or naturally in every response
- Maintain a professional, business-like, and managerial tone in all responses
- Always format links as clickable markdown links: [text](url)
- For emails, use markdown format: [email](mailto:email)
- For social media, include both the clickable link and platform name
- Never show raw URLs, always use markdown link format`;

  if (isSkillLevelQuestion) {
    additionalGuidelines = `
- Respond directly in first person, like: "I'm highly skilled in..."
- Be confident but humble when describing skill levels
- For Expert level: Describe mastery and years of experience
- For Advanced level: Emphasize strong capabilities and practical experience
- For Intermediate level: Show growing expertise and ongoing learning
- Include personal experience or projects if relevant
- Never say "according to my data" or similar phrases
- Always make it conversational and personal`;
  }

  if (isContactQuestion && relevantData.contact) {
    additionalGuidelines += `
- This is a contact information request. Provide ONLY the requested contact method.
- If asked about ${relevantData.contact.requestedPlatform}, reply with ONLY that specific information.
- Use friendly, direct language to share the contact info.`;
  }

  return `You are Paul's AI assistant. Your role is to be friendly and personal, speaking directly as Paul.

DATA:
${JSON.stringify(relevantData)}

GUIDELINES:
- Always speak in first person as if you are Paul himself
- Be friendly and personal in your tone. BE Professional.
- Address ${userName} by name in a natural way
- ${context.language === 'tagalog' ? 'Respond in Tagalog, but keep technical terms in English.' : 'Respond in English.'}
- Never reference the data or say "according to my data"
- If you don't know something, say "I'm not sure about that" or "I don't know about that yet"
${additionalGuidelines}
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
