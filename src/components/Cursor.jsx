import React, { useEffect, useRef } from 'react';

// Custom cursor + a spotlight that follows the pointer. Replaces static
// blurred gradient orbs with something that actually reacts to the visitor.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    let raf;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest('a, button, [data-cursor-hover]');
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? '52px' : '32px';
        ringRef.current.style.height = interactive ? '52px' : '32px';
        ringRef.current.style.opacity = interactive ? '0.6' : '0.35';
      }
    };

    const animate = () => {
      ring.current.x += (target.x - ring.current.x) * 0.18;
      ring.current.y += (target.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="spotlight" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
