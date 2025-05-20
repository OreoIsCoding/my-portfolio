import React from 'react';

const TypingIndicator = () => (
  <div className="flex gap-2 items-center px-4 py-2">
    <span className="w-2 h-2 rounded-full bg-emerald-400/60 animate-bounce [animation-delay:-0.3s]"></span>
    <span className="w-2 h-2 rounded-full bg-emerald-400/60 animate-bounce [animation-delay:-0.15s]"></span>
    <span className="w-2 h-2 rounded-full bg-emerald-400/60 animate-bounce"></span>
  </div>
);

export default TypingIndicator;
