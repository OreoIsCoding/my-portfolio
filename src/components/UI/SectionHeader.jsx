import React from 'react';

const SectionHeader = ({ title }) => {
  return (
    <div className="relative mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] sm:w-[500px] h-24 sm:h-32 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-full blur-[80px]" />
      </div>

      {/* Main Content */}
      <div className="relative py-4 sm:py-6 md:py-8">
        {/* Top Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
          <div className="h-[1px] sm:h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500/50 rounded-full animate-pulse" />
          <div className="h-[1px] sm:h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </div>

        {/* Title Container */}
        <div className="text-center space-y-1 sm:space-y-2">
          <span className="inline-block text-[8px] sm:text-[10px] text-emerald-400/70 tracking-[0.15em] sm:tracking-[0.2em] uppercase 
            px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 whitespace-normal">
            {title.toLowerCase().split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {i !== 0 && ' '}✧ {word}
              </React.Fragment>
            ))}
            ✧
          </span>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-2">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 
                to-emerald-500/0 rounded-lg blur-xl" />
              <span className="relative bg-gradient-to-r from-white via-emerald-200 to-white 
                text-transparent bg-clip-text">
                {title}
              </span>
            </span>
          </h2>
        </div>

        {/* Corner Accents - Hidden on mobile */}
        <div className="hidden sm:block absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-4 sm:w-8 h-4 sm:h-8 border-l border-t sm:border-l-2 sm:border-t-2 border-emerald-500/20" />
        <div className="hidden sm:block absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-4 sm:w-8 h-4 sm:h-8 border-r border-t sm:border-r-2 sm:border-t-2 border-emerald-500/20" />
        <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 sm:w-8 h-4 sm:h-8 border-l border-b sm:border-l-2 sm:border-b-2 border-emerald-500/20" />
        <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-4 sm:w-8 h-4 sm:h-8 border-r border-b sm:border-r-2 sm:border-b-2 border-emerald-500/20" />
      </div>
    </div>
  );
};

export default SectionHeader;
