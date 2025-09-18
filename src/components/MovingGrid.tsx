import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MovingGridProps {
  color?: string;
  dotColor?: string;
  opacity?: number;
  size?: number;
  dotSize?: number;
  speed?: number;
}

const MovingGrid: React.FC<MovingGridProps> = ({
  color = 'rgba(59, 130, 246, 0.08)',
  dotColor = 'rgba(56, 189, 248, 0.2)',
  opacity = 0.45,
  size = 60,
  dotSize = 4,
  speed = 0.02
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const offsetY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const offsetX = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div 
      ref={gridRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${color} 1px, transparent 1px),
            linear-gradient(to bottom, ${color} 1px, transparent 1px),
            radial-gradient(circle, ${dotColor} ${dotSize/4}px, transparent ${dotSize/4}px)
          `,
          backgroundSize: `${size}px ${size}px, ${size}px ${size}px, ${size}px ${size}px`,
          backgroundPosition: `0px 0px, 0px 0px, ${size/2}px ${size/2}px`,
          y: offsetY,
          x: offsetX
        }}
        animate={{
          backgroundPosition: [
            `0px 0px, 0px 0px, ${size/2}px ${size/2}px`,
            `${size}px ${size}px, ${size}px ${size}px, ${size/2 + size}px ${size/2 + size}px`
          ]
        }}
        transition={{
          duration: 1 / speed * 4,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
    </div>
  );
};

export default MovingGrid; 
