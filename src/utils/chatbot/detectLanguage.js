export function detectLanguage(text) {
  const tagalogWords = [
    'ano', 'sino', 'saan', 'paano', 'bakit', 'po', 'mga', 'yung', 'ba',
    'ikaw', 'kami', 'tayo', 'nila', 'natin', 'kayo', 'kanila', 'dito', 'doon', 'gano', 'magkano', 'ilang', 'kailan'
  ];
  const hasTagalog = tagalogWords.some(word =>
    text.toLowerCase().includes(word)
  );
  return hasTagalog ? 'tagalog' : 'english';
}
