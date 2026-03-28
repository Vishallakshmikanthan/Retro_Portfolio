import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RetroButton from './RetroButton';

/**
 * RetroDialog Component
 * A Windows 98 / XP style popup dialog.
 * 
 * Props:
 * - isOpen: Boolean to control visibility
 * - title: Title bar text
 * - message: Dialog content text
 * - onConfirm: Function for "Yes" or "OK" click
 * - onCancel: Function for "No" or "Cancel" click
 * - type: 'ok' | 'yesno'
 * - onClose: Function for clicking the close "X"
 */
const RetroDialog = ({ 
  isOpen, 
  title = "Message", 
  message, 
  onConfirm, 
  onCancel, 
  onClose,
  type = 'ok' 
}) => {
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Show animation
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(dialogRef.current, 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleClose = (callback) => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (callback) callback();
        if (onClose) onClose();
      }
    });

    tl.to(dialogRef.current, { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.15 }, "-=0.1");
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef} 
      className="retro-dialog-overlay"
      style={styles.overlay}
    >
      <div 
        ref={dialogRef} 
        className="retro-dialog-window" 
        style={styles.dialog}
      >
        {/* Title Bar */}
        <div className="retro-dialog-title-bar" style={styles.titleBar}>
          <span style={styles.titleText}>{title}</span>
          <button 
            onClick={() => handleClose(onClose)} 
            style={styles.closeBtn}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="retro-dialog-content" style={styles.content}>
          <div style={styles.messageRow}>
            {/* Optional: Add a classic info/warning icon here if needed */}
            <p style={styles.message}>{message}</p>
          </div>

          {/* Buttons Footer */}
          <div style={styles.footer}>
            {type === 'ok' ? (
              <RetroButton onClick={() => handleClose(onConfirm)}>
                OK
              </RetroButton>
            ) : (
              <>
                <RetroButton onClick={() => handleClose(onConfirm)}>
                  Yes
                </RetroButton>
                <RetroButton onClick={() => handleClose(onCancel)}>
                  No
                </RetroButton>
              </>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          .retro-dialog-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .retro-dialog-window {
            background-color: #c0c0c0;
            border-top: 2px solid #ffffff;
            border-left: 2px solid #ffffff;
            border-right: 2px solid #000000;
            border-bottom: 2px solid #000000;
            width: 320px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  overlay: {
    // handled by CSS in style tag above for brevity/clarity
  },
  dialog: {
    // handled by CSS in style tag above
  },
  titleBar: {
    background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 4px 0 6px',
    userSelect: 'none',
  },
  titleText: {
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 'bold',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
  },
  closeBtn: {
    width: '16px',
    height: '14px',
    backgroundColor: '#c0c0c0',
    borderTop: '1px solid #ffffff',
    borderLeft: '1px solid #ffffff',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    lineHeight: '1',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0 0 2px 0',
  },
  content: {
    padding: '16px 20px',
  },
  messageRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '12px',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
    color: '#000000',
    lineHeight: '1.4',
    margin: 0,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  }
};

export default RetroDialog;
