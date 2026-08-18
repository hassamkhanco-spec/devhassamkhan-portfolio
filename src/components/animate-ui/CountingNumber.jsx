import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

export function CountingNumber({
  value,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { damping: 30, stiffness: 100 });

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
  }, [rounded, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
