import React, { useState, useEffect } from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors, FaTrophy, FaHeartBroken, FaHandshake, FaPlay, FaGamepad } from 'react-icons/fa';
import ScoreBoard from './ScoreBoard';
import GameArea from './GameArea';
import Controls from './Controls';

const choices = [
  { id: 'rock', icon: FaHandRock, beats: 'scissors' },
  { id: 'paper', icon: FaHandPaper, beats: 'rock' },
  { id: 'scissors', icon: FaHandScissors, beats: 'paper' }
];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [countdownText, setCountdownText] = useState(null);
  const [matchEnded, setMatchEnded] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChoice = (choice) => {
    if (isAnimating || matchEnded) return;
    setIsAnimating(true);
    
    const texts = ['Rock...', 'Paper...', 'Scissors...', 'Shoot!'];
    let index = 0;

    const animateText = () => {
      if (index < texts.length) {
        setCountdownText(texts[index]);
        index++;
        setTimeout(animateText, 500);
      } else {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setPlayerChoice(choice);
        setCpuChoice(randomChoice);
        determineWinner(choice, randomChoice);
        setCountdownText(null);

        const isLastMatch = matchCount >= 2;

        // Show round result briefly then handle match end
        setTimeout(() => {
          if (isLastMatch) {
            setResult(null); // Clear round result before showing final result
            setMatchEnded(true);
          } else {
            setMatchCount(prev => prev + 1);
            setTimeout(() => {
              resetRound();
              setIsAnimating(false);
            }, 1000); //I put delay here to show the result for a bit
          }
        }, 1500);
      }
    };

    animateText();
  };

  const determineWinner = (player, cpu) => {
    if (player.id === cpu.id) {
      setResult('draw');
    } else if (player.beats === cpu.id) {
      setResult('win');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('lose');
      setScore(prev => ({ ...prev, cpu: prev.cpu + 1 }));
    }
  };

  const resetRound = () => {
    setPlayerChoice(null);
    setCpuChoice(null);
    setResult(null);
  };

  const startNewMatch = () => {
    resetRound();
    setScore({ player: 0, cpu: 0 });
    setMatchCount(0);
    setMatchEnded(false);
    setIsAnimating(false);
     
  };

  const handleExit = () => {
    startNewMatch();
    setIsPlaying(false); // Return to start screen
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 
      p-4 sm:p-6 lg:p-8 w-[95%] sm:w-[90%] max-w-2xl mx-auto relative">
      
      {!isPlaying ? (
        // Game Start Screen
        <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] py-8">
          <FaGamepad className="text-5xl sm:text-6xl text-emerald-400 mb-6 animate-float-slow" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Rock Paper Scissors
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-md">
            Best of 3 rounds. Choose your moves wisely to defeat the CPU!
          </p>
          <button
            onClick={() => {
              setIsPlaying(true);
              startNewMatch();
            }}
            className="group px-8 py-4 rounded-xl bg-emerald-500/20 text-emerald-400 
              hover:bg-emerald-500/30 transition-all duration-300 hover:scale-105
              text-xl flex items-center gap-3"
          >
            <FaPlay className="group-hover:animate-pulse" />
            Start Game
          </button>
        </div>
      ) : (
        // Game Content
        <>
          <ScoreBoard matchCount={matchCount} score={score} />

          {/* Match End Overlay */}
          {matchEnded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center 
              bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl z-20 p-4 sm:p-6">
              <div className={`text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-4 sm:mb-6 flex items-center gap-3
                ${score.player > score.cpu ? 'text-emerald-400' : 
                  score.player < score.cpu ? 'text-red-400' : 'text-white'}`}>
                {score.player > score.cpu ? (
                  <><FaTrophy className="inline-block animate-bounce" /> Victory!</>
                ) : score.player < score.cpu ? (
                  <><FaHeartBroken className="inline-block animate-pulse" /> Defeat!</>
                ) : (
                  <><FaHandshake className="inline-block" /> Draw!</>
                )}
              </div>
              <div className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                Final Score: {score.player} - {score.cpu}
              </div>
              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    startNewMatch();
                    setIsPlaying(true);
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-emerald-500/20 text-emerald-400 
                    hover:bg-emerald-500/30 transition-all duration-300 hover:scale-105
                    text-sm sm:text-base"
                >
                  Play Again
                </button>
                <a
                  href="#projects"
                  onClick={handleExit}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-red-500/20 text-red-400 
                    hover:bg-red-500/30 transition-all duration-300 hover:scale-105
                    text-sm sm:text-base"
                >
                  Exit Game
                </a>
              </div>
            </div>
          )}

          {/* Countdown Text */}
          {countdownText && (
            <div className="absolute inset-0 flex items-center justify-center 
              bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl z-10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 animate-bounce">
                {countdownText}
              </div>
            </div>
          )}

          <GameArea 
            playerChoice={playerChoice}
            cpuChoice={cpuChoice}
            result={result}
          />

          {/* Result Popup */}
          {result && !matchEnded && (
            <div className="fixed bottom-24 sm:bottom-32 inset-x-0 flex items-center justify-center pointer-events-none z-30">
              <div className={`text-xl sm:text-2xl lg:text-3xl font-bold px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-3
                ${result === 'win' ? 'text-emerald-400' : 
                  result === 'lose' ? 'text-red-400' : 'text-white'}
                bg-black/80 backdrop-blur-sm rounded-xl
                animate-bounce shadow-lg border border-white/10`}>
                {result === 'win' ? (
                  <><FaTrophy className="inline-block" /> Round Win!</>
                ) : result === 'lose' ? (
                  <><FaHeartBroken className="inline-block" /> Round Lost!</>
                ) : (
                  <><FaHandshake className="inline-block" /> Draw!</>
                )}
              </div>
            </div>
          )}

          <Controls 
            choices={choices}
            onChoice={handleChoice}
            isAnimating={isAnimating}
          />
        </>
      )}
    </div>
  );
};

export default RockPaperScissors;
