import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, 
  FaPython, FaJava, FaGitAlt, FaFigma, 
  FaDatabase, FaCodeBranch, FaCode
} from 'react-icons/fa';

import { 
  SiTailwindcss, SiTypescript, SiFirebase,
  SiVuedotjs
} from 'react-icons/si';

export const skillsData = [
  {
    category: "Frontend",
    icon: FaReact,
    skills: [
      { name: "React", level: 85, icon: FaReact },
      { name: "JavaScript", level: 90, icon: FaJs },
      { name: "HTML5", level: 95, icon: FaHtml5 },
      { name: "CSS3", level: 90, icon: FaCss3Alt },
      { name: "TailwindCSS", level: 85, icon: SiTailwindcss },
      { name: "Vue", level: 75, icon: SiVuedotjs },
    ]
  },
  {
    category: "Backend",
    icon: SiFirebase,
    skills: [
      { name: "Firebase", level: 90, icon: SiFirebase },
       { name: "Java", level: 80, icon: FaJava },
      { name: "SQL", level: 75, icon: FaDatabase },
    ]
  },
  {
    category: "Tools & Others",
    icon: FaCode, 
    skills: [
      { name: "Git", level: 90, icon: FaGitAlt },
      { name: "VS Code", level: 90, icon: FaCode },
      { name: "Figma", level: 85, icon: FaFigma },
      { name: "RESTful APIs", level: 90, icon: FaCodeBranch },
    ]
  }
];
