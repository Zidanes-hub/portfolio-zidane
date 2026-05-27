import { useState } from 'react';
import { motion } from 'framer-motion';

export function PillNav({ items }) {
  const [active, setActive] = useState(items[0].id);

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '4px', 
      padding: '6px', 
      borderRadius: '50px', 
      background: 'var(--md-sys-color-surface-container)',
      border: '1px solid var(--md-sys-color-outline-variant)'
    }}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          onClick={() => setActive(item.id)}
          style={{
            position: 'relative',
            padding: '8px 20px',
            borderRadius: '50px',
            color: active === item.id ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            zIndex: 1,
            transition: 'color 0.2s ease',
            display: 'block'
          }}
        >
          {active === item.id && (
            <motion.div
              layoutId="pill-indicator"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'var(--md-sys-color-primary)',
                borderRadius: '50px',
                zIndex: -1
              }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          {item.label}
        </a>
      ))}
    </nav>
  );
}
