import React from 'react';

const GrainOverlay = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.05] mix-blend-overlay">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>
        </div>
    );
};

export default GrainOverlay;
