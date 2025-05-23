import React, { useState, useRef } from 'react';
import ProjectTechStack from './ProjectTechStack';

const ProjectCard = ({ title, description, image, tech, style, onImageClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const maxLength = 100;
  const needsTruncation = description.length > maxLength;
  const truncatedText = needsTruncation 
    ? description.slice(0, maxLength).trim() + '...' 
    : description;  

  const toggleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }, 100);
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/60 to-black/40 
        rounded-2xl p-8 border border-white/10 hover:border-emerald-500/30 
        transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col h-full"
      style={style}
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden relative mb-5 rounded-xl border border-white/5">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-500
            group-hover:scale-105 group-hover:opacity-80"
        />
        <button 
          onClick={onImageClick}
          className="absolute inset-0 bg-black/40 backdrop-blur-[1px] cursor-pointer 
            flex items-center justify-center opacity-0 group-hover:opacity-100 
            transition-all duration-300"
        >
          <span className="px-4 py-2 rounded-full border border-white/20 
            bg-black/50 text-white text-xs hover:bg-black/70 transition-colors">
            Click to view
          </span>
        </button>
      </div>
      {/* Title */}
      <div className="mb-3">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
          {title}
        </h3>
        <div className="h-px w-full bg-emerald-500/20 my-2 rounded" />
      </div>
      {/* Description */}
      <div className="flex-1">
        <p className="text-gray-200 text-[0.98rem] mb-3">
          {isExpanded ? description : truncatedText}
          {needsTruncation && (
            <button
              onClick={toggleExpand}
              className="ml-1 text-emerald-400 hover:text-emerald-300 transition-colors relative z-30 text-xs"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
        <div className="h-px w-full bg-white/10 my-2 rounded" />
      </div>
      {/* Tech Stack */}
      <div className="mt-auto">
        <ProjectTechStack tech={tech} />
      </div>
    </div>
  );
};

export default ProjectCard;
