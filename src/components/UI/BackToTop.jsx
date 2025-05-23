import React, { useEffect, useState } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    // Listen for chat state changes
    const onChatChange = (e) => {
      setChatOpen(e.detail.isOpen);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("chatStateChange", onChatChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("chatStateChange", onChatChange);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Back to top"
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-12 h-12 sm:w-14 sm:h-14
        rounded-full
        bg-transparent
        border-2 border-white/80
        shadow-2xl
        // hover:scale-110 hover:shadow-white/30 hover:border-white
        transition-all duration-300
        backdrop-blur-md
        ${visible && !chatOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-90"}
        focus:outline-none
        group
      `}
    >
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-white transition-all duration-300 drop-shadow
          transform group-hover:-translate-y-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      <span className="
        absolute right-full mr-3 top-1/2 -translate-y-1/2
        bg-black/80 text-white text-xs px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100
        pointer-events-none transition-all duration-300
        whitespace-nowrap
        select-none
      ">
        Back to top
      </span>
    </button>
  );
};

export default BackToTop;
