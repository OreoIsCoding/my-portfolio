import cert1 from "../assets/certificates/certificate_1.png";
import cert2 from "../assets/certificates/certificate_2.png";
import cert3 from "../assets/certificates/certificate_3.png";
import cert4 from "../assets/certificates/certificate_4.png";
import cert7 from "../assets/certificates/certificate_7.png";
import cert8 from "../assets/certificates/certificate_8.png";
import cert9 from "../assets/certificates/certificate_9.jpg";
import cert10 from "../assets/certificates/certificate_10.jpg";
import ojtCertificate from "../assets/certificates/OJT_certificate.jpg";
import timelineDataJson from "../../datasets/timelineData.json";

// Map image filenames to imported images
const imageMap = {
  "certificate_1.png": cert1,
  "certificate_2.png": cert2,
  "certificate_3.png": cert3,
  "certificate_4.png": cert4,
  "certificate_7.png": cert7,
  "certificate_8.png": cert8,
  "certificate_9.jpg": cert9,
  "certificate_10.jpg": cert10,
  "OJT_certificate.jpg": ojtCertificate,
};

// Map certificatesData to use imported images
export const certificatesData = timelineDataJson.certificatesData.map(cert => ({
  ...cert,
  image: cert.image ? imageMap[cert.image] : undefined,
}));

export const experienceData = timelineDataJson.experienceData;
export const educationData = timelineDataJson.educationData;
