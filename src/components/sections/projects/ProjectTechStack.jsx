import React from 'react';

const ProjectTechStack = ({ tech = [] }) => (
  <div className="flex flex-wrap gap-2">
    {tech?.map((item, index) => (
      <span key={index} 
        className="text-xs px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 
          border border-emerald-400/20">
        {item}
      </span>
    ))}
  </div>
);

ProjectTechStack.defaultProps = {
  tech: []
};

export default ProjectTechStack;
