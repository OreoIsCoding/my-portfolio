import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaVuejs,
  FaPython,
  FaPhp,
  FaJava,
  FaDatabase,
  FaGit,
  FaFigma,
} from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiPostman, SiNpm } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import skillsDataJson from "../../datasets/skillsData.json";


const iconMap = {
  react: FaReact,
  javascript: FaJs,
  html5: FaHtml5,
  css3: FaCss3Alt,
  tailwindcss: SiTailwindcss,
  vue: FaVuejs,
  firebase: SiFirebase,
  python: FaPython,
  php: FaPhp,
  java: FaJava,
  sql: FaDatabase,
  database: FaDatabase,
  git: FaGit,
  figma: FaFigma,
  "vs code": VscCode,
  vscode: VscCode,
  "restful apis": SiPostman,
  api: SiPostman,
  npm: SiNpm,
};

const categoryIconMap = {
  Frontend: FaReact,
  Backend: FaDatabase,
  "Tools & Others": VscCode,
};

// Attach icon component to each skill using skill name
export const skillsData = skillsDataJson.map((category) => ({
  ...category,
  icon: categoryIconMap[category.category] || undefined,
  skills: category.skills.map((skill) => {
    const key = skill.name.trim().toLowerCase();
    return {
      ...skill,
      Icon: iconMap[key] || undefined,
    };
  }),
}));
