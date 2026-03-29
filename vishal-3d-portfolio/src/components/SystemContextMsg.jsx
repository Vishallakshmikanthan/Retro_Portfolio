import React, { useEffect } from "react"
import { useSystemHUD } from "../context/SystemHUDContext"

export default function SystemContextMsg() {
  const { dispatchMessage } = useSystemHUD()
  
  useEffect(() => {
    let lastMsgTime = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) {
              const now = Date.now();
              // Throttle entry messages slightly if fast scrolling
              if (now - lastMsgTime > 2000) {
                  dispatchMessage(`> Accessing ${id.toUpperCase()} module...`, 2500)
                  lastMsgTime = now;
              }
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    setTimeout(() => {
      const sections = document.querySelectorAll("section[id], .window-main, .window-secondary")
      sections.forEach((s) => {
        if (s.id) observer.observe(s)
      })
    }, 500)

    // Pseudo system intelligence track
    let hoverTimer = null;
    const handleMouseOver = (e) => {
      if (e.target.closest('.retro-card, .h-scroll-card, .project-card, .desktop-icon')) {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          const now = Date.now();
          if (now - lastMsgTime > 10000) {
            dispatchMessage("> Analyzing interaction...", 3000);
            setTimeout(() => {
               const modules = ["PROJECTS.EXE", "SKILLS.EXE", "CONTACT.EXE"];
               const randomMod = modules[Math.floor(Math.random() * modules.length)];
               dispatchMessage(`> Suggested module: ${randomMod}`, 3000);
            }, 3500);
            lastMsgTime = now + 4000;
          }
        }, 1500); 
      }
    };
    
    // Auto Focus Highlight
    let focusTimer = null;
    let currentFocusEl = null;
    const handleMouseMove = (e) => {
      clearTimeout(focusTimer);
      if (currentFocusEl) {
         currentFocusEl.classList.remove('auto-focus-highlight');
         currentFocusEl = null;
      }
      
      const target = e.target.closest('a, button, .retro-card');
      if (target) {
        focusTimer = setTimeout(() => {
          currentFocusEl = target;
          currentFocusEl.classList.add('auto-focus-highlight');
        }, 1000);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect()
      clearTimeout(hoverTimer)
      clearTimeout(focusTimer)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousemove', handleMouseMove)
      if (currentFocusEl) currentFocusEl.classList.remove('auto-focus-highlight');
    }
  }, [dispatchMessage])

  return null
}
