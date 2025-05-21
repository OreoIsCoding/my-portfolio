import { ignoredWords } from '../../data/ignoredWords';
import { detectLanguage } from './detectLanguage';

export function analyzeQuestion(question, userName) {
  const autonomyPattern = /(bahala|whatever|decide|sarili|independence|autonomy|desisyon|ikaw na|ikaw bahala|up to you)/i;
  const isAutonomyQuestion = question.match(autonomyPattern);

  if (isAutonomyQuestion) {
    return {
      type: 'text',
      data: {
        context: 'autonomy_assertion',
        language: detectLanguage(question),
        userName
      }
    };
  }

  // Improved direct name calling patterns, allow for more greetings and trailing punctuation
  const directNamePattern = /\b(hey|hi|hello|uy|hoy|excuse me|yo|oi|oy)[\s,]+([A-Za-z]+)[!,.]?\b/i;
  const match = question.match(directNamePattern);

  if (match) {
    const mentionedName = match[2].toLowerCase();
    if (
      mentionedName !== 'paul' &&
      !['ai', 'assistant', 'chatbot'].includes(mentionedName) &&
      !ignoredWords.includes(mentionedName)
    ) {
      return {
        type: 'text',
        data: {
          context: 'name_correction',
          language: detectLanguage(question),
          mentionedName,
          userName
        }
      };
    }
  }

  return {
    type: 'text',
    data: {
      context: 'general',
      language: detectLanguage(question),
      userName
    }
  };
}
