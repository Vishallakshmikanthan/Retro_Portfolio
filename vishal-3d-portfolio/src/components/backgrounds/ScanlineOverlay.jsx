import React from 'react';

const ScanlineOverlay = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.08]">
            <div 
                className="w-full h-full"
                style={{
                    background: 'repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 2px)',
                    backgroundSize: '100% 4px'
                }}
            />
        </div>
    );
};

export default ScanlineOverlay;
