import React from 'react';
import SectionHeader from '../../UI/SectionHeader';
import { 
  FaGitAlt, FaGithub, FaCode, FaNpm, 
  FaFigma, FaReact, FaHtml5, FaCss3Alt,
  FaJs, FaDatabase, FaCodeBranch
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiFirebase,
  SiVuedotjs 
} from 'react-icons/si';

const tools = [
  { Icon: FaReact, name: 'React' },
  { Icon: FaJs, name: 'JavaScript' },
  { Icon: FaHtml5, name: 'HTML5' },
  { Icon: FaCss3Alt, name: 'CSS3' },
  { Icon: FaFigma, name: 'Figma' },
  { Icon: FaDatabase, name: 'SQL' },
  {Icon:SiVuedotjs, name: 'Vue'},
  { Icon: SiTailwindcss, name: 'TailwindCSS' },
   { Icon: SiFirebase, name: 'Firebase' },
  { Icon: FaGitAlt, name: 'Git' },
  { Icon: FaGithub, name: 'GitHub' },
  { Icon: FaNpm, name: 'NPM' }
];

const ToolsMarquee = () => {
  return (
    <div className="relative">
     
     <div className='mt-12'>
      <SectionHeader title="Tools & Technologies" />
        </div>
      {/* Marquee */}
      <div className="relative w-full overflow-hidden bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="flex w-fit animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {tools.map((tool, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center gap-2 px-8 py-6 text-white/70 hover:text-emerald-400 
                    transition-colors duration-300"
                >
                  <tool.Icon className="w-6 h-6" />
                  <span className="text-sm whitespace-nowrap">{tool.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsMarquee;
