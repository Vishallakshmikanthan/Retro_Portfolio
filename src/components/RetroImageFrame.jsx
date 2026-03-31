import React, { useState, useEffect } from 'react';

export default function RetroImageFrame({ src = '/images/profile_photo.jpg', alt = 'Profile' }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Failsafe in case onLoad doesn't fire (e.g. cached image)
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="retro-image-frame" style={styles.container}>
      {/* Top fake Paint-style toolbar */}
      <div style={styles.topToolbar}>
        {/* Fake small buttons/icons */}
        <div style={styles.toolbarBtn} title="Select">
           <div style={styles.fakeIconLine} />
        </div>
        <div style={styles.toolbarBtn} title="Eraser">
           <div style={styles.fakeIconSquare} />
        </div>
        <div style={styles.toolbarBtn} title="Fill">
           <div style={styles.fakeIconDot} />
        </div>
        <div style={styles.toolbarBtn} title="Pencil">
           <div style={styles.fakeIconPencil} />
        </div>
        <div style={styles.toolbarBtn} title="Text">
           <span style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: 1, fontFamily: '"MS Sans Serif", Arial, sans-serif' }}>A</span>
        </div>
      </div>

      {/* Inner canvas area */}
      <div style={styles.canvasContainer}>
        <img 
          src={src} 
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            ...styles.image,
            opacity: loaded ? 1 : 0,
          }} 
          draggable="false"
        />
      </div>

      {/* Bottom bar (Retro Status Bar) */}
      <div style={styles.bottomBar}>
        <span style={styles.statusText}>For Help, click Help Topics on the Help Menu.</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #808080',
    background: '#C0C0C0',
    boxShadow: 'inset -1px -1px #fff, inset 1px 1px #000',
    boxSizing: 'border-box',
  },
  topToolbar: {
    height: '24px',
    background: '#C0C0C0',
    borderBottom: '1px solid #808080',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',
    gap: '4px',
  },
  toolbarBtn: {
    width: '20px',
    height: '20px',
    borderTop: '1px solid #fff',
    borderLeft: '1px solid #fff',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    background: '#C0C0C0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
    color: '#000',
  },
  fakeIconLine: {
    width: '12px',
    height: '2px',
    background: '#000',
    transform: 'rotate(-45deg)',
  },
  fakeIconSquare: {
    width: '8px',
    height: '8px',
    border: '1px solid #000',
    background: '#fff',
  },
  fakeIconDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#000',
  },
  fakeIconPencil: {
    width: '2px',
    height: '10px',
    background: '#000',
    transform: 'rotate(45deg)',
  },
  canvasContainer: {
    flex: 1,
    background: 'black',
    padding: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'opacity 150ms ease-in',
  },
  bottomBar: {
    height: '20px',
    background: '#C0C0C0',
    borderTop: '1px solid #808080',
    display: 'flex',
    alignItems: 'center',
    padding: '0 6px',
  },
  statusText: {
    fontSize: '10px',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
    color: '#000',
  }
};
