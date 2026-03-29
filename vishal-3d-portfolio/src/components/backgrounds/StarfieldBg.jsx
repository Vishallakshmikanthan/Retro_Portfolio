import React, { useEffect, useRef } from 'react';

const StarfieldBg = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      stars = Array.from({ length: 400 }, () => ({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        o: 0.5 + Math.random() * 0.5
      }));
    };

    const animate = () => {
      if (document.visibilityState !== 'visible') {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.z -= 2;
        if (star.z <= 0) star.z = width;

        const x = (star.x / star.z) * (width / 2) + width / 2;
        const y = (star.y / star.z) * (height / 2) + height / 2;
        const s = (1 - star.z / width) * 2;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full bg-black" />;
};

export default StarfieldBg;
