import React, { useState, useRef, useEffect } from 'react';
import { useSystemHUD } from '../context/SystemHUDContext';
import { useWindow } from '../context/WindowContext';

export default function TerminalLite() {
  const { isTerminalOpen, setIsTerminalOpen, dispatchMessage } = useSystemHUD();
  const { playSound } = useWindow();
  const [history, setHistory] = useState(['Vishal OS [Version 4.0.95]', '(c) Copyright 2026.']);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      playSound();
      const cmd = input.trim().toLowerCase();
      setHistory(prev => [...prev, `C:\\> ${input}`]);
      setInput('');

      if (cmd === 'clear' || cmd === 'cls') {
        setHistory([]);
      } else if (cmd === 'help') {
        setHistory(prev => [...prev, 'Available commands: projects, skills, contact, clear, exit']);
      } else if (['projects', 'skills', 'contact'].includes(cmd)) {
        setHistory(prev => [...prev, `Executing ${cmd}.exe...`]);
        dispatchMessage(`> Console initialized ${cmd}.exe`);
        setIsTerminalOpen(false);
        setTimeout(() => {
          document.getElementById(cmd)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else if (cmd === 'exit') {
        setIsTerminalOpen(false);
      } else if (cmd !== '') {
        setHistory(prev => [...prev, `'${cmd}' is not recognized as an internal or external command.`]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-transparent flex items-center justify-center pointer-events-none">
      <div className="bg-black text-[#c0c0c0] font-mono text-xs border-[3px] border-[#c0c0c0] shadow-[4px_4px_0px_rgba(0,0,0,0.5)] w-[400px] h-[250px] flex flex-col pointer-events-auto">
        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center text-sm font-bold font-sans">
          <span>_ MS-DOS Prompt</span>
          <button onClick={() => setIsTerminalOpen(false)} className="bg-[#c0c0c0] text-black px-1.5 pb-0.5 border-t border-l border-white border-b border-r border-[#444] hover:bg-white leading-none font-bold text-xs active:border-t-[#444] active:border-l-[#444] active:border-b-white active:border-r-white">
            X
          </button>
        </div>
        <div className="p-2 flex-grow overflow-auto flex flex-col cursor-text" onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => <div key={i}>{line}</div>)}
          <div className="flex">
            <span>C:\&gt;&nbsp;</span>
            <input 
              ref={inputRef}
              autoFocus
              className="bg-transparent outline-none flex-grow text-[#c0c0c0] caret-[#c0c0c0]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
