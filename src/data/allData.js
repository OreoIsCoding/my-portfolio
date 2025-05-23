import { aboutData } from './aboutData';
import { skillsData } from './skillsData';
import { projectsData } from './projectsData';
import { experienceData as timelineExperienceData, educationData, certificatesData } from './timelineData';
import { socialLinks } from '../components/ChatBot/socialLinks';
import {servicesData} from '../../datasets/servicesData.json';

 

// Export all data as a single object
export const allData = {
  about: aboutData,
  skills: skillsData,
  projects: projectsData,
  experience: timelineExperienceData,
  education: educationData,
  certificates: certificatesData,
  social: socialLinks,
  services: servicesData
};
