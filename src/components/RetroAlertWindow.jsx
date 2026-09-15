import PropTypes from 'prop-types';
import { useState } from 'react';
import RetroDialog from './RetroDialog';

export default function RetroAlertWindow({
  title,
  image,
  description,
  tech = [],
  github,
  githubUrl,
  liveUrl,
  stars,
  forks,
  primaryLanguage,
  isArchived,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState('');

  const confirmNav = (url) => {
    if (!url) return;
    setPendingUrl(url);
    setDialogOpen(true);
  };

  const sourceUrl = githubUrl || github;
  const hasLiveUrl = typeof liveUrl === 'string' && liveUrl.trim().length > 0 && liveUrl.startsWith('http');

  return (
    <div className="group retro-window w-full bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-r-gray-dark border-b-gray-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col font-mono text-black transition-all duration-200">
      
      {/* Title Bar */}
      <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-sm tracking-wider">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Fake Icon */}
          <div className="w-4 h-4 bg-gradient-to-br from-red-600 to-red-900 border border-white flex-shrink-0"></div>
          <span className="truncate">{(title || 'PROJECT').toUpperCase().replace(/\s+/g, '_')}.EXE</span>
        </div>
        
        {/* Close Button */}
        <button className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center font-bold border-t border-l border-white border-b border-r border-black hover:bg-[#e0e0e0] leading-none select-none flex-shrink-0 ml-2">
          X
        </button>
      </div>

      {/* Window Body */}
      <div className="p-4 flex flex-col items-center bg-[#c0c0c0] flex-grow">
        
        {/* ASCII / Graphic Box (Inset) */}
        <div className="w-full h-48 bg-gray-600 border-t-2 border-l-2 border-gray-dark border-b-2 border-r-2 border-white mb-4 flex items-center justify-center p-2 relative overflow-hidden transition-colors duration-200 group-hover:bg-gray-800">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain filter grayscale contrast-150 transition-all duration-200 group-hover:brightness-[0.25] fade-in-image" 
            style={{ imageRendering: 'pixelated' }}
            onLoad={(e) => e.target.classList.remove('fade-in-image')}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]">
            <span className="font-bold text-lg border-b-2 border-white mb-2">
              STATUS: {isArchived ? "ARCHIVED" : "ACTIVE"}
            </span>
            <span className="text-xs px-4 text-center tracking-widest">
              {Array.isArray(tech) && tech.slice(0, 3).join(' / ')}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full text-left mb-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 uppercase break-words leading-tight">
            {title}
          </h3>
          <p className="text-sm mb-4 leading-snug">
            {description}
          </p>

          {/* GitHub Metadata Telemetry (stars, forks, language) */}
          {(primaryLanguage || typeof stars === 'number' || typeof forks === 'number') && (
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-gray-800 mb-3 border-t border-b border-gray-400 py-1">
              {primaryLanguage && <span>LANG: {primaryLanguage}</span>}
              {typeof stars === 'number' && <span>★ {stars}</span>}
              {typeof forks === 'number' && <span>⑂ {forks}</span>}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {tech && tech.map((t, idx) => (
              <span key={idx} className="bg-black text-white px-1 py-0.5 text-[10px] uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex justify-center w-full gap-4 mt-auto">
          {hasLiveUrl ? (
            <button 
              onClick={() => confirmNav(liveUrl)}
              className="retro-interactive px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold text-sm break-keep whitespace-nowrap group-hover:bg-[#000080] group-hover:text-white transition-colors duration-200"
            >
              Deploy!
            </button>
          ) : (
            <button 
              disabled
              aria-disabled="true"
              title="No live deployment available"
              className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold text-sm break-keep whitespace-nowrap opacity-40 cursor-not-allowed select-none text-gray-700"
            >
              Deploy!
            </button>
          )}

          <button 
            onClick={() => confirmNav(sourceUrl)}
            disabled={!sourceUrl}
            className={`retro-interactive px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold text-sm break-keep whitespace-nowrap group-hover:bg-[#000080] group-hover:text-white transition-colors duration-200 ${
              !sourceUrl ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            View Source
          </button>
        </div>

      </div>

      <RetroDialog
        isOpen={dialogOpen}
        title="EXTERNAL_LINK.EXE"
        message={`Warning: You are about to execute a jump to ${pendingUrl}. Proceed?`}
        type="yesno"
        onConfirm={() => {
          setDialogOpen(false);
          window.open(pendingUrl, '_blank', 'noopener,noreferrer');
        }}
        onCancel={() => setDialogOpen(false)}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}

RetroAlertWindow.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tech: PropTypes.arrayOf(PropTypes.string),
  github: PropTypes.string,
  githubUrl: PropTypes.string,
  liveUrl: PropTypes.string,
  stars: PropTypes.number,
  forks: PropTypes.number,
  watchers: PropTypes.number,
  openIssues: PropTypes.number,
  primaryLanguage: PropTypes.string,
  isArchived: PropTypes.bool,
  isFork: PropTypes.bool,
  isDisabled: PropTypes.bool,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  pushedAt: PropTypes.string,
  isFeatured: PropTypes.bool,
};
