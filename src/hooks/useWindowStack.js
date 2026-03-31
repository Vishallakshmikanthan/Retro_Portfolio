import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useWindowStack Hook
 * Converts sections into sticky, overlapping OS windows.
 */
const useWindowStack = () => {
  useEffect(() => {
    const windows = gsap.utils.toArray('.retro-window-container');
    
    if (windows.length === 0) return;

    const ctx = gsap.context(() => {
      windows.forEach((win, i) => {
        // Higher index windows should have higher z-index to overlap previous ones
        // although focus logic also handles this, we set a baseline here.
        gsap.set(win, { 
          // We apply the offset immediately so they look "stacked" when they arrive
          x: i * 20, 
          y: i * 15,
        });

        const isLast = i === windows.length - 1;

        ScrollTrigger.create({
          trigger: win,
          start: `top ${80 + i * 15}px`, 
          // Pin until the whole stack is "pushed" by the next major section
          // or just pin the last one with spacing to create room.
          end: isLast ? "+=100%" : "bottom top", 
          pin: true,
          pinSpacing: isLast, // Last window creates the necessary scroll space
          scrub: true,
          id: `pin-window-${i}`,
          onUpdate: (self) => {
             // Optional: Dim previous windows as we scroll past them
             // but we'll stick to clear stacking for now as requested.
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);
};

export default useWindowStack;
