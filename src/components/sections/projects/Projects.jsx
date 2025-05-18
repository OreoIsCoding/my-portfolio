import React, { useState } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import SectionHeader from '../../UI/SectionHeader';
import { projectsData } from '../../../data/projectsData';
import Modal from '../../UI/Modal';
import ProjectCard from './ProjectCard'; 

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="projects" className="min-h-screen bg-black/95 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="Projects" />
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {projectsData.map((project, index) => (
            <div key={index} 
              className={`transition-all duration-1000 delay-${index * 200}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <ProjectCard 
                {...project} 
                onImageClick={() => setSelectedImage(project.image)}
              />
            </div>
          ))}
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
