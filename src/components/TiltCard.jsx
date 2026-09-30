import React, { useRef } from 'react';

// Subtle 3D tilt that follows the cursor position within the card.
export default function TiltCard({ children, className, ...props }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateZ(0)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: 'transform 300ms ease-out' }}
      {...props}
    >
      {children}
    </div>
  );
}
