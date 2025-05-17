import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/sections/about/About'
import Skills from './components/sections/skills/Skills'
import profileImg from './assets/right-bg-2.png'

const App = () => {
  // Constants for styles and animations
  const mobileImageStyles = {
    height: '85vh',
    width: 'auto',
    minWidth: '380px',
    minHeight: '650px',
    maxHeight: '800px',
    objectFit: 'contain',
    objectPosition: 'bottom center',
    transform: 'scale(1.15)',
    willChange: 'transform',
    margin: '0 auto',
    transformOrigin: 'bottom center'
  };

  const desktopImageStyles = {
    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))',
    transform: 'translateX(-5%) scale(1.1)',
    maxWidth: 'none',
    animation: 'slideUp 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards',
    opacity: 0
  };

  const renderMobileContent = () => (
    <div className="flex-1 flex flex-col lg:hidden relative min-h-screen opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
      {/* Mobile Image */}
      <div className="fixed inset-x-0 bottom-0 z-10 pointer-events-none overflow-hidden w-full flex justify-center">
        <div className="relative flex justify-center items-end opacity-0 animate-slideUp max-w-[500px] mx-auto"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <img
            src={profileImg}
            alt="Profile"
            className="select-none transition-all duration-1000 ease-out"
            style={mobileImageStyles}
          />
        </div>
      </div>

      {/* Overlay with Hero */}
      <div
        className="fixed bottom-0 inset-x-0 min-h-[420px] h-[45vh] bg-gray-900/80 z-20"
        style={{
          clipPath: 'polygon(0 28%, 100% 0, 100% 100%, 0 100%)',
        }}>
        <div className="h-full flex items-end">
          <div className="w-full px-4 pb-12">
            <Hero />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDesktopContent = () => (
    <>
      <div className="hidden lg:flex w-[45%] pt-4 lg:pt-2 xl:pt-8 px-8 xl:px-16 opacity-0 animate-slideRight"
        style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
        <Hero />
      </div>
      <div className="hidden lg:flex w-[55%] flex-col">
        <div className="flex justify-end w-full pt-4 lg:pt-6 xl:pt-8 animate-fadeIn"
          style={{ paddingRight: '15%' }}>
          <Navigation />
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full flex items-end justify-center">
              <img
                src={profileImg}
                alt="Profile"
                className="h-[90vh] w-auto object-contain select-none"
                style={desktopImageStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          {/* Background Sections */}
          <div className="absolute inset-0 z-10">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black lg:hidden" />
              <div className="hidden lg:block absolute top-0 left-0 w-[70%] h-full bg-gray-100" />
              <div
                className="hidden lg:block absolute top-0 right-0 w-[60%] h-full bg-black"
                style={{
                  clipPath: 'polygon(28% 0%, 100% 0%, 100% 100%, 20% 100%)'
                }}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-20 flex flex-col lg:flex-row min-h-screen">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-3 sm:p-4 lg:hidden">
              <span className="text-xl sm:text-2xl font-bold text-white">Paul D.</span>
              <Navigation />
            </div>

            {renderMobileContent()}
            {renderDesktopContent()}
          </div>
        </div>
      </div>
      <About />
      <Skills />
    </>
  )
}

export default App
