import React from 'react';
import { useWindow } from '../context/WindowContext';

/**
 * RetroButton Component
 * A Windows 98 / XP style pixel button.
 * 
 * Props:
 * - children: Content to display inside the button
 * - onClick: Function to call on click
 * - href: If provided, renders as an anchor tag
 * - download: Boolean for download attribute
 * - type: HTML button type
 * - className: Additional CSS classes
 * - disabled: Boolean for disabled state
 */
const RetroButton = ({ 
  children, 
  onClick, 
  href, 
  download, 
  type = 'button', 
  className = '', 
  disabled = false 
}) => {
  const { playSound } = useWindow();
  const isLink = !!href;
  const Component = isLink ? 'a' : 'button';
  const props = isLink 
    ? { href, download, target: "_blank", rel: "noopener noreferrer", onClick: playSound } 
    : { onClick: (e) => { playSound(); if(onClick) onClick(e); }, type, disabled };

  return (
    <Component
      {...props}
      className={`retro-button ${className}`}
      style={styles.button}
    >
      <span className="retro-button-content" style={styles.content}>
        {children}
      </span>

      <style>
        {`
          .retro-button {
             background-color: #c0c0c0;
             border-top: 2px solid #ffffff;
             border-left: 2px solid #ffffff;
             border-right: 2px solid #000000;
             border-bottom: 2px solid #000000;
             padding: 4px 12px;
             font-family: 'MS Sans Serif', Arial, sans-serif;
             font-size: 13px;
             font-weight: bold;
             color: #000000;
             cursor: pointer;
             display: inline-flex;
             align-items: center;
             justify-content: center;
             text-decoration: none;
             user-select: none;
             transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
             box-sizing: border-box;
          }
          
          .retro-button:active:not(:disabled) {
             border-top: 2px solid #000000;
             border-left: 2px solid #000000;
             border-right: 2px solid #ffffff;
             border-bottom: 2px solid #ffffff;
             transform: translate(2px, 2px); /* Authentic push effect */
          }

          .retro-button:disabled {
             color: #808080;
             cursor: not-allowed;
          }

          .retro-button:focus {
             outline: 1px dotted #000000;
             outline-offset: -4px;
          }
        `}
      </style>
    </Component>
  );
};

const styles = {
  button: {
    minWidth: '80px',
    height: '32px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    lineHeight: '1',
  }
};

export default RetroButton;
