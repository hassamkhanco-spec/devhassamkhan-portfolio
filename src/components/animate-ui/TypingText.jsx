import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

export function TypingText({
  text,
  delay = 0,
  speed = 40,
  className = '',
  cursor = true,
  repeat = false,
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: !repeat });
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isInView) return;

    let timeoutId;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(startTyping, speed);
      }
    };

    const initialTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-0.5 w-[2px] h-[1em] bg-blue-400 align-middle"
        />
      )}
    </span>
  );
}
