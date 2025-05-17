import React from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaGithub, FaNpm, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';

const AnimatedBackground = () => {
    
    //ICONS
    const techIcons = [
        FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaGithub, FaNpm,
        SiTypescript, SiTailwindcss, FaDatabase
    ];

    return (
    <div className="animated-background fixed inset-0 z-0 overflow-hidden">
      {[...Array(25)].map((_, i) => {
        const Icon = techIcons[Math.floor(Math.random() * techIcons.length)];
        const size = Math.random() * 30 + 20; 

        return (
          <div
            key={i}
            className="particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${size}px`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.2 + 0.1,
              color: `rgba(${Math.random() > 0.5 ? '0, 255, 255' : '128, 255, 128'}, 0.4)`,
              filter: 'blur(0.5px)',
            }}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedBackground;
