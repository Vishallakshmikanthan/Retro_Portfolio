import React from 'react';
import ModelViewer from './ModelViewer';

/**
 * MediaPlayerFrame Component
 * A strict Windows 98 styled container.
 */
export default function MediaPlayerFrame() {
  return (
    <div className="wmp-container" style={styles.container}>
      {/* Title Bar */}
      <div className="wmp-title-bar" style={styles.titleBar}>
        <div style={styles.titleTextContainer}>
          <div style={styles.wmpIcon}></div>
          <span style={styles.titleBarText}>Windows Media Player</span>
        </div>
        <div style={styles.titleBarButtons}>
          <div style={styles.titleBarBtn}>_</div>
          <div style={styles.titleBarBtn}>□</div>
          <div style={styles.titleBarBtnClose}>X</div>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="wmp-menu-bar" style={styles.menuBar}>
        {['File', 'View', 'Play', 'Tools', 'Help'].map(item => (
          <span key={item} style={styles.menuItem}>{item}</span>
        ))}
      </div>

      {/* Main Content Area (Model Viewer) */}
      <div className="wmp-content" style={styles.contentArea}>
        <ModelViewer />
      </div>

      {/* Status Bar */}
      <div className="wmp-status-bar" style={styles.statusBar}>
        <span style={styles.statusText}>Move: Swirl | Click: Rotate | Scroll: Zoom — Go Immersive!</span>
      </div>

      {/* Playback Controls */}
      <div className="wmp-controls" style={styles.controls}>
        <div style={styles.playbackButtons}>
           <div style={styles.retroBtn}>▶</div>
           <div style={styles.retroBtn}>⏸</div>
           <div style={styles.retroBtn}>⏹</div>
           <div style={{...styles.retroBtn, margin: '0 4px'}}>⏮</div>
           <div style={styles.retroBtn}>⏭</div>
        </div>
        <div style={styles.progressBarTrack}>
          <div style={styles.progressBarFill}></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '700px',
    height: '550px',
    background: '#c0c0c0',
    borderTop: '2px solid #ffffff',
    borderLeft: '2px solid #ffffff',
    borderRight: '2px solid #000000',
    borderBottom: '2px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
    overflow: 'hidden',
    userSelect: 'none',
  },
  titleBar: {
    height: '24px',
    background: '#000080',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2px 4px',
    color: '#fff',
  },
  titleTextContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  wmpIcon: {
    width: '16px',
    height: '16px',
    background: '#c0c0c0',
    border: '1px solid #000',
  },
  titleBarText: {
    fontSize: '11px',
    fontWeight: 'bold',
  },
  titleBarButtons: {
    display: 'flex',
    gap: '2px',
  },
  titleBarBtn: {
    width: '16px',
    height: '14px',
    background: '#c0c0c0',
    borderTop: '1px solid #fff',
    borderLeft: '1px solid #fff',
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: '#000',
  },
  titleBarBtnClose: {
     width: '16px',
     height: '14px',
     background: '#c0c0c0',
     borderTop: '1px solid #fff',
     borderLeft: '1px solid #fff',
     borderRight: '1px solid #000',
     borderBottom: '1px solid #000',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     fontSize: '10px',
     fontWeight: 'bold',
     color: '#000',
  },
  menuBar: {
    height: '20px',
    background: '#c0c0c0',
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',
    fontSize: '11px',
    borderBottom: '1px solid #808080',
  },
  menuItem: {
    padding: '0 6px',
    cursor: 'pointer',
  },
  contentArea: {
    flex: 1,
    background: '#000', /* Black background to contrast the model */
    margin: '4px',
    border: '2px solid #808080', /* Inset look */
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    position: 'relative',
  },
  statusBar: {
    height: '20px',
    background: '#c0c0c0',
    borderTop: '1px solid #808080',
    display: 'flex',
    alignItems: 'center',
    padding: '0 6px',
    fontSize: '10px',
  },
  statusText: {
    color: '#000',
  },
  controls: {
    height: '50px',
    background: '#c0c0c0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 10px',
    borderTop: '1px solid #fff',
  },
  playbackButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
  },
  retroBtn: {
    width: '22px',
    height: '20px',
    background: '#c0c0c0',
    borderTop: '1px solid #fff',
    borderLeft: '1px solid #fff',
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    cursor: 'pointer',
    color: '#000',
  },
  progressBarTrack: {
    width: '100%',
    height: '14px',
    background: '#fff',
    borderTop: '1px solid #808080',
    borderLeft: '1px solid #808080',
    borderRight: '1px solid #fff',
    borderBottom: '1px solid #fff',
    marginTop: '6px',
    position: 'relative',
  },
  progressBarFill: {
    width: '30%',
    height: '100%',
    background: '#000080',
  }
};
