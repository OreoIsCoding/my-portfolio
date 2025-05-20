import { askPortfolioAI } from '../../Controller/deepseek';

export async function getResponse(question, userName) {
  try {
    const response = await askPortfolioAI(question, userName);
    return response.content || `Sorry ${userName}, I couldn't generate a proper response.`;
  } catch (error) {
    console.error('Error in getResponse:', error);
    return `${userName}, I apologize, pero may technical issue. Pwede po pakiulit yung question?`;
  }
}
