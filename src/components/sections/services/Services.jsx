import React, { useRef, useState } from 'react';
import servicesData from '../../../../datasets/servicesData.json';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import SectionHeader from '../../UI/SectionHeader';
import ServiceCard from './ServiceCard';

const Services = () => {
  const sectionRef = useRef(null);
  const [headerRef, isHeaderVisible] = useScrollAnimation(0.4, false);
  const [containerRef, isContainerVisible] = useScrollAnimation(0.4, false);
  const [showAll, setShowAll] = useState(false);

  const initialCount = 2;
  const visibleServices = showAll ? servicesData : servicesData.slice(0, initialCount);
  const hasMore = servicesData.length > initialCount;

  const handleViewToggle = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll(!showAll);
  };

  return (
    <section ref={sectionRef} id="services" className="min-h-screen bg-black/95 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <SectionHeader title="How I Can Help" />
        </div>

        {/* Container */}
        <div
          ref={containerRef}
          className={`mt-8 sm:mt-10 lg:mt-12 bg-black/50 rounded-xl sm:rounded-2xl border border-white/10 
            p-4 sm:p-6 lg:p-8 transition-all duration-1000 transform
            ${isContainerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Introduction Text */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-emerald-400 font-medium text-sm sm:text-base uppercase tracking-wider">
              Let's Build Something Great
            </p>
            <p className="text-gray-200 text-base sm:text-lg font-light leading-relaxed">
              I help create <span className="text-emerald-400 font-medium">meaningful digital experiences</span> through 
              clean code and thoughtful design. Whether you need a website, web app - I'm here to assist.
            </p>
            <p className="text-gray-400 text-sm sm:text-base italic">
              Let's turn your vision into reality.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-1/2 mx-auto bg-emerald-500/10 my-8 sm:my-10" />

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {visibleServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
          
          {/* View More/Less Button */}
          {hasMore && (
            <div className="text-center mt-8 sm:mt-12">
              <button
                onClick={handleViewToggle}
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm
                  hover:bg-emerald-500/20 transition-all duration-300 group"
              >
                {showAll ? 'View less' : 'View all'}
                {/* Arrow Icon */}
                <svg 
                  className={`w-4 h-4 ml-1 inline-block transition-transform
                    ${showAll ? 'rotate-180 group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
