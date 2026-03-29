import React, { useEffect, useState } from 'react';

const ScanOverlay = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      { threshold: 0.2 }
    );

    const ref = document.getElementById('scan-trigger');
    if (ref) observer.observe(ref);
    
    // We can alternatively just trigger on mount. Let's do that for simplicity
    setIsActive(true);

    return () => {
      setIsActive(false);
    };
  }, []);

  if (!isActive) return null;

  return <div className="scan-overlay-sweep"></div>;
};

export default ScanOverlay;
