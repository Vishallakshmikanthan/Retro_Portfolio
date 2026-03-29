import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Taskbar = () => {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [windowCount, setWindowCount] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const cpuBarRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setScrollPercent(Math.round(percent));

            // CPU BAR (FAKE): Animated bar (based on scroll)
            // Using transform scaleX for performance
            if (cpuBarRef.current) {
                // We add some "noise" to make it look like CPU activity
                const fakeActivity = Math.sin(Date.now() / 500) * 10 + 20; // 10-30% base
                const scrollEffect = percent * 0.7; // CPU increases with scroll
                const total = Math.min(100, fakeActivity + scrollEffect);
                gsap.to(cpuBarRef.current, {
                    scaleX: total / 100,
                    duration: 0.1,
                    ease: "none"
                });
            }
        };

        const countWindows = () => {
             // Track open windows
            const count = document.querySelectorAll('.retro-window-container').length;
            setWindowCount(count);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call
        handleScroll();
        countWindows();

        // Observation for window count changes
        const observer = new MutationObserver(countWindows);
        observer.observe(document.body, { childList: true, subtree: true });

        // Interaction for clock update
        const clockInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
            clearInterval(clockInterval);
        };
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full h-[32px] bg-[#c0c0c0] border-t-2 border-white shadow-[0_-1px_0_1px_#808080] flex items-center px-1 z-[1000] select-none font-mono">
           
            {/* Start Button Area */}
            <div className="flex items-center border-b-2 border-r-2 border-black bg-[#c0c0c0] px-2 h-6 mr-4 active:border-t-2 active:border-l-2 active:border-b-0 active:border-r-0 cursor-default">
                <span className="text-[12px] font-bold italic mr-1">V</span>
                <span className="text-[11px] font-bold">Start</span>
            </div>

            {/* Middle Section (Empty for now) */}
            <div className="flex-1 overflow-hidden flex gap-1 h-full items-center">
                {/* Taskbar items could go here */}
            </div>

            {/* System tray / stats area */}
            <div className="flex items-center h-6 border-t-2 border-l-2 border-white bg-[#c0c0c0] shadow-[inset_-1px_-1px_0_1px_#808080] px-2 gap-4 text-[10px]">
                
                {/* 1. SCROLL % */}
                <div className="flex items-center gap-1 border-r border-gray-600 pr-2 h-full">
                    <span>SCROLL:</span>
                    <span className="w-8 text-right">{scrollPercent}%</span>
                </div>

                {/* 2. CPU BAR (FAKE) */}
                <div className="flex items-center gap-1 border-r border-gray-600 pr-2 h-full">
                    <span>CPU:</span>
                    <div className="w-12 h-3 bg-gray-800 border border-white/20 relative overflow-hidden">
                        <div 
                            ref={cpuBarRef}
                            className="absolute top-0 left-0 h-full bg-[#00ff22] origin-left scale-x-0"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {/* 3. WINDOW COUNT */}
                <div className="flex items-center gap-1 h-full">
                    <span>WIN:</span>
                    <span>{windowCount}</span>
                </div>

                {/* Clock placeholder (Classic Win98) */}
                <div className="ml-2 font-bold opacity-80 min-w-[70px] text-center">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
            </div>

            <style>{`
                .active\\:border-t-2:active {
                    border-top-width: 2px !important;
                    border-left-width: 2px !important;
                }
            `}</style>
        </div>
    );
};

export default Taskbar;
