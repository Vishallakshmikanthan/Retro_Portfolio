import React from 'react';
import { getAvailableBgStyles, saveBgStyle, getInitialStyle } from '../data/bgConfig';
import RetroButton from './RetroButton';

const BackgroundSettings = () => {
  const styles = getAvailableBgStyles();
  const [current, setCurrent] = React.useState(getInitialStyle());

  const handleSelect = (id) => {
    saveBgStyle(id);
    setCurrent(id);
  };

  return (
    <div className="p-4 bg-[#c0c0c0] border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] shadow-[inset_1px_1px_#ffffff,2px_2px_#000000]">
      <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[#000080] flex items-center gap-2">
        <span className="w-4 h-4 bg-[#000080] block" />
        Background Settings
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {styles.map((style) => (
          <div 
            key={style.id}
            className={`p-2 border border-dotted cursor-pointer transition-colors ${
              current === style.id 
                ? 'bg-[#000080] text-white border-white' 
                : 'bg-white hover:bg-[#dfdfdf] border-transparent'
            }`}
            onClick={() => handleSelect(style.id)}
          >
            <div className="font-bold text-sm uppercase">{style.name}</div>
            <div className={`text-[10px] ${current === style.id ? 'text-[#dfdfdf]' : 'text-[#808080]'}`}>
              {style.description}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <RetroButton 
          variant="secondary" 
          onClick={() => handleSelect(styles[0].id)}
          className="text-[10px] px-2"
        >
          Reset to Default
        </RetroButton>
      </div>
    </div>
  );
};

export default BackgroundSettings;
