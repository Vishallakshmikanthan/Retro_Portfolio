import React, { useState, useEffect, useCallback } from 'react';
import { BG_STYLES, getInitialStyle, getStyleKeyFromId } from '../../data/bgConfig';
import StarfieldBg from './StarfieldBg';
import MatrixBg from './MatrixBg';
import GrainOverlay from './GrainOverlay';
import ScanlineOverlay from './ScanlineOverlay';
import GridBackground from '../GridBackground';

const RetroBackground = () => {
  const [currentStyle, setCurrentStyle] = useState(getInitialStyle());
  const [previousStyle, setPreviousStyle] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const updateStyle = useCallback((newStyle) => {
    if (newStyle === currentStyle) return;
    setPreviousStyle(currentStyle);
    setCurrentStyle(newStyle);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setPreviousStyle(null);
      setIsTransitioning(false);
    }, 500);
  }, [currentStyle]);

  useEffect(() => {
    const handleStyleChange = (e) => updateStyle(e.detail);
    const handleStorage = () => updateStyle(getInitialStyle());

    window.addEventListener('bgStyleChange', handleStyleChange);
    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('bgStyleChange', handleStyleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [updateStyle]);

  const renderStyle = (styleId) => {
    const styleKey = getStyleKeyFromId(styleId);
    
    switch (styleKey) {
      case 'STARFIELD':
        return <StarfieldBg />;
      case 'MATRIX':
        return <MatrixBg />;
      case 'GRID':
        return <GridBackground />;
      case 'SOLID':
      default:
        // Pure retro flat color, no gradients
        return <div className="fixed inset-0 bg-[#008080]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      {/* Previous Background (Fading Out) */}
      {previousStyle && (
        <div 
          className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {renderStyle(previousStyle)}
        </div>
      )}

      {/* Current Background (Fading In) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {renderStyle(currentStyle)}
      </div>

      {/* Global Overlays */}
      <GrainOverlay />
      <ScanlineOverlay />
    </div>
  );
};

export default RetroBackground;
