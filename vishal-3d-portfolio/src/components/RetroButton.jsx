import React, { useState } from 'react';
import { useWindow } from '../context/WindowContext';
import { useSystemHUD } from '../context/SystemHUDContext';

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
 * - hoverLabel: Text to display on hover
 * - onClickLabel: Text to display on click before action (simulates delay)
 */
const RetroButton = ({ 
  children, 
  onClick, 
  href, 
  download, 
  type = 'button', 
  className = '', 
  disabled = false,
  hoverLabel,
  onClickLabel
}) => {
  const { playSound } = useWindow();
  const { dispatchMessage } = useSystemHUD();
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const displayContent = isPending && onClickLabel 
    ? onClickLabel 
    : (isHovered && hoverLabel ? hoverLabel : children);

  const handleClick = (e) => {
    playSound();
    dispatchMessage(onClickLabel ? `> ${onClickLabel}` : "> Executing...", 2000);
    if (onClickLabel && href) {
        e.preventDefault();
        setIsPending(true);
        document.body.classList.add('cursor-wait');
        setTimeout(() => {
            setIsPending(false);
            document.body.classList.remove('cursor-wait');
            const a = document.createElement('a');
            a.href = href;
            if (download) a.download = download === true ? '' : download;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.click();
        }, 400);
    } else {
        if (href) {
            // For regular links without intercept, just brief delay
            e.preventDefault();
            document.body.classList.add('cursor-wait');
            setTimeout(() => {
                document.body.classList.remove('cursor-wait');
                const a = document.createElement('a');
                a.href = href;
                if (download) a.download = download === true ? '' : download;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.click();
            }, 100);
        } else if (onClick) {
            // Delay action slightly for tactile feedback
            e.preventDefault();
            document.body.classList.add('cursor-wait');
            setTimeout(() => { 
                document.body.classList.remove('cursor-wait');
                onClick(e);
            }, 80);
        }
    }
  };

  const isLink = !!href && !onClickLabel; // If intercepting, use button to prevent initial nav
  const Component = 'button'; // Force button to allow synthetic delay handling
  const props = { onClick: handleClick, type, disabled };

  return (
    <Component
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
      className={`retro-button ${className}`}
      style={styles.button}
    >
      <span className="retro-button-content" style={styles.content}>
        {displayContent}
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
             transition: transform 0.05s linear, box-shadow 0.05s linear;
             box-sizing: border-box;
          }
          
          .retro-button:hover:not(:disabled) {
             transform: translateY(-2px);
             box-shadow: 1px 1px 0 #000;
          }

          .retro-button:active:not(:disabled) {
             border-top: 2px solid #000000;
             border-left: 2px solid #000000;
             border-right: 2px solid #ffffff;
             border-bottom: 2px solid #ffffff;
             transform: translateY(1px);
             box-shadow: inset 1px 1px 0 #000;
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
