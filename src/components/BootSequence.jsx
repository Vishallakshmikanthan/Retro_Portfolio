import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const BootSequence = ({ onComplete }) => {
    const [bootLines, setBootLines] = useState([]);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);

    const fullLines = [
        "SYSTEM_INIT [OK]",
        "VISHAL_V98_BIOS REVISION 2.06",
        "CPU: INTEL CORE i9-13900K @ 5.8GHZ",
        "MEMORY CHECK: 65,536KB OK",
        "",
        "LOADING VISHAL.EXE...",
        "INITIALIZING THREE.JS_ENGINE...",
        "MOUNTING RETRO_UI.SYS...",
        "ESTABLISHING C:\_PORTFOLIO\CONNECTION...",
        "",
        "BOOT COMPLETE."
    ];

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Auto transition after a short delay
                setTimeout(onComplete, 1000);
            }
        });

        // Line-by-line typing effect
        fullLines.forEach((line, index) => {
            tl.to({}, { 
                duration: 0.1, 
                onComplete: () => {
                    setBootLines(prev => [...prev, line]);
                }
            }, "+=0.2");
        });

        // Progress bar animation
        tl.to({}, {
            duration: 2,
            onUpdate: function() {
                setProgress(Math.round(this.progress() * 100));
            }
        }, "-=2");

        // Skip on keydown
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                tl.kill();
                onComplete();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            tl.kill();
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const renderProgressBar = () => {
        const totalBlocks = 20;
        const filledBlocks = Math.round((progress / 100) * totalBlocks);
        const bar = '[' + '#'.repeat(filledBlocks) + '.'.repeat(totalBlocks - filledBlocks) + ']';
        return `${bar} ${progress}%`;
    };

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 bg-black text-[#00ff00] font-mono z-[10000] p-8 md:p-16 flex flex-col justify-between select-none"
        >
            <div className="boot-log text-[12px] md:text-[14px] leading-relaxed">
                {bootLines.map((line, i) => (
                    <div key={i} className="mb-1">{line}</div>
                ))}
                
                {/* Progress Bar area */}
                {bootLines.length > 5 && (
                    <div className="mt-8">
                        <div className="mb-2">LOAD_STATE:</div>
                        <div className="text-[16px] tracking-widest">{renderProgressBar()}</div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-end text-[10px] opacity-60">
                <div>VM_STATUS: NOMINAL</div>
                <div className="animate-pulse">PRESS ENTER TO SKIP</div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 0.2; }
                }
                .animate-pulse {
                    animation: pulse 1.5s infinite;
                }
            `}</style>
        </div>
    );
};

export default BootSequence;
