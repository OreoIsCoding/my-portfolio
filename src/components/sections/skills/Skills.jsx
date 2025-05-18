import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import { skillsData } from '../../../data/skillsData';
import SectionHeader from '../../UI/SectionHeader';
import ToolsMarquee from './ToolsMarquee';

const SkillBar = ({ name, level, icon: Icon }) => {
  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'from-emerald-500 to-emerald-400';
      case 'Advanced': return 'from-emerald-400 to-emerald-300';
      case 'Intermediate': return 'from-emerald-300 to-emerald-200';
      default: return 'from-emerald-200 to-emerald-100';
    }
  };

  const getLevelWidth = (level) => {
    switch(level) {
      case 'Expert': return 'w-full';
      case 'Advanced': return 'w-[85%]';
      case 'Intermediate': return 'w-[70%]';
      default: return 'w-[50%]';
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
          <span className="text-sm text-gray-200">{name}</span>
        </div>
        <span className="text-xs text-emerald-400">{level}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getLevelColor(level)} rounded-full 
          transition-all duration-1000 ease-out ${getLevelWidth(level)}`}
        />
      </div>
    </div>
  );
};

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
          className={`mt-12 bg-black/50 rounded-2xl border border-white/10 p-6 sm:p-8
            transition-all duration-1000 transform
            ${isContainerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div ref={skillsRef} 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8
              transition-all duration-1000 transform
              ${isSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {skillsData.map((category, index) => (
              <div 
                key={category.category}
                className="bg-black/50 rounded-xl p-6 border border-white/10
                  transform transition-all duration-500 hover:bg-white/5"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  {category.icon && <category.icon className="w-6 h-6 text-emerald-400" />}
                  <h3 className="text-xl font-bold text-emerald-400">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
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
