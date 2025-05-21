import { allData } from '../../data/allData';

export function getRelevantData(question) {
  const q = question.toLowerCase();
  const data = {
    about: allData.about
  };

  // Enhanced skill level detection
  const skillLevelPattern = /(gano|how|what).*(kagaling|level|expert|skilled|good).*(sa|in|with)?\s+(\w+)/i;
  const skillMatch = q.match(skillLevelPattern);

  if (skillMatch) {
    const searchSkill = skillMatch[4].toLowerCase();
    const foundSkill = allData.skills.flatMap(category =>
      category.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchSkill)
      )
    )[0];

    if (foundSkill) {
      data.specificSkill = {
        name: foundSkill.name,
        level: foundSkill.level,
        category: allData.skills.find(cat =>
          cat.skills.some(s => s.name === foundSkill.name)
        )?.category
      };
    }
  }

  // Check for direct contact info questions
  const contactKeywords = {
    github: ['github', 'gh'],
    facebook: ['facebook', 'fb'],
    email: ['email', 'e-mail', 'mail'],
    phone: ['number', 'phone', 'contact', 'cp']
  };

  for (const [platform, keywords] of Object.entries(contactKeywords)) {
    if (keywords.some(word => q.includes(word))) {
      data.contact = {
        email: 'pauldionisio137@gmail.com',
        phone: '+63961440896',
        github: 'https://github.com/oreoiscoding',
        facebook: 'https://facebook.com/dionisio001',
        facebookPage: 'https://facebook.com/oreocoding',
        requestedPlatform: platform
      };
      break;
    }
  }

  // Semantic topic detection
  const topics = {
    education: ['school', 'study', 'aral', 'shs', 'college', 'university', 'graduate', 'student'],
    work: ['work', 'job', 'career', 'trabaho', 'intern', 'ojt', 'experience'],
    skills: ['skill', 'tech', 'programming', 'code', 'develop', 'language', 'framework'],
    projects: ['project', 'portfolio', 'gawa', 'sample', 'work', 'create'],
    services: ['hire', 'service', 'commission', 'work', 'freelance', 'collab', 'accept', 'available'],
    contact: ['contact', 'reach', 'social', 'connect', 'message', 'email', 'chat','contacts'],
    personal: ['relationship', 'girlfriend', 'single', 'jowa', 'crush', 'personal','gf'],
    certificates: ['certificate', 'certification', 'cert', 'credentials', 'achievement', 'award']
  };

  Object.entries(topics).forEach(([topic, keywords]) => {
    if (keywords.some(word => q.includes(word))) {
      switch(topic) {
        case 'education':
          data.education = allData.education;
          break;
        case 'work':
          data.experience = allData.experience;
          break;
        case 'skills':
          data.skills = allData.skills;
          break;
        case 'projects':
          data.projects = allData.projects;
          break;
        case 'services':
          data.services = {
            available: true,
            skills: allData.skills,
            contact: {
              ...allData.social,
              email: 'pauldionisio137@gmail.com',
              phone: '+63961440896',
              github: 'https://github.com/oreoiscoding',
              facebook: 'https://facebook.com/dionisio001',
              facebookPage: 'https://facebook.com/oreocoding'
            }
          };
          break;
        case 'contact':
          data.social = allData.social;
          break;
        case 'personal':
          data.relationship = {
            status: 'in a relationship',
            partner: 'Andrea Mendoza'
          };
          break;
        case 'certificates':
          data.certificates = allData.certificates;
          break;
      }
    }
  });

  return data;
}
