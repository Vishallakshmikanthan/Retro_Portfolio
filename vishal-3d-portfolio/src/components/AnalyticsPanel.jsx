import React, { useEffect, useState } from 'react';
import { useSystemHUD } from '../context/SystemHUDContext';

export default function AnalyticsPanel() {
  const { isAnalyticsOpen, setIsAnalyticsOpen } = useSystemHUD();
  const [counts, setCounts] = useState({ projects: 0, skills: 0, uptime: 0 });

  useEffect(() => {
    if (!isAnalyticsOpen) return;
    let up = 0;
    const interval = setInterval(() => {
      setCounts(prev => ({
        projects: Math.min(prev.projects + 1, 14),
        skills: Math.min(prev.skills + 3, 42),
        uptime: up++
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [isAnalyticsOpen]);

  if (!isAnalyticsOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#c0c0c0] font-sans border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#444] shadow-lg w-[300px]">
        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center text-sm font-bold">
          <div className="flex items-center gap-2">
            <span>⚙</span>
            <span>ANALYTICS.EXE</span>
          </div>
          <button onClick={() => setIsAnalyticsOpen(false)} className="bg-[#c0c0c0] text-black px-1.5 pb-0.5 border-t border-l border-white border-b border-r border-[#444] font-bold text-xs hover:bg-white active:border-t-[#444] active:border-l-[#444] active:border-b-white active:border-r-white leading-none">
            X
          </button>
        </div>
        <div className="p-4 bg-white m-1 border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-white font-mono text-xs text-black">
          <div className="mb-2 border-b border-dashed border-[#ccc] pb-2 font-bold tracking-wider">SYSTEM DIAGNOSTICS</div>
          <div className="flex justify-between py-1"><span>PROJECTS_INDEXED:</span><span className="text-[#000080] font-bold">{counts.projects}</span></div>
          <div className="flex justify-between py-1 bg-gray-100"><span>SKILLS_VECTORS:</span><span className="text-[#000080] font-bold">{counts.skills}</span></div>
          <div className="flex justify-between py-1"><span>SESSION_UPTIME:</span><span className="text-[#000080] font-bold">{counts.uptime}s</span></div>
          <div className="flex justify-between py-1 bg-gray-100"><span>CPU_USAGE:</span><span className="text-[#000080] font-bold">4%</span></div>
          <div className="flex justify-between py-1"><span>MEMORY_ADDR:</span><span className="text-[#000080] font-bold">0x00FF</span></div>
          <div className="flex justify-between mt-2 pt-2 border-t border-dashed border-[#ccc] font-bold">
            <span>SYS_STATUS:</span>
            <span className="text-green-600 animate-pulse">OPTIMAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
