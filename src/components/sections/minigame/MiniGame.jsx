import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import SectionHeader from '../../UI/SectionHeader';
import RockPaperScissors from './RockPaperScissors';

const Games = () => {
  const [titleRef, isTitleVisible] = useScrollAnimation(0.4, false);
  const [containerRef, isVisible] = useScrollAnimation(0.5, false);

  return (
    <section id="game" className="min-h-screen bg-black/95 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`transition-all duration-1000 transform
          ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="Mini Game" />
          <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            Take a break and play some game!
          </p>
        </div>

        <div ref={containerRef} 
          className={`mt-12 transition-all duration-1000 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <RockPaperScissors />
        </div>
      </div>
    </section>
  );
};

export default Games;
