import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import { TimelineItem } from './TimelineItem';

const TimelineSection = ({ title, items, initialVisibleCount = 3 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, initialVisibleCount);
  const hasMore = items.length > initialVisibleCount;

  // Scroll to section top when "View less" is clicked
  const handleViewToggle = () => {
    if (showAll) {
      // Scroll to the section header
      const section = document.getElementById(`timeline-section-${title}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setShowAll(!showAll);
  };

  return (
    <div id={`timeline-section-${title}`}>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">{title}</h3>
      <div className="relative">
        {/* Timeline Center Line */}
        <div className="absolute left-3 sm:left-1/2 transform sm:-translate-x-1/2 h-[95%] w-0.5 
          bg-gradient-to-b from-emerald-500/50 via-emerald-400/30 to-emerald-500/50" />
        
        {/* Timeline Items */}
        <div className="relative pb-8">
          {displayedItems.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isCertificates={title === "Certificates"}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <div className="text-center mt-12 relative z-10">
            <button
              onClick={handleViewToggle}
              className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm
                hover:bg-emerald-500/20 transition-all duration-300 group"
            >
              {showAll ? 'View less' : 'View all'}
              <svg className={`w-4 h-4 ml-1 inline-block transition-transform
                ${showAll ? 'rotate-180 group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <img
          src={selectedImage}
          alt="Preview"
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </Modal>
    </div>
  );
};

export default TimelineSection;
