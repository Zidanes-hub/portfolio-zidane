import { motion } from 'framer-motion';
import React from 'react';

export const SplitText = ({ children, delay = 0, stagger = 0.05, className = '' }) => {
  if (typeof children !== 'string') return <span className={className}>{children}</span>;

  const characters = children.split('');

  return (
    <motion.span 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        hidden: {}
      }}
      style={{ display: 'inline-block' }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: { y: '100%', opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
