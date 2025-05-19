import React from 'react';

const ScoreBoard = ({ matchCount, score }) => {
  return (
    <>
      <div className="text-center mb-4">
        <span className="text-gray-400">Round </span>
        <span className="text-emerald-400 font-bold">{matchCount + 1}</span>
        <span className="text-gray-400"> of 3</span>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <div className="text-emerald-400 font-bold">You</div>
          <div className="text-2xl font-bold text-white">{score.player}</div>
        </div>
        <div className="text-xl font-bold text-white">VS</div>
        <div className="text-center">
          <div className="text-red-400 font-bold">CPU</div>
          <div className="text-2xl font-bold text-white">{score.cpu}</div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
