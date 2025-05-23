import React, { useState, useRef } from "react";
import { FaCode, FaDatabase, FaPaintBrush, FaServer } from 'react-icons/fa';

const iconMap = {
  'Web Development': FaCode,
  'UI/UX Design': FaPaintBrush,
  'Backend Development': FaServer,
  'Database Integration': FaDatabase,
};

const ServiceCard = ({ service, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const maxLength = 150;
  const needsTruncation = service.description.length > maxLength;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // When collapsing, scroll card into view
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
      className="group flex flex-col h-full bg-black/70 rounded-2xl p-4 sm:p-6 lg:p-7 border border-white/10 shadow-md
        hover:border-emerald-400/30 hover:shadow-emerald-500/10 transition-all duration-400"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Title with Icon */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="flex-shrink-0">
          {React.createElement(iconMap[service.title] || FaCode, {
            className: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-emerald-400"
          })}
        </div>
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white tracking-tight">
          {service.title}
        </h3>
      </div>
      {/* Title Divider */}
      <div className="h-px w-full bg-emerald-500/10 mb-3 sm:mb-4" />
      <p className="text-gray-200 mb-3 sm:mb-4 flex-1 leading-relaxed text-sm sm:text-base transition-all duration-300">
        {isExpanded 
          ? service.description 
          : needsTruncation 
            ? `${service.description.slice(0, maxLength)}...` 
            : service.description}
        {needsTruncation && (
          <button
            onClick={toggleExpand}
            className="ml-1 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-medium"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
      {/* Content Divider */}
      <div className="h-px w-full bg-emerald-500/10 mb-3 sm:mb-4" />
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
        {service.keywords.map((kw) => (
          <span
            key={kw}
            className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
