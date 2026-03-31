import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Use GSAP context for safe cleanup in React
    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, barRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-[3px] z-[99999] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-[#00f2ff] origin-left scale-x-0 will-change-transform"
        style={{
          boxShadow: "0 0 10px #00f2ff, 0 0 20px rgba(0, 242, 255, 0.5)"
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;