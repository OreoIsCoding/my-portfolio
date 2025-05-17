import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import AboutBox from './AboutBox';
import TimelineSection from './TimelineSection';
import SectionHeader from '../../UI/SectionHeader';
import { experienceData, educationData, certificatesData } from '../../../data/timelineData';

const About = () => {
  const [titleRef, isTitleVisible] = useScrollAnimation(0.1, true);
  const [aboutBoxRef, isAboutBoxVisible] = useScrollAnimation(0.1, true);
  const [timelineRef, isTimelineVisible] = useScrollAnimation(0.05, true);

  return (
    <section id="about" className="min-h-screen bg-black/95 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`transition-all duration-1000 transform
          ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="About Me" />
        </div>

        <div ref={aboutBoxRef} className={`transition-all duration-1000 transform
          ${isAboutBoxVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <AboutBox />
        </div>

        <div ref={timelineRef} className={`space-y-20 sm:space-y-24 transition-all duration-1000
          ${isTimelineVisible ? 'opacity-100' : 'opacity-0'}`}>
          <TimelineSection title="Experience" items={experienceData} />
          <TimelineSection title="Education" items={educationData} />
          <TimelineSection title="Certificates" items={certificatesData} initialVisibleCount={3} />
        </div>
      </div>
    </section>
  );
};

export default About;
