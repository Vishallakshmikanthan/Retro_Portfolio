export const BG_STYLES = {
  STARFIELD: {
    id: 'starfield',
    name: 'Deep Space',
    description: 'Classic 3D starfield simulation.'
  },
  MATRIX: {
    id: 'matrix',
    name: 'The Matrix',
    description: 'Falling green code streams.'
  },
  GRID: {
    id: 'grid',
    name: 'Neon Grid',
    description: 'Retro-futuristic structural lines.'
  },
  SOLID: {
    id: 'solid',
    name: 'System Default',
    description: 'Classic Windows 98 desktop color.'
  }
};

const STORAGE_KEY = 'retro_bg_style';

export const getAvailableBgStyles = () => Object.values(BG_STYLES);

export const saveBgStyle = (id) => {
  localStorage.setItem(STORAGE_KEY, id);
  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new CustomEvent('bgStyleChange', { detail: id }));
};

export const getInitialStyle = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;
  return BG_STYLES.SOLID.id;
};

export const getStyleKeyFromId = (id) => {
  return Object.keys(BG_STYLES).find(key => BG_STYLES[key].id === id) || 'SOLID';
};
