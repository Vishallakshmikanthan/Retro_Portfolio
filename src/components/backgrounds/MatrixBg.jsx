import React, { useEffect, useRef } from 'react';

const MatrixBg = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let columns;
    let drops = [];

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const fontSize = 16;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    const animate = () => {
      if (document.visibilityState !== 'visible') {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00FF00';
      ctx.font = '16px monospace';

      drops.forEach((y, i) => {
        const text = String.fromCharCode(Math.floor(Math.random() * 128));
        const x = i * 16;
        ctx.fillText(text, x, y * 16);

        if (y * 16 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 250);
    };

    init();
    requestRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full bg-black opacity-30" />;
};

export default MatrixBg;
