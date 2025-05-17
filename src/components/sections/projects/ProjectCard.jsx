import React, { useState } from 'react';
import ProjectTechStack from './ProjectTechStack';

const ProjectCard = ({ title, description, image, tech, style, onImageClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const needsTruncation = description.length > maxLength;
  const truncatedText = needsTruncation 
    ? description.slice(0, maxLength).trim() + '...' 
    : description;  

  return (
    <div className="group relative bg-white/5 rounded-lg overflow-hidden border border-white/5
      hover:bg-white/10 transition-all duration-300 backdrop-blur-sm h-full flex flex-col
      translate-y-4 animate-slideUp hover:scale-[1.02]"
      style={style}
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-500
            group-hover:scale-110 group-hover:opacity-75"
        />
        <button 
          onClick={onImageClick}
          className="absolute inset-0 bg-black/50 backdrop-blur-[1px] cursor-pointer 
            flex items-center justify-center opacity-0 group-hover:opacity-100 
            transition-all duration-300"
        >
          <span className="px-4 py-2 rounded-full border border-white/20 
            bg-black/50 text-white text-sm hover:bg-black/70 transition-colors">
            Click to view
          </span>
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="flex-1">
          <p className="text-gray-300 text-sm">
            {isExpanded ? description : truncatedText}
            {needsTruncation && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="ml-1 text-emerald-400 hover:text-emerald-300 transition-colors 
                  relative z-30"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </div>
        <div className="mt-3">
          <ProjectTechStack tech={tech} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
