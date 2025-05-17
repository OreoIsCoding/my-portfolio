import React, { useState } from 'react';
import TimelineModal from '../../UI/TimelineModal';

const CertificatesAlbum = ({ certificates }) => {
  const [showTimeline, setShowTimeline] = useState(false);
  const previewCert = certificates[certificates.length - 1];  

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden
        transform transition-all duration-500 hover:bg-white/10 cursor-pointer group"
        onClick={() => setShowTimeline(true)}
      >
        {/* Album Header */}
        <div className="p-3 sm:p-4 flex justify-between items-center">
          <h3 className="text-lg sm:text-xl font-bold text-white">Certificates</h3>
          <span className="text-emerald-400 text-xs sm:text-sm">{certificates.length} items</span>
        </div>

        {/* Preview Area */}
        <div className="relative aspect-[16/9]">
          <img 
            src={previewCert.image}
            alt="Latest Certificate"
            className="w-full h-full object-cover transition-transform duration-500
              group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Overlay Content */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-400/20 
                backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium text-xs sm:text-sm">Certificate Collection</h4>
                <p className="text-gray-300 text-xs">Click to view all certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      <TimelineModal 
        isOpen={showTimeline} 
        onClose={() => setShowTimeline(false)}
        title="My Certificates"
        items={certificates}
      />
    </div>
  );
};

export default CertificatesAlbum;
