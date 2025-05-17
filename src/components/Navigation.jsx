import React, { useState } from 'react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact Me', href: '#contact-me' }
  ];

  const menuButtonStyles = "lg:hidden fixed right-3 top-3 bg-transparent text-white p-2 hover:text-gray-300 transition-all duration-300";
  const navItemStyles = "text-white text-2xl sm:text-3xl lg:text-base xl:text-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-gray-300";

  const handleNavClick = (e) => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed lg:static right-0 top-0 z-[100] p-3 sm:p-4 lg:p-0">
      {/* Menu Toggle Button */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={menuButtonStyles}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navigation Menu */}
      <div className={`
        fixed inset-0 lg:static 
        transition-all duration-500 ease-out 
        flex items-center justify-center lg:block
        backdrop-blur-md lg:backdrop-blur-none
        bg-black/95 lg:bg-transparent
        ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
        lg:opacity-100 lg:visible lg:translate-y-0`}
      >
        {/* Close Button */}
        <button onClick={handleNavClick} className={menuButtonStyles}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Nav Links */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-6 xl:gap-10">
          {navLinks.map((link, index) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className={navItemStyles}
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
