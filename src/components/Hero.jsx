import React from 'react'

const Hero = () => {
 const socialLinks = [
    { href: "https://github.com/oreoiscoding", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
    { 
      href: "https://facebook.com/dionisio001", 
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    { 
      href: "https://facebook.com/oreocoding", 
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    { href: "mailto:pauldionisio137@gmail.com", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm-16 12V8.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 8.99V18H4z" },
    { href: "tel:+63961440896", icon: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" }
];

  return (
    <div className="h-full flex flex-col lg:p-4 xl:p-6">
      {/* Logo only shows on desktop */}
      <div className="hidden lg:block">
        <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800">Paul D.</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-end lg:justify-center p-6 lg:p-0 lg:mt-20 xl:mt-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 lg:mb-4 text-white lg:text-gray-800 opacity-0 animate-fadeIn" 
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          Hi, I'm  
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white lg:text-neutral-900 mb-4 lg:mb-6 opacity-0 animate-slideRight" 
          style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          Axel Dionisio
        </h2>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-200 lg:text-gray-700 mb-6 lg:mb-8 opacity-0 animate-slideRight" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          Frontend Developer
        </p>
        <div className="flex">
          <div className="flex gap-3 sm:gap-4 mt-3 opacity-0 animate-fadeIn bg-transparent px-0 py-0 border-0 shadow-none"
            style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            {socialLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group
                  flex items-center justify-center
                  w-10 h-10 sm:w-11 sm:h-11
                  bg-white
                  hover:bg-neutral-900
                  border border-gray-200
                  shadow-md
                  rounded
                  transition-all duration-200
                  hover:scale-110
                  focus:outline-none
                `}
                style={{ animationDelay: `${1.8 + (index * 0.2)}s` }}
              >
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800 group-hover:text-white transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={link.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
