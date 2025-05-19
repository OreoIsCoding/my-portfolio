import React from 'react';

const GameArea = ({ playerChoice, cpuChoice, result }) => {
  return (
    <div className="flex justify-center gap-8 sm:gap-16 mb-8 relative min-h-[160px] sm:min-h-[200px]">
      <div className="text-center">
        <div className="text-6xl sm:text-7xl mb-4">
          {playerChoice ? 
            <playerChoice.icon className={`text-emerald-400 transform transition-all duration-300
              ${result === 'win' ? 'scale-110 animate-pulse' : ''}`} /> : 
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 animate-pulse" />
          }
        </div>
      </div>
      <div className="text-center">
        <div className="text-6xl sm:text-7xl mb-4">
          {cpuChoice ? 
            <cpuChoice.icon className={`text-red-400 transform transition-all duration-300
              ${result === 'lose' ? 'scale-110 animate-pulse' : ''}`} /> :
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 animate-pulse" />
          }
        </div>
      </div>
    </div>
  );
};

export default GameArea;
