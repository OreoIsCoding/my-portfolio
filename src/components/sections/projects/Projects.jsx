import React, { useState, useRef } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import SectionHeader from '../../UI/SectionHeader';
import { projectsData } from '../../../data/projectsData';
import Modal from '../../UI/Modal';
import ProjectCard from './ProjectCard'; 

const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [titleRef, isTitleVisible] = useScrollAnimation(0.4, false);
  const [containerRef, isContainerVisible] = useScrollAnimation(0.3, false);  

  const initialCount = 3;
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, initialCount);
  const hasMore = projectsData.length > initialCount;

  const handleViewToggle = () => {
    if (showAll) {
      // When clicking "View less", scroll to projects section
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll(!showAll);
  };

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen bg-black/95 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`transition-all duration-1000 transform
          ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="Projects" />
          <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            A showcase of my recent web development projects, built with modern technologies
          </p>
        </div>

        <div ref={containerRef} 
          className={`mt-12 bg-black/50 rounded-2xl border border-white/10 p-6 sm:p-8
            transition-all duration-1000 transform
            ${isContainerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <div key={index} 
                className={`transition-all duration-700 delay-${index * 100}
                  ${isContainerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <ProjectCard 
                  {...project} 
                  onImageClick={() => setSelectedImage(project.image)}
                />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={handleViewToggle}
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm
                  hover:bg-emerald-500/20 transition-all duration-300 group"
              >
                {showAll ? 'View less' : 'View all'}
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

      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <img
          src={selectedImage}
          alt="Project Preview"
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </Modal>
    </section>
  );
};

export default Projects;
