import React, { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Game", href: "game" },  
  ];

  const menuButtonStyles =
    "lg:hidden fixed right-3 top-3 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-300";
  const navItemStyles =
    "relative text-white/80 text-sm lg:text-xs xl:text-sm font-medium transition-all duration-300 hover:text-white group";

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed lg:static right-0 top-0 z-[9999] p-3 sm:p-4 lg:p-0 w-full lg:w-auto">
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${menuButtonStyles} z-[9999]`}
        data-nav-menu-button
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navigation Menu */}
      <div className={`
          fixed lg:static 
          left-0 right-0 top-[60px] lg:right-auto lg:top-auto
          h-auto max-h-[80vh]
          overflow-visible
          transition-all duration-500 ease-out 
          flex items-center justify-center lg:justify-end
          backdrop-blur-md lg:backdrop-blur-none
          bg-black/95 lg:bg-transparent
          py-6 lg:py-0
          ${isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
          }
          lg:opacity-100 lg:visible lg:translate-y-0
          border-t border-b border-white/5 lg:border-none
          shadow-2xl shadow-black/20 lg:shadow-none
          z-[9999]`}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 sm:gap-8 lg:gap-4 xl:gap-6 lg:pr-20">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className={navItemStyles}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {link.name}
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 
                transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}

          <a
            href="https://drive.google.com/uc?export=download&id=1Bn5X5rbceMmX4gq04_TyIXjataDwWY4U"
            download
            className="px-3 py-1.5 rounded-full bg-white text-black/90 hover:bg-white/90
              transition-all duration-300 text-xs font-medium 
              hover:scale-[1.03] active:scale-100 cursor-pointer"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
