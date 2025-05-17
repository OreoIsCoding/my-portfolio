import React from 'react';

const SectionHeader = ({ title }) => {
  return (
    <div className="relative mb-16">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] sm:w-[400px] h-32 bg-emerald-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Title Content */}
      <div className="relative flex flex-col items-center gap-3">
        {/* Top Line */}
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="relative px-4 py-2">
            <span className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-lg" />
            <span className="relative bg-gradient-to-r from-white via-emerald-200 to-white 
              text-transparent bg-clip-text">
              {title}
            </span>
          </span>
        </h2>

        {/* Bottom Line */}
        <div className="flex items-center gap-1.5">
          <span className="block w-1 h-1 bg-emerald-500/40 rounded-full animate-pulse" />
          <span className="block w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse delay-75" />
          <span className="block w-1 h-1 bg-emerald-500/40 rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
