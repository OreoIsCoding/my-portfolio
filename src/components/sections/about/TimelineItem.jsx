import React from 'react';

export const TimelineItem = ({ item, index, isCertificates, onImageClick }) => {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center mb-3 pl-6 sm:pl-0
      transition-all duration-500 transform ${index % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
      <div className={`w-full sm:w-[49%] ${index % 2 === 1 ? 'sm:text-right' : 'sm:text-left'}`}>
        <div className={`p-3 sm:p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/5
          transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/10
          shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20
          translate-y-4 animate-slideUp group w-full
          ${index % 2 === 1 ? 'sm:ml-auto sm:mr-[-20px]' : 'sm:mr-auto sm:ml-[-20px]'}`}>
          
          <TimelineHeader year={item.year} />
          <TimelineContent item={item} />
          {isCertificates && item.image && (
            <CertificatePreview image={item.image} title={item.title} onClick={onImageClick} />
          )}
        </div>
      </div>

      <TimelineNode />
      <div className="hidden sm:block sm:w-[49%]" />
    </div>
  );
};

const TimelineHeader = ({ year }) => (
  <div className="flex items-center gap-2 mb-1.5">
    <span className="text-xs sm:text-sm text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-400/10">
      {year}
    </span>
  </div>
);

const TimelineContent = ({ item }) => (
  <>
    <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
    <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{item.company || item.institution}</p>
    <p className="text-gray-300 text-xs sm:text-sm mt-1.5 leading-relaxed">{item.description}</p>
  </>
);

const CertificatePreview = ({ image, title, onClick }) => (
  <div className="mt-3 relative group cursor-pointer" onClick={() => onClick(image)}>
    <div className="aspect-[16/11] relative overflow-hidden rounded-lg">
      <img 
        src={image} 
        alt={title}
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

const TimelineNode = () => (
  <div className="absolute left-0 sm:static w-6 sm:w-[0.5%] flex justify-center mt-5 sm:mt-0 sm:mx-[-8px]">
    <div className="relative">
      <div className="absolute -inset-1.5 bg-emerald-400/20 rounded-full blur-sm" />
      <div className="relative w-2 h-2 bg-emerald-400 rounded-full transform transition-all duration-500 
        hover:scale-150 hover:bg-emerald-300" />
    </div>
  </div>
);
