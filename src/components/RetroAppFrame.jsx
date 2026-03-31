import React, { useState, useEffect } from 'react';

const RetroAppFrame = ({ src = '/images/profile_photo.jpg', alt = 'Profile' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ ...styles.outer_frame, opacity: visible ? 1 : 0 }}>
      {/* Fake Toolbar */}
      <div style={styles.toolbar_area}>
        <div style={styles.iconBox} title="Selection Box">
          <div style={{ border: '1px dashed #000', width: '10px', height: '10px' }} />
        </div>
        <div style={styles.iconBox} title="Pencil Tool">
           <div style={{ width: '2px', height: '10px', background: '#000', transform: 'rotate(45deg)' }} />
        </div>
        <div style={styles.iconBox} title="Rectangle Tool">
           <div style={{ border: '1px solid #000', width: '10px', height: '10px' }} />
        </div>
        <div style={styles.iconBox} title="Text Tool">
           <span style={{ fontSize: '10px', fontWeight: 'bold' }}>A</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div style={styles.canvas_area}>
        <div style={styles.inner_canvas}>
          <img 
            src={src} 
            alt={alt} 
            style={styles.image}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div style={styles.status_bar}>
        <span style={styles.status_text}>For Help, click Help Topics on the Help Menu.</span>
      </div>
    </div>
  );
};

const styles = {
  outer_frame: {
    background: '#C0C0C0',
    borderTop: '2px solid #FFFFFF',
    borderLeft: '2px solid #FFFFFF',
    borderBottom: '2px solid #000000',
    borderRight: '2px solid #000000',
    padding: '2px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'opacity 150ms ease-in',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
  },
  toolbar_area: {
    height: '28px',
    background: '#C0C0C0',
    borderBottom: '1px solid #808080',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0 6px',
    boxSizing: 'border-box',
  },
  iconBox: {
    width: '16px',
    height: '16px',
    border: '1px solid #808080',
    background: '#E0E0E0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
  },
  canvas_area: {
    flex: 1,
    background: 'transparent',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  inner_canvas: {
    background: 'transparent',
    padding: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
    userSelect: 'none',
  },
  status_bar: {
    height: '20px',
    background: '#C0C0C0',
    borderTop: '1px solid #808080',
    display: 'flex',
    alignItems: 'center',
    padding: '0 6px',
    boxSizing: 'border-box',
  },
  status_text: {
    fontSize: '11px',
    color: '#000',
  }
};

export default RetroAppFrame;
