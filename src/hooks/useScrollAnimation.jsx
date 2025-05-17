import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (threshold = 0.1, repeat = true) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = window.innerWidth < 640;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection
        setIsVisible(entry.isIntersecting);

        // Only unobserve if we don't want to repeat the animation
        if (!repeat && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: isMobile ? 0.15 : threshold,
        rootMargin: isMobile ? '50px 0px' : '0px',
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
  }, [threshold, isMobile, repeat]);

  return [ref, isVisible];
};

export default useScrollAnimation;
