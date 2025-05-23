import { allData } from '../../data/allData';

export function getRelevantData(question) {
  const q = question.toLowerCase();
  const data = {
    about: allData.about
  };

  //   skill level detection  
  const skillLevelPattern = /(gano|how|what|gaano|ano|anong).*(kagaling|level|expert|skilled|good|magaling|mahusay|kahusay).*(sa|in|with)?\s+(\w+)/i;
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

  // Improved contact info detection (support more keywords)
  const contactKeywords = {
    github: ['github', 'gh', 'git'],
    facebook: ['facebook', 'fb', 'fb page', 'messenger'],
    email: ['email', 'e-mail', 'mail', 'gmail'],
    phone: ['number', 'phone', 'contact', 'cp', 'mobile', 'cellphone']
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

  //   semantic topic detection  
  const topics = {
    education: ['school', 'study', 'aral', 'shs', 'college', 'university', 'graduate', 'student', 'educ', 'bachelor', 'course'],
    work: ['work', 'job', 'career', 'trabaho', 'intern', 'ojt', 'experience', 'employed', 'employment'],
    skills: ['skill', 'tech', 'programming', 'code', 'develop', 'language', 'framework', 'stack', 'technology'],
    projects: ['project', 'portfolio', 'gawa', 'sample', 'work', 'create', 'build', 'output'],
    services: ['hire', 'service', 'commission', 'work', 'freelance', 'collab', 'accept', 'available', 'offer'],
    contact: ['contact', 'reach', 'social', 'connect', 'message', 'email', 'chat', 'contacts', 'inquire'],
    personal: ['relationship', 'girlfriend', 'single', 'jowa', 'crush', 'personal', 'gf', 'partner', 'love life'],
    certificates: ['certificate', 'certification', 'cert', 'credentials', 'achievement', 'award', 'recognition']
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
            services: allData.services,
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
