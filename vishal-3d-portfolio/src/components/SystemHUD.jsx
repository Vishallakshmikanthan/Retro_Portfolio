import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSystemHUD } from "../context/SystemHUDContext";
import { useWindow } from "../context/WindowContext";
import gsap from "gsap";
import ContextMenu from "./ContextMenu";

const StartMenu = lazy(() => import("./StartMenu"));
const AnalyticsPanel = lazy(() => import("./AnalyticsPanel"));
const TerminalLite = lazy(() => import("./TerminalLite"));

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit"
    });
  };

  return (
    <span className="font-sans text-xs text-black">
      {formatTime(time)}
    </span>
  );
}

function ScrollProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
      setProgress(Math.round(scrolled));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-full px-2 mx-1 flex items-center border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-white bg-[#c0c0c0] text-[10px] font-sans font-bold shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] w-[100px] justify-center tracking-tighter cursor-default select-none">
      Progress: {progress < 10 ? `0${progress}` : progress}%
    </div>
  );
}

function SystemTaskbar() {
  const { isStartMenuOpen, setIsStartMenuOpen } = useSystemHUD();
  const { activeWindow } = useWindow();

  return (
    <div className="fixed bottom-0 left-0 w-full h-[28px] bg-[#c0c0c0] border-t-2 border-white z-[9998] flex items-center justify-between px-1 shadow-[0_-1px_2px_rgba(0,0,0,0.2)]">
      <div className="flex items-center h-full pt-1 pb-1">
        <button 
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={`flex items-center gap-1 h-full px-2 font-bold text-sm ${isStartMenuOpen ? 'border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-white bg-[#d0d0d0]' : 'border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#444] hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white'}`}
        >
          <span className="text-[#000080] mr-1 text-lg leading-none mt-[-2px]">❖</span> 
          <span>Start</span>
        </button>
        {activeWindow && (
          <div className="ml-1 h-full flex items-center gap-1 px-3 font-bold text-xs bg-[#c8c8c8] border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-white shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] cursor-default">
            <span>{activeWindow}</span>
          </div>
        )}
      </div>
      <div className="flex items-center h-full py-1 pr-1">
        <ScrollProgressIndicator />
        <div className="h-full px-2 flex items-center border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-white bg-[#c0c0c0] min-w-[60px] justify-center">
          <LiveClock />
        </div>
      </div>
    </div>
  );
}

function MessagesHUD() {
  const { messages } = useSystemHUD();

  return (
    <div className="fixed top-24 left-4 z-[9999] pointer-events-none flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-black/80 border border-[#00ff00]/50 p-2 font-mono text-[11px] text-[#00ff00] uppercase tracking-widest backdrop-blur-sm overflow-hidden whitespace-nowrap shadow-[2px_2px_0px_#00ff0033]"
        >
          <div className="animate-[typing_1s_steps(30,end)]">
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function FileExplorerOverlay() {
  const { isExplorerOpen, setIsExplorerOpen, dispatchMessage } = useSystemHUD();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isExplorerOpen) {
        setIsExplorerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExplorerOpen, setIsExplorerOpen]);

  if (!isExplorerOpen) return null;

  const handleNav = (target) => {
    setIsExplorerOpen(false);
    dispatchMessage(`> Executing ${target}.EXE...`);
    const el = document.querySelector(target === 'home' ? '#hero' : `#${target}`);
    if (el) {
      setTimeout(() => {
         el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#c0c0c0] text-black font-sans border-t-2 border-l-2 border-white border-b-2 border-r-2 border-slate-800 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] w-[400px] max-w-[90vw]">
        {/* Title Bar */}
        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center text-sm font-bold">
          <div className="flex items-center gap-2">
            <span>📁</span>
            <span>SYSTEM_EXPLORER.EXE</span>
          </div>
          <button 
            onClick={() => setIsExplorerOpen(false)}
            className="bg-[#c0c0c0] text-black px-2 pb-0.5 border-t border-l border-white border-b border-r border-[#444] font-bold text-xs hover:bg-white active:border-t-[#444] active:border-l-[#444] active:border-b-white active:border-r-white"
          >
            X
          </button>
        </div>
        
        {/* Body */}
        <div className="p-4 bg-white m-1 border-t-2 border-l-2 border-[#888] border-b-2 border-r-2 border-[#fff] min-h-[200px]">
          <div className="font-mono text-sm mb-4">C:\VP\SYSTEM_ROOT&gt; dir</div>
          <ul className="font-mono text-sm space-y-2 cursor-pointer">
            <li className="hover:bg-[#000080] hover:text-white px-1" onClick={() => handleNav('home')}>
              <span className="text-yellow-500 mr-2">📁</span>[ROOT]
            </li>
            <li className="hover:bg-[#000080] hover:text-white px-1" onClick={() => handleNav('about')}>
              <span className="text-yellow-500 mr-2">📁</span>ABOUT
            </li>
            <li className="hover:bg-[#000080] hover:text-white px-1" onClick={() => handleNav('skills')}>
              <span className="text-yellow-500 mr-2">📁</span>SKILLS
            </li>
            <li className="hover:bg-[#000080] hover:text-white px-1" onClick={() => handleNav('projects')}>
              <span className="text-yellow-500 mr-2">📁</span>PROJECTS
            </li>
            <li className="hover:bg-[#000080] hover:text-white px-1" onClick={() => handleNav('milestones')}>
              <span className="text-yellow-500 mr-2">📁</span>MILESTONES
            </li>
            <li className="hover:bg-[#000080] hover:text-white px-1" onClick={() => handleNav('contact')}>
              <span className="text-yellow-500 mr-2">📁</span>CONTACT
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DeveloperModeOverlay() {
    const { isDeveloperMode, dispatchMessage } = useSystemHUD();
    
    useEffect(() => {
        if (isDeveloperMode) {
            dispatchMessage("> Unauthorized access detected...", 3000);
            setTimeout(() => dispatchMessage("> Overriding security...", 3000), 1000);
            setTimeout(() => dispatchMessage("> Developer Mode Enabled.", 5000), 2000);
        }
    }, [isDeveloperMode, dispatchMessage]);

    if (!isDeveloperMode) return null;

    return (
        <div className="fixed top-4 right-4 z-[9990] pointer-events-none font-mono text-[10px] text-red-500 uppercase tracking-widest bg-black/80 px-2 py-2 border border-red-500/50 backdrop-blur-md flex flex-col gap-1 shadow-[0_0_10px_rgba(255,0,0,0.3)]">
            <div className="pb-1 border-b border-red-500/30 mb-1 text-center font-bold">DEV_MODE_ACTIVE</div>
            <div>FPS: 60</div>
            <div>MEM: 42MB</div>
            <div>VRAM_OPTI: TRUE</div>
            <div>SHADERS: COMPILED</div>
            <div>LOG_LEVEL: VERBOSE</div>
        </div>
    );
}

export default function SystemHUD() {
  const { setContextMenu } = useSystemHUD();

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, [setContextMenu]);

  return (
    <>
      <MessagesHUD />
      <SystemTaskbar />
      <FileExplorerOverlay />
      <DeveloperModeOverlay />
      <ContextMenu />
      <Suspense fallback={null}>
        <StartMenu />
        <AnalyticsPanel />
        <TerminalLite />
      </Suspense>
    </>
  );
}
