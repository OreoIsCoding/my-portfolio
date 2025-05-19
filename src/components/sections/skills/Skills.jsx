import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import { skillsData } from '../../../data/skillsData';
import SectionHeader from '../../UI/SectionHeader';
import ToolsMarquee from './ToolsMarquee';
import SkillChip from './SkillChip';

const Skills = () => {
  const [titleRef, isTitleVisible] = useScrollAnimation(0.4, false);
  const [containerRef, isContainerVisible] = useScrollAnimation(0.5, false);
  const [skillsRef, isSkillsVisible] = useScrollAnimation(0.5, false);
  const [toolsRef, isToolsVisible] = useScrollAnimation(0.5, false);

  return (
    <section id="skills" className="min-h-screen bg-black/95 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`transition-all duration-1000 transform
          ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="Skills" />
        </div>

        <div ref={containerRef} 
          className={`mt-12 bg-gradient-to-b from-black/80 via-black/50 to-black/80 rounded-3xl 
            border border-white/10 p-8 sm:p-10 backdrop-blur-xl
            transition-all duration-1000 transform
            ${isContainerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div ref={skillsRef} 
            className={`grid grid-cols-1 xl:grid-cols-3 gap-8 transition-all duration-1000 transform
              ${isSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {skillsData.map((category, index) => (
              <div 
                key={category.category}
                className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/60 to-black/40 
                  rounded-2xl p-8 border border-white/10 hover:border-emerald-500/30 
                  transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    {category.icon && <category.icon className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform duration-500" />}
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-400 
                      bg-clip-text text-transparent">
                      {category.category}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {category.skills.map((skill) => (
                      <SkillChip key={skill.name} {...skill} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div ref={toolsRef} 
            className={`mt-12 transition-all duration-1000 transform
              ${isToolsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ToolsMarquee />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
