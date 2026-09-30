import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// Wraps a button/link so it pulls slightly toward the cursor on hover.
export default function Magnetic({ children, className, as: Component = motion.div, strength = 0.35, ...props }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <Component
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: 'transform 200ms ease-out' }}
      {...props}
    >
      {children}
    </Component>
  );
}
