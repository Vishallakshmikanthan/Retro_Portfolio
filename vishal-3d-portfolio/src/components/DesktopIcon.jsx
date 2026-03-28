import React from 'react';

const DesktopIcon = ({ icon, label, onClick }) => {
  return (
    <div 
      className="desktop-icon" 
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70px',
        padding: '8px 4px',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background 0.1s',
      }}
    >
      <div 
        className="icon-image-container"
        style={{
          width: '32px',
          height: '32px',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src={icon} 
          alt={label} 
          style={{ 
            width: '100%', 
            height: '100%', 
            imageRendering: 'pixelated',
            objectFit: 'contain',
            display: 'block'
          }} 
        />
      </div>
      <span 
        style={{
          color: '#fff',
          fontSize: '11px',
          textAlign: 'center',
          fontFamily: 'monospace',
          textShadow: '1px 1px 0px #000',
          padding: '1px 3px',
          maxWidth: '100%',
          wordWrap: 'break-word',
          background: 'rgba(0,0,0,0.5)', /* Added background for legibility over wallpaper */
          marginTop: '2px'
        }}
      >
        {label}
      </span>
      
    </div>
  );
};

export default DesktopIcon;
