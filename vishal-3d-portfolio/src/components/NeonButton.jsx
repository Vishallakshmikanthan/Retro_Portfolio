import React from 'react';

const NeonButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'cyan', // 'cyan' | 'purple'
  className = '',
  href,
  download
}) => {
  const isLink = !!href;
  const Component = isLink ? 'a' : 'button';
  
  const glowClass = variant === 'cyan' 
    ? 'border-neon-cyan/40 shadow-glow-cyan hover:border-neon-cyan' 
    : 'border-neon-purple/40 shadow-glow-purple hover:border-neon-purple';

  const baseStyles = `
    relative px-8 py-3.5 rounded-full font-semibold tracking-wide 
    transition-all duration-500 ease-premium border backdrop-blur-md
    flex items-center justify-center gap-2 overflow-hidden group
    bg-white/5 text-white/90 hover:text-white
    ${glowClass} ${className}
  `;

  const props = isLink ? { href, download, target: "_blank", rel: "noopener noreferrer" } : { onClick, type };

  return (
    <Component
      {...props}
      className={baseStyles}
    >
      {/* Inner Glow Pulse overlay */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
        ${variant === 'cyan' ? 'bg-neon-cyan' : 'bg-neon-purple'}
      `} />
      
      {/* Text/Content */}
      <span className="relative z-10 transition-transform duration-500 group-hover:scale-105 flex items-center gap-2">
        {children}
      </span>

      {/* Hover Light Streak */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </Component>
  );
};

export default NeonButton;

