import React, { useState } from 'react';
import Modal from './Modal';

const TimelineModal = ({ isOpen, onClose, children, title, items }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-3 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 
            bg-gradient-to-b from-emerald-500/50 via-emerald-400/30 to-emerald-500/50" />
          
          <div className="relative space-y-6">
            {items.map((item, index) => (
              <div key={index} className="relative pl-6 sm:pl-0">
                <div className={`sm:w-[46%] ${index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-[54%]'}`}>
                  <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/5
                    transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                    <span className="text-sm text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-400/10">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.institution}</p>
                    <p className="text-gray-300 text-sm mt-2">{item.description}</p>
                    
                    {item.image && (
                      <div className="mt-3 relative cursor-pointer rounded-lg overflow-hidden"
                        onClick={() => setSelectedImage(item.image)}>
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full aspect-video object-cover transition-transform duration-300
                            hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-0 top-3 sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-sm" />
                    <div className="relative w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Certificate"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </Modal>
      )}
    </div>
  );
};

export default TimelineModal;
