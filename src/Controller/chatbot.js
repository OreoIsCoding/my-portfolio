import { API_CONFIG } from '../config/apiConfig';
import { analyzeQuestion } from '../utils/chatbot/analyzeQuestion';
import { getAIResponse } from '../utils/chatbot/getAIResponse';

// Store last topic in memory 
let lastTopic = '';

export async function askPortfolioAI(question, userName) {
  try {
    const analysis = analyzeQuestion(question, userName);

    // Pass lastTopic in context for flow
    const contextWithFlow = {
      ...analysis.data,
      lastTopic
    };

    const content = analysis.type === 'text'
      ? await getAIResponse(question, contextWithFlow, userName)
      : null;

    // Update lastTopic for next turn  
    lastTopic = question;

    return {
      type: analysis.type,
      data: analysis.data,
      content
    };
  } catch (err) {
    return {
      type: 'error',
      content: 'Sorry, something went wrong while processing your request.'
    };
  }
}
