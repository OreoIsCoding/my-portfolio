import myPortfolio from "../assets/project-images/my-portfolio.jpg";
import enWeb from "../assets/project-images/snacf.jpg";
import quizBee from "../assets/project-images/QuizBee.jpg";
import typingTest from "../assets/project-images/typing_test.jpg";
import cao from "../assets/project-images/cao.jpg";
import projectsDataJson from '../../datasets/projectsData.json';
 
// Map image filenames to imported images
const imageMap = {
  "my-portfolio.jpg": myPortfolio,
  "snacf.jpg": enWeb,
  "QuizBee.jpg": quizBee,
  "typing_test.jpg": typingTest,
  "cao.jpg": cao,
};

export const projectsData = projectsDataJson.map(project => ({
  ...project,
  image: imageMap[project.image] || project.image
}));

