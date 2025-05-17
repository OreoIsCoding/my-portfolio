import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import Modal from '../../UI/Modal';

const CertificateImage = ({ image, title, onImageClick }) => (
  <div className="mt-3 relative group cursor-pointer" onClick={() => onImageClick(image)}>
    <div className="aspect-[16/11] relative overflow-hidden rounded-lg">
      <img 
        src={image} 
        alt={`${title} Certificate`}
        className="w-full h-full object-cover rounded-lg transition-all duration-500
        group-hover:scale-110 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm">Click to view</span>
      </div>
    </div>
  </div>
);

const TimelineItem = ({ item, index, isCertificates, onImageClick }) => {
  const contentClasses = `p-3 sm:p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/5
    transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/10
    shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20
    translate-y-4 animate-slideUp group max-w-[450px] w-full
    ${index % 2 === 1 ? 'sm:ml-auto sm:mr-0' : 'sm:ml-0 sm:mr-auto'}`;

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center mb-6 pl-6 sm:pl-0
      transition-all duration-500 transform ${index % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
      <div className={`w-full sm:w-[50%] ${index % 2 === 1 ? 'sm:text-right' : 'sm:text-left'}`}>
        <div className={contentClasses}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs sm:text-sm text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-400/10">
              {item.year}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{item.company || item.institution}</p>
          <p className="text-gray-300 text-xs sm:text-sm mt-1.5 leading-relaxed">{item.description}</p>
          
          {isCertificates && item.image && (
            <CertificateImage 
              image={item.image} 
              title={item.title} 
              onImageClick={onImageClick} 
            />
          )}
        </div>
      </div>

      {/* Timeline Node */}
      <div className="absolute left-0 sm:static w-6 sm:w-[4%] flex justify-center mt-5 sm:mt-0">
        <div className="relative">
          <div className="absolute -inset-1.5 bg-emerald-400/20 rounded-full blur-sm" />
          <div className="relative w-2.5 h-2.5 bg-emerald-400 rounded-full transform transition-all duration-500 
            hover:scale-150 hover:bg-emerald-300" />
        </div>
      </div>

      <div className="hidden sm:block sm:w-[48%]" />
    </div>
  );
};

const TimelineSection = ({ title, items }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleItems, setVisibleItems] = useState(3);
  const isMobile = window.innerWidth < 640;
  const isCertificates = title === "Certificates";
  const [scrollRef, isVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 1000) {
        setVisibleItems(prev => Math.min(prev + 2, items.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, items.length]);

  const displayedItems = isMobile ? items.slice(0, visibleItems) : items;

  return (
    <div ref={scrollRef}>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">{title}</h3>
      <div className={`relative transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute left-3 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 
          bg-gradient-to-b from-emerald-500/50 via-emerald-400/30 to-emerald-500/50" />
        
        <div className="relative">
          {displayedItems.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isCertificates={isCertificates}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {isMobile && visibleItems < items.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleItems(prev => Math.min(prev + 3, items.length))}
            className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm
              hover:bg-emerald-500/20 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}

      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <img
          src={selectedImage}
          alt="Certificate"
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </Modal>
    </div>
  );
};

export default TimelineSection;
