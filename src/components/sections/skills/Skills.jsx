import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import { skillsData } from '../../../data/skillsData';
import SectionHeader from '../../UI/SectionHeader';
import ToolsMarquee from './ToolsMarquee';

const SkillBar = ({ name, level, icon: Icon }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
        <span className="text-sm text-gray-200">{name}</span>
      </div>
      <span className="text-xs text-emerald-400">{level}%</span>
    </div>
    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full 
          transition-all duration-1000 ease-out"
        style={{ width: `${level}%`, transform: 'translateX(-100%)', opacity: 0 }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="skills" className="min-h-screen bg-black/95 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={`transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="Skills" />
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {skillsData.map((category, index) => (
            <div 
              key={category.category}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10
                transform transition-all duration-500 hover:bg-white/10"
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
        <ToolsMarquee />
      </div>
    </section>
  );
};

export default Skills;
