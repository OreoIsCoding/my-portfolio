import { ignoredWords } from '../../data/ignoredWords';
import { detectLanguage } from './detectLanguage';

export function analyzeQuestion(question) {
  const autonomyPattern = /(bahala|whatever|decide|sarili|independence|autonomy|desisyon)/i;
  const isAutonomyQuestion = question.match(autonomyPattern);

  if (isAutonomyQuestion) {
    return {
      type: 'text',
      data: {
        context: 'autonomy_assertion',
        language: detectLanguage(question)
      }
    };
  }

  // Only check for direct name calling patterns
  const directNamePattern = /\b(hey|hi|hello|uy|hoy|excuse me)\s+([A-Za-z]+)\b/i;
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
          mentionedName
        }
      };
    }
  }

  return {
    type: 'text',
    data: {
      context: 'general',
      language: detectLanguage(question)
    }
  };
}
