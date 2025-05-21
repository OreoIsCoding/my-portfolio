export function detectLanguage(text) {
  const tagalogWords = ['ano', 'sino', 'saan', 'paano', 'bakit', 'po', 'mga', 'yung', 'ba'];
  const hasTagalog = tagalogWords.some(word =>
    text.toLowerCase().includes(word)
  );
  return hasTagalog ? 'tagalog' : 'english';
}
