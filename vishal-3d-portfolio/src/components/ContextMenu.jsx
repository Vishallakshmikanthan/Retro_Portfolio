import React, { useEffect } from "react";
import { useSystemHUD } from "../context/SystemHUDContext";

export default function ContextMenu() {
  const { contextMenu, setContextMenu, setIsExplorerOpen, dispatchMessage, setIsAnalyticsOpen, setIsTerminalOpen } = useSystemHUD();

  useEffect(() => {
    const handleClick = () => {
      if (contextMenu.visible) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [contextMenu, setContextMenu]);

  if (!contextMenu.visible) return null;

  const handleAction = (action) => {
    setContextMenu({ ...contextMenu, visible: false });
    
    switch (action) {
      case 'skills':
        const skillsEl = document.querySelector('#skills');
        if (skillsEl) {
          dispatchMessage("> Accessing SKILLS module...");
          skillsEl.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'projects':
        const projectsEl = document.querySelector('#projects');
        if (projectsEl) {
          dispatchMessage("> Accessing PROJECTS module...");
          projectsEl.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'explorer':
        dispatchMessage("> Initializing SYSTEM_EXPLORER.EXE...");
        setIsExplorerOpen(true);
        break;
      case 'refresh':
        window.location.reload();
        break;
      case 'terminal':
        setIsTerminalOpen(true);
        break;
      case 'properties':
        setIsAnalyticsOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="fixed z-[10000] bg-[#c0c0c0] font-sans text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] w-48 text-sm"
      style={{ top: contextMenu.y, left: contextMenu.x }}
      onContextMenu={(e) => { e.preventDefault(); setContextMenu({ ...contextMenu, visible: false }); }}
    >
      <ul className="py-1">
        <li 
          className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          onClick={() => handleAction('skills')}
        >
          Open Skills.EXE
        </li>
        <li 
          className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          onClick={() => handleAction('projects')}
        >
          Open Projects.EXE
        </li>
        <li 
          className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          onClick={() => handleAction('explorer')}
        >
          System Explorer...
        </li>
        <li className="my-1 border-t border-gray-400 border-b border-white" />
        <li 
          className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          onClick={() => handleAction('refresh')}
        >
          Refresh
        </li>
        <li 
          className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          onClick={() => handleAction('terminal')}
        >
          System Terminal
        </li>
        <li className="my-1 border-t border-gray-400 border-b border-white" />
        <li 
          className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer italic"
          onClick={() => handleAction('properties')}
        >
          Properties
        </li>
      </ul>
    </div>
  );
}
