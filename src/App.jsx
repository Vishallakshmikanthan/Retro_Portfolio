import React, { useState } from "react";
import BaseLayout from "./layouts/BaseLayout";
import BootSequenceLite from "./components/BootSequenceLite";
import CRTOverlay from "./components/CRTOverlay";
import { WindowProvider } from "./context/WindowContext";
import { SystemHUDProvider, useSystemHUD } from "./context/SystemHUDContext";
import SystemHUD from "./components/SystemHUD";

function AppContent() {
  const [isIdle, setIsIdle] = useState(false);
  const { dispatchMessage } = useSystemHUD();

  React.useEffect(() => {
    // Visitor memory check
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setTimeout(() => {
        dispatchMessage("> Welcome back.");
        setTimeout(() => dispatchMessage("> Restoring previous session..."), 1500);
      }, 1000);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    // Scroll Velocity Feedback
    let scrollTimer = null;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      
      if (delta > 50) {
        document.body.classList.add('scroll-velocity-active');
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          document.body.classList.remove('scroll-velocity-active');
        }, 150);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Keyboard Shortcuts
    const handleKeydown = (e) => {
      if (e.key.toLowerCase() === 's' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const el = document.querySelector('#skills');
        if (el) {
          dispatchMessage("> Accessing SKILLS module...");
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key.toLowerCase() === 'p' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const el = document.querySelector('#projects');
        if (el) {
          dispatchMessage("> Accessing PROJECTS module...");
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
      clearTimeout(scrollTimer);
    };
  }, [dispatchMessage]);

  React.useEffect(() => {
    let timeout;
    const resetIdle = () => {
      if (isIdle) {
        setIsIdle(false);
        document.body.classList.remove('idle-flicker');
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsIdle(true);
        document.body.classList.add('idle-flicker');
      }, 7000);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('scroll', resetIdle);
    window.addEventListener('click', resetIdle);
    
    resetIdle();
    
    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('scroll', resetIdle);
      window.removeEventListener('click', resetIdle);
      clearTimeout(timeout);
    };
  }, [isIdle]);

  return (
    <>
      {isIdle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 9998,
          background: 'rgba(255, 255, 255, 0.03)',
          mixBlendMode: 'screen',
          animation: 'scan-sweep 3s linear infinite'
        }} />
      )}
      <SystemHUD />
      <BaseLayout />
    </>
  );
}

function App() {
  const [isBooting, setIsBooting] = useState(() => !localStorage.getItem('hasBootedLocally'));

  return (
    <SystemHUDProvider>
      <WindowProvider>
        <CRTOverlay />
        {isBooting && <BootSequenceLite onComplete={() => setIsBooting(false)} />}
        <AppContent />
      </WindowProvider>
    </SystemHUDProvider>
  );
}

export default App;