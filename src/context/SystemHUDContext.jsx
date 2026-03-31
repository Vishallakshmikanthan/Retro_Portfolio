import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const SystemHUDContext = createContext(null);

export function SystemHUDProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Helper to add a message, preventing identical messages from spamming
  const dispatchMessage = useCallback((msg, duration = 3000) => {
    setMessages((prev) => {
      // Don't add if the same message is already currently displaying
      if (prev.some(m => m.text === msg)) return prev;
      
      const newMsg = { id: Date.now() + Math.random(), text: msg };
      
      setTimeout(() => {
        setMessages((current) => current.filter((m) => m.id !== newMsg.id));
      }, duration);
      
      return [...prev, newMsg];
    });
  }, []);

  const toggleExplorer = useCallback(() => setIsExplorerOpen(p => !p), []);
  const togglePerformanceMode = useCallback(() => setIsPerformanceMode(p => !p), []);
  const enableDeveloperMode = useCallback(() => setIsDeveloperMode(true), []);

  useEffect(() => {
    if (isPerformanceMode) {
      document.body.classList.add("performance-mode");
    } else {
      document.body.classList.remove("performance-mode");
    }
  }, [isPerformanceMode]);

  return (
    <SystemHUDContext.Provider value={{
      messages,
      dispatchMessage,
      isExplorerOpen,
      setIsExplorerOpen,
      toggleExplorer,
      isPerformanceMode,
      togglePerformanceMode,
      isDeveloperMode,
      enableDeveloperMode,
      contextMenu,
      setContextMenu,
      isStartMenuOpen,
      setIsStartMenuOpen,
      isAnalyticsOpen,
      setIsAnalyticsOpen,
      isTerminalOpen,
      setIsTerminalOpen
    }}>
      {children}
    </SystemHUDContext.Provider>
  );
}

export function useSystemHUD() {
  const context = useContext(SystemHUDContext);
  if (!context) {
    throw new Error("useSystemHUD must be used within a SystemHUDProvider");
  }
  return context;
}
