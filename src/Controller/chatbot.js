import { API_CONFIG } from '../config/apiConfig';
import { analyzeQuestion } from '../utils/chatbot/analyzeQuestion';
import { getAIResponse } from '../utils/chatbot/getAIResponse';

export async function askPortfolioAI(question, userName) {
  const analysis = analyzeQuestion(question, userName);
  return {
    type: analysis.type,
    data: analysis.data,
    content: analysis.type === 'text' ? await getAIResponse(question, analysis.data, userName) : null
  };
}
