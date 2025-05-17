import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import AboutBox from './AboutBox';
import TimelineSection from './TimelineSection';
import CertificatesAlbum from './CertificatesAlbum';
import { experienceData, educationData, certificatesData } from '../../../data/timelineData';

const About = () => {
  const [titleRef, isTitleVisible] = useScrollAnimation();
  const [aboutBoxRef, isAboutBoxVisible] = useScrollAnimation();
  const [timelineRef, isTimelineVisible] = useScrollAnimation(0.05);

  return (
    <section id="about" className="min-h-screen bg-black/95 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className={`text-3xl sm:text-4xl font-bold text-white mb-16 text-center
          transition-all duration-1000 transform
          ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          About Me
        </h2>

        <div ref={aboutBoxRef} className={`transition-all duration-1000 transform
          ${isAboutBoxVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <AboutBox />
        </div>

        <div ref={timelineRef} className={`space-y-20 sm:space-y-24 transition-all duration-1000
          ${isTimelineVisible ? 'opacity-100' : 'opacity-0'}`}>
          <TimelineSection title="Experience" items={experienceData} />
          <TimelineSection title="Education" items={educationData} />
          <CertificatesAlbum certificates={certificatesData} />
        </div>
      </div>
    </section>
  );
};

export default About;
