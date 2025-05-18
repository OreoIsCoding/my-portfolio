import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (threshold = 0.1, repeat = true) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // mobile landscape detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const isMobileLandscape =
    typeof window !== 'undefined' &&
    window.innerWidth < 900 &&
    window.innerWidth > window.innerHeight;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!repeat && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: isMobileLandscape ? 0.08 : isMobile ? 0.15 : threshold,
        rootMargin: isMobileLandscape ? '80px 0px' : isMobile ? '50px 0px' : '0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, isMobile, isMobileLandscape, repeat]);

  return [ref, isVisible];
};

export default useScrollAnimation;
