import myPortfolio from "../assets/project-images/my-portfolio.jpg";
import enWeb from "../assets/project-images/snacf.jpg";
import quizBee from "../assets/project-images/QuizBee.jpg";

export const projectsData = [
  {
    title: "My Portfolio",
    description: `
            Personal portfolio website built with React and TailwindCSS,
            featuring smooth animations and responsive design.
        `,
    image: myPortfolio,
    tech: ["React", "TailwindCSS", "Vite"],
  },
  {
    title: "En-web",
    description: `
            A enrollment web application built with React and TailwindCSS.
            It allows users to enroll in courses, generate enrollment slip,
            and track progress. The admin can accept or reject enrollment requests.
        `,
    image: enWeb,
    tech: ["React", "TailwindCSS", "JavaScript"],
  },

  {
    title: "QuizBee",
    description: `
        A quiz web application built with HTML5, CSS3, and JavaScript.
        It allows users to take quizzes, view results, and track progress.
        The admin can create and manage quizzes. It is real-time like kahoot.
        `,
    image: quizBee,
    tech: ["HTML5", "CSS3", "JavaScript"],
  },

  // magdadagdag pa ako ng projects dito...
];
