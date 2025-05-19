import React from 'react';

const Controls = ({ choices, onChoice, isAnimating }) => {
  return (
    <div className="flex justify-center gap-4">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onChoice(choice)}
          disabled={isAnimating}
          className={`p-4 rounded-xl bg-white/5 border border-white/10 
            hover:bg-white/10 transition-all duration-300
            ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
        >
          <choice.icon className="text-3xl sm:text-4xl text-white" />
        </button>
      ))}
    </div>
  );
};

export default Controls;
