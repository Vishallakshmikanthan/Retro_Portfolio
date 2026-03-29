import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

export const useWindow = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [activeWindow, setActiveWindow] = useState("User_Profile.sys");
  const [zIndices, setZIndices] = useState({
    "User_Profile.sys": 10,
    "System.Skills": 11,
    "Projects.exe": 12,
    "Contact_User.msg": 13,
  });
  const [maxZ, setMaxZ] = useState(20);

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.02);

      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.02);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };

  const focusWindow = (title) => {
    playSound(); // Add sound to focus
    setActiveWindow(title);
    setZIndices(prev => ({ ...prev, [title]: maxZ }));
    setMaxZ(prev => prev + 1);
  };

  return (
    <WindowContext.Provider value={{ activeWindow, zIndices, focusWindow, playSound }}>
      {children}
    </WindowContext.Provider>
  );
};
