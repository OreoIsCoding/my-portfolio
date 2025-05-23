import React from 'react';

const SkillChip = ({ name, level, icon }) => (
  <div className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 
    hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300">
    {icon}
    <span className="text-sm font-medium text-gray-100">{name}</span>
    <span className={`ml-auto text-xs px-2.5 py-1 rounded-md font-medium tracking-wide
      ${level === 'Expert' ? 'bg-emerald-500/10 text-emerald-400' :      
        level === 'Advanced' ? 'bg-amber-500/10 text-amber-400' :         
        level === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' :      
        'bg-gray-500/10 text-gray-400'}`}>                             
      {level}
    </span>
  </div>
);

export default SkillChip;
