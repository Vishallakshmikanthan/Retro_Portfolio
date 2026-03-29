import React from 'react';
import { useWindow } from '../context/WindowContext';

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
        <div className="retro-window-title">{title || "Untitled"}</div>
        <div className="retro-window-controls">
          <button className="retro-window-btn">_</button>
          <button className="retro-window-btn">□</button>
          <button className="retro-window-btn">×</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="retro-window-content">
        {children}
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
  }
};

export default RetroWindow;
