import cert1 from "../assets/certificates/certificate_1.png";
import cert2 from "../assets/certificates/certificate_2.png";
import cert3 from "../assets/certificates/certificate_3.png";
import cert4 from "../assets/certificates/certificate_4.png";
import cert7 from "../assets/certificates/certificate_7.png";
import cert8 from "../assets/certificates/certificate_8.png";
import cert9 from "../assets/certificates/certificate_9.jpg";
import cert10 from "../assets/certificates/certificate_10.jpg";
import ojtCertificate from "../assets/certificates/OJT_certificate.jpg";

export const experienceData = [
  {
    year: "2020",
    title: "Customer Service Representative",
    company: "iQor Philippines",
    side: "right",
    description:
      "Customer Service Representative with a focus on providing exceptional support and solutions to customers.",
  },

  {
    year: "Feb 2025 - May 2025",
    title: "Frontend Developer Intern",
    company: "ISPIR Center - Bulacan State University",
    side: "right",
    description:
      "Gained hands-on experience in frontend development, working with React Vite, TailwindCSS and API integration to create user-friendly web applications.",
  },
];

export const educationData = [
  {
    year: "2017-2019",
    title: "Information Communication Technology",
    institution: "Dr. Yanga's Colleges Inc.",
    side: "right",
    description:
      "Completed Senior High School with a focus on Information Communication Technology, gaining foundational knowledge in IT and robotics.",
  },
  {
    year: "2021-2025",
    title: "Bachelor of Science in Information Technology",
    institution: "STI College Balagtas",
    side: "right",
    description:
      "Fresh Graduate with a Bachelor of Science in Information Technology, specializing in Web Development",
  },
];

export const certificatesData = [
    {
    year: "February 2025 - May 2025",
    title: "Frontend Developer Intern",
    institution: "ISPIR Center - Bulacan State University",
    description:
      "Gained hands-on experience in frontend development, working with React Vite, TailwindCSS and API integration to create user-friendly web applications.",
    image: ojtCertificate,
  },
  {
    year: "October 2023",
    title: "IBM IT Support Professional",
    institution: "IBM & Coursera",
    description:
      "Comprehensive IT support certification covering hardware, software, networking, and cybersecurity",
    image: cert1,
  },
  {
    year: "July 2023",
    title: "Introduction to Cloud Computing",
    institution: "IBM & Coursera",
    description: "Cloud computing fundamentals and concepts",
    image: cert8,
  },
  {
    year: "July 2023",
    title: "Technical Support Fundamentals",
    institution: "IBM & Coursera",
    description: "Core technical support principles and practices",
    image: cert7,
  },
  {
    year: "July 2023",
    title: "Python Data Structures",
    institution: "University of Michigan",
    description: "Advanced Python programming with focus on data structures",
    image: cert4,
  },
  {
    year: "March 2023",
    title: "SAP Business One",
    institution: "STI College",
    description: "SAP BASIC (LOGISTICS & FINANCIALS) training completion",
    image: cert10,
  },
  {
    year: "January 2023",
    title: "CCDT Certified Programmer Level 2",
    institution: "STI College",
    description:
      "Advanced certification in Object-Oriented Programming, Data Structures and Algorithms",
    image: cert9,
  },
  {
    year: "June 2022",
    title: "Systems Administration",
    institution: "STI College",
    description: "Comprehensive training in systems administration",
    image: cert3,
  },
  {
    year: "June 2022",
    title: "Java Foundations",
    institution: "Oracle Academy",
    description: "Core Java programming concepts and practices",
    image: cert2,
  },

].sort((a, b) => {
  // Helper : get the latest date from a year string (handles ranges)
  const getLatestDate = (yearStr) => {
    if (!yearStr) return new Date(0);
    const parts = yearStr.split("-").map((s) => s.trim());
    const latest = parts[parts.length - 1];
    return new Date(latest);
  };
  return getLatestDate(b.year) - getLatestDate(a.year);
});
