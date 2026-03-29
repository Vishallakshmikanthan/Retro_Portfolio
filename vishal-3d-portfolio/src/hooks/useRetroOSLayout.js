import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useRetroOSLayout Hook
 * Consolidated hook for depth entry animations AND sticky window stacking.
 */
const useRetroOSLayout = () => {
  useEffect(() => {
    const windows = gsap.utils.toArray('.retro-window-container');
    const bg = document.querySelector('.retro-background-inner') || document.querySelector('.fixed.inset-0.z-\\[-2\\]');
    
    if (windows.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Windows Entry Animations (No Pinning)
      windows.forEach((win, i) => {
        gsap.fromTo(win, 
          { 
            opacity: 0,
            y: 80,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: win,
              start: "top 85%", // Trigger animation when top of window reaches 85% down viewport
              toggleActions: "play none none reverse",
              // scrub: true would bind it to scroll, let's just make it a clean CSS-like transition
            }
          }
        );
      });

      // 2. Background Parallax
      if (bg) {
        gsap.to(bg, {
          y: "-15%",
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

export default useRetroOSLayout;

