import React from 'react';
import { useWindow } from '../context/WindowContext';
import SystemErrorBoundary from './SystemErrorBoundary';

/**
 * RetroWindow Component
 * A Windows 98 / XP inspired UI wrapper for portfolio sections.
 */
const RetroWindow = ({ title, children, className = "", style = {}, onClick, id }) => {
  const { activeWindow } = useWindow();
  const isActive = activeWindow === title;

  return (
    <div 
      id={id}
      className={`retro-window-container retro-window ${className}`} 
      style={{ ...styles.container, ...style }}
      onClick={onClick}
      data-active={isActive ? "true" : "false"}
    >
      <style>
        {`
          .retro-window-container {
             box-sizing: border-box;
             transition: box-shadow 0.2s ease, transform 0.3s ease;
          }
          .retro-window-container:hover {
             /* Handled by 3D depth hook and index.css hover rules */
          }
          /* Visual cue for the "Active" window */
          .retro-window-container[data-active="true"] {
             border-color: #000;
          }
          .retro-window-container[data-active="true"] .retro-window-title-bar {
             background: #000080; /* Dark blue when active */
          }
          .retro-window-container[data-active="false"] .retro-window-title-bar {
             background: #808080; /* Gray when inactive */
          }
          
          .retro-window-title-bar {
             background: #000080;
             padding: 3px 2px 3px 6px;
             display: flex;
             align-items: center;
             justify-content: space-between;
             font-family: "Courier New", monospace;
             font-weight: bold;
             color: white;
             font-size: 14px;
             height: 28px;
             user-select: none;
          }
          .retro-window-title {
             overflow: hidden;
             white-space: nowrap;
             text-overflow: ellipsis;
             flex-grow: 1;
             margin-right: 8px;
             letter-spacing: 1px;
             text-transform: uppercase;
          }
          .retro-window-controls {
             display: flex;
             gap: 2px;
             align-items: center;
          }
          .retro-window-btn {
             width: 18px;
             height: 18px;
             background-color: #c0c0c0;
             border: 1px solid #000;
             display: flex;
             align-items: center;
             justify-content: center;
             cursor: pointer;
             font-size: 10px;
             font-weight: bold;
             color: #000;
          }
          .retro-window-content {
             padding: 0;
             background-color: #c0c0c0;
             position: relative;
             color: black;
             height: 100%;
             display: flex;
             flex-direction: column;
          }
        `}
      </style>

      {/* Title Bar */}
      <div className="retro-window-title-bar">
        <div className="retro-window-title">
          {title || "Untitled"}
          {isActive ? <span className="text-[#00ff00] font-normal ml-2 tracking-widest">[ACTIVE]</span> : ""}
        </div>
        <div className="retro-window-controls">
          <button className="retro-window-btn">_</button>
          <button className="retro-window-btn">□</button>
          <button className="retro-window-btn">×</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="retro-window-content">
        <SystemErrorBoundary>
          {children}
        </SystemErrorBoundary>
      </div>

      {/* Windows 95 Status Bar */}
      <div className="retro-window-status-bar" style={styles.statusBar}>
        <div style={styles.statusSection}>Status: Ready</div>
        <div style={styles.statusSection}>Objects: {React.Children.count(children)}</div>
        <div style={styles.statusSection}>Mode: Optimal</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#c0c0c0',
    border: '2px solid #000',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    width: '100%',
  },
  statusBar: {
    display: 'flex',
    backgroundColor: '#c0c0c0',
    borderTop: '1px outset #fff',
    borderBottom: '1px inset #000',
    height: '20px',
    fontSize: '11px',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
    color: '#000',
  },
  statusSection: {
    padding: '2px 6px',
    flex: 1,
    borderRight: '1px outset #fff',
    borderLeft: '1px inset #808080',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
};

export default RetroWindow;
