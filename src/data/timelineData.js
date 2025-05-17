export const experienceData = [
  {
    year: '2020',
    title: 'Customer Service Representative',
    company: 'iQor Philippines',
    side: 'right',
    description: 'Customer Service Representative with a focus on providing exceptional support and solutions to customers.'
  },
   {
    year: 'Feb 2025 - May 2025',
    title: 'Frontend Developer Intern',
    company: 'ISPIR Center - Bulacan State University',
    side: 'right',
    description: 'Gained hands-on experience in frontend development, working with React Vite, TailwindCSS and API integration to create user-friendly web applications.'
  },
 ];

export const educationData = [
  {
    year: '2021-2025',  
    title: 'Bachelor of Science in Information Technology',
    institution: 'STI College Balagtas',
    side: 'right',
    description: 'Fresh Graduate with a Bachelor of Science in Information Technology, specializing in Web Development'
  }
];

export const certificatesData = [
  {
    year: 'October 2023',
    title: 'IBM IT Support Professional',
    institution: 'IBM & Coursera',
    description: 'Comprehensive IT support certification covering hardware, software, networking, and cybersecurity',
    image: '/src/assets/certificates/certificate_1.png'
  },
  {
    year: 'July 2023',
    title: 'Introduction to Cloud Computing',
    institution: 'IBM & Coursera',
    description: 'Cloud computing fundamentals and concepts',
    image: '/src/assets/certificates/certificate_8.png'
  },
  {
    year: 'July 2023',
    title: 'Technical Support Fundamentals',
    institution: 'IBM & Coursera',
    description: 'Core technical support principles and practices',
    image: '/src/assets/certificates/certificate_7.png'
  },
  {
    year: 'July 2023',
    title: 'Python Data Structures',
    institution: 'University of Michigan',
    description: 'Advanced Python programming with focus on data structures',
    image: '/src/assets/certificates/certificate_4.png'
  },
  {
    year: 'March 2023',
    title: 'SAP Business One',
    institution: 'STI College',
    description: 'SAP BASIC (LOGISTICS & FINANCIALS) training completion',
    image: '/src/assets/certificates/certificate_10.jpg'
  },
  {
    year: 'January 2023',
    title: 'CCDT Certified Programmer Level 2',
    institution: 'STI College',
    description: 'Advanced certification in Object-Oriented Programming, Data Structures and Algorithms',
    image: '/src/assets/certificates/certificate_9.jpg'
  },
  {
    year: 'June 2022',
    title: 'Systems Administration',
    institution: 'STI College',
    description: 'Comprehensive training in systems administration',
    image: '/src/assets/certificates/certificate_3.png'
  },
  {
    year: 'June 2022',
    title: 'Java Foundations',
    institution: 'Oracle Academy',
    description: 'Core Java programming concepts and practices',
    image: '/src/assets/certificates/certificate_2.png'
  }
].sort((a, b) => new Date(a.year) - new Date(b.year));
