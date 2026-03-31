import React from 'react';
import { useSystemHUD } from '../context/SystemHUDContext';
import { useWindow } from '../context/WindowContext';

export default function StartMenu() {
  const { isStartMenuOpen, setIsStartMenuOpen, setIsAnalyticsOpen, setIsTerminalOpen, dispatchMessage } = useSystemHUD();
  const { soundEnabled, toggleSound, playSound } = useWindow();

  if (!isStartMenuOpen) return null;

  const handleAction = (action) => {
    playSound();
    setIsStartMenuOpen(false);
    action();
  };

  const navTo = (id) => {
    dispatchMessage(`> Executing ${id}...`);
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="fixed bottom-[28px] left-0 w-[200px] bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#444] z-[9999] shadow-[2px_2px_4px_rgba(0,0,0,0.5)] flex flex-col pt-1 select-none">
      <div className="absolute left-0 top-0 bottom-0 w-[24px] bg-gradient-to-b from-[#000080] to-[#1084d0]" />
      <div className="absolute left-[2px] top-auto bottom-[40px] rotate-[-90deg] origin-left text-white font-bold tracking-widest text-sm">
        Vishal OS 95
      </div>
      <div className="pl-[26px] py-1 flex flex-col text-sm font-sans font-bold text-black border-b border-[#808080]">
        
        <button onClick={() => handleAction(() => navTo('about'))} className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white group flex items-center gap-2">
          <span className="text-[#808080] group-hover:text-white">📄</span> About Profile
        </button>

        <button onClick={() => handleAction(() => navTo('skills'))} className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white group flex items-center gap-2">
          <span className="text-[#808080] group-hover:text-white">⚙</span> System Skills
        </button>

        <button onClick={() => handleAction(() => navTo('projects'))} className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white group flex items-center gap-2">
          <span className="text-[#808080] group-hover:text-white">📁</span> Projects & Docs
        </button>
        
        <div className="h-[2px] bg-white border-t border-[#808080] my-1 mx-2" />
        
        <button onClick={() => handleAction(() => setIsAnalyticsOpen(true))} className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white group flex items-center gap-2">
          <span className="text-[#808080] group-hover:text-white">📊</span> System Info
        </button>

        <button onClick={() => handleAction(() => setIsTerminalOpen(true))} className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white group flex items-center gap-2">
          <span className="text-[#808080] group-hover:text-white">_</span> Run Terminal
        </button>

        <div className="h-[2px] bg-white border-t border-[#808080] my-1 mx-2" />

        <button onClick={() => handleAction(toggleSound)} className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white group flex items-center gap-2">
          <span className="text-[#808080] group-hover:text-white">{soundEnabled ? '🔊' : '🔇'}</span> Sound: {soundEnabled ? 'ON' : 'OFF'}
        </button>

      </div>
    </div>
  );
}
