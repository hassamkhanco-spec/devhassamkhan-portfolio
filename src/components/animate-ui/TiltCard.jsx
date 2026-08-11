import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export function TiltCard({ children, maxTilt = 10, className = '' }) {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotX = ((y - height / 2) / (height / 2)) * -maxTilt;
    const rotY = ((x - width / 2) / (width / 2)) * maxTilt;

    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
