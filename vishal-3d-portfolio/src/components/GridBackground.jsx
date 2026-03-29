import React from 'react';

const GridBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none select-none opacity-[0.03]">
            {/* SVG Grid Pattern */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <pattern id="scanlines" width="100%" height="4" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <rect width="100%" height="100%" fill="url(#scanlines)" />
            </svg>
        </div>
    );
};

export default GridBackground;
