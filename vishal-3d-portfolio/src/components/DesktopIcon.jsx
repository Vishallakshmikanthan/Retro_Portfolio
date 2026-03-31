import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useWindow } from '../context/WindowContext';

/**
 * DesktopIcon Component
 * A Windows 98 styled desktop icon with GSAP animations.
 */
const DesktopIcon = ({ icon, label, onClick, index = 0, windowTitle }) => {
  const { focusWindow } = useWindow();
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const labelRef = useRef(null);
  const lastDblClick = useRef(0);

  useEffect(() => {
    // 3. LOAD ANIMATION: Icons appear with stagger (100ms delay)
    // We use the index prop to stagger the entrance animation
    const tl = gsap.timeline({
      delay: index * 0.1, // 100ms stagger
    });

    tl.fromTo(containerRef.current, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    ).fromTo(iconRef.current,
      { scale: 0, rotation: -10 },
      { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' },
      "-=0.2"
    );

    return () => tl.kill();
  }, [index]);

  // 2. HOVER: Slight translateY(-2px), 1px white outline, No glow
  const handleMouseEnter = () => {
    gsap.to(containerRef.current, {
      y: -2,
      duration: 0.2,
      ease: "power2.out"
    });
    // Add 1px white outline is handled by CSS class 'group-hover:outline'
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      y: 0,
      duration: 0.2,
      ease: "power2.in"
    });
  };

  // 1. DOUBLE CLICK: Detect double click, Trigger window open animation
  const onDoubleClickHandler = (e) => {
    // 300ms explicit debounce
    const now = Date.now();
    if (now - lastDblClick.current < 300) return;
    lastDblClick.current = now;

    // Window should animate from icon position (GSAP)
    // We create a "ghost" expansion effect to simulate the window scaling out
    const rect = iconRef.current.getBoundingClientRect();
    
    const ghost = document.createElement('div');
    ghost.style.position = 'fixed';
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.border = '2px solid white';
    ghost.style.zIndex = '9999';
    ghost.style.pointerEvents = 'none';
    document.body.appendChild(ghost);

    gsap.to(ghost, {
      left: '10vw',
      top: '10vh',
      width: '80vw',
      height: '80vh',
      opacity: 0,
      duration: 0.5,
      ease: "power4.out",
      onComplete: () => {
        document.body.removeChild(ghost);
        if (windowTitle) focusWindow(windowTitle);
        if (onClick) onClick(e);
      }
    });

    // Slight scale feedback on the icon itself
    gsap.to(iconRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div 
      ref={containerRef}
      className="desktop-icon group flex flex-col items-center justify-start p-1 cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={onDoubleClickHandler}
      style={{ width: '75px', height: '85px' }}
    >
      {/* 4. STRUCTURE: Icon + label (below), Center aligned, Pixel-style spacing */}
      <div 
        ref={iconRef}
        className="icon-wrapper flex items-center justify-center p-1 mb-1 transition-all duration-100"
        style={{ width: '42px', height: '42px' }}
      >
        <div className="relative w-full h-full flex items-center justify-center group-hover:outline group-hover:outline-1 group-hover:outline-white group-hover:outline-offset-2">
           <img 
            src={icon} 
            alt={label} 
            className="w-full h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      <span 
        ref={labelRef}
        className="icon-label text-[11px] leading-tight text-white text-center font-mono px-1 bg-black/40 group-hover:bg-blue-800 break-words"
        style={{ 
          textShadow: '1px 1px 0px #000',
          marginTop: '2px',
          maxWidth: '100%'
        }}
      >
        {label}
      </span>

      {/* Constraints: No shadows, No glow, No modern hover effects */}
      <style>{`
        .desktop-icon {
          /* Traditional Win98 feel */
        }
        .icon-label {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DesktopIcon;
