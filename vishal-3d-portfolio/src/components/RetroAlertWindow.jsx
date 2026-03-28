import PropTypes from 'prop-types';

export default function RetroAlertWindow({ title, image, description, tech, github }) {
  return (
    <div className="retro-window w-full bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-r-gray-dark border-b-gray-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col font-mono text-black">
      
      {/* Title Bar */}
      <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-sm tracking-wider">
        <div className="flex items-center gap-2">
          {/* Fake Icon */}
          <div className="w-4 h-4 bg-gradient-to-br from-red-600 to-red-900 border border-white"></div>
          {title.toUpperCase().replace(/\s+/g, '_')}.EXE
        </div>
        
        {/* Close Button */}
        <button className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center font-bold border-t border-l border-white border-b border-r border-black hover:bg-[#e0e0e0] leading-none select-none">
          X
        </button>
      </div>

      {/* Window Body */}
      <div className="p-4 flex flex-col items-center bg-[#c0c0c0] flex-grow">
        
        {/* ASCII / Graphic Box (Inset) */}
        <div className="w-full h-48 bg-white border-t-2 border-l-2 border-gray-dark border-b-2 border-r-2 border-white mb-4 flex items-center justify-center p-2 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain filter grayscale contrast-150" 
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Content Area */}
        <div className="w-full text-left mb-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 uppercase break-words leading-tight">
            {title}
          </h3>
          <p className="text-sm mb-4 leading-snug">
            {description}
          </p>
          
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
          <button 
            onClick={() => window.open(github, '_blank')}
            className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold text-sm hover:scale-[0.98] active:border-t-black active:border-l-black active:border-b-white active:border-r-white break-keep whitespace-nowrap"
          >
            Deploy!
          </button>
          <button 
            onClick={() => window.open(github, '_blank')}
            className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold text-sm hover:scale-[0.98] active:border-t-black active:border-l-black active:border-b-white active:border-r-white break-keep whitespace-nowrap"
          >
            View Source
          </button>
        </div>

      </div>
    </div>
  );
}

RetroAlertWindow.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tech: PropTypes.arrayOf(PropTypes.string).isRequired,
  github: PropTypes.string.isRequired,
};
