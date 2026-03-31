import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useWindowDepth Hook
 * Adds refined scroll-based depth (translateZ), entry animations, and parallax to background.
 */
const useWindowDepth = () => {
  useEffect(() => {
    const windows = gsap.utils.toArray('.retro-window');
    // Selector for any background layer we want to parallax
    const bg = document.querySelector('.retro-background-inner') || document.querySelector('.fixed.inset-0.z-\\[-2\\]');
    
    if (windows.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Windows Entry & Depth Parallax
      windows.forEach((win, i) => {
        gsap.fromTo(win, 
          { 
            opacity: 0,
            y: 40,
            z: -60,
            rotateX: 2,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: win,
              start: "top 85%", // Starts earlier for visibility
              end: "top 50%",
              scrub: 1, // Smooth scrub as requested
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // 2. Background Parallax (Moves against scroll)
      if (bg) {
        gsap.to(bg, {
          y: -100, // Moves up as you scroll down
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);
};

export default useWindowDepth;
