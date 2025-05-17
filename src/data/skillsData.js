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
      { name: "React", level: "Advanced", icon: FaReact },
      { name: "JavaScript", level: "Advanced", icon: FaJs },
      { name: "HTML5", level: "Expert", icon: FaHtml5 },
      { name: "CSS3", level: "Advanced", icon: FaCss3Alt },
      { name: "TailwindCSS", level: "Advanced", icon: SiTailwindcss },
      { name: "Vue", level: "Intermediate", icon: SiVuedotjs },
    ]
  },
  {
    category: "Backend",
    icon: SiFirebase,
    skills: [
      { name: "Firebase", level: "Advanced", icon: SiFirebase },
      { name: "Java", level: "Intermediate", icon: FaJava },
      { name: "SQL", level: "Intermediate", icon: FaDatabase },
    ]
  },
  {
    category: "Tools & Others",
    icon: FaCode, 
    skills: [
      { name: "Git", level: "Advanced", icon: FaGitAlt },
      { name: "VS Code", level: "Advanced", icon: FaCode },
      { name: "Figma", level: "Advanced", icon: FaFigma },
      { name: "RESTful APIs", level: "Advanced", icon: FaCodeBranch },
    ]
  }
];
