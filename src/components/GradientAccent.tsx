import React from 'react';
import { motion } from 'framer-motion';

interface GradientAccentProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color1?: string;
  color2?: string;
  size?: number;
  opacity?: number;
}

const GradientAccent: React.FC<GradientAccentProps> = ({
  position = 'top-right',
  color1 = 'rgba(59, 130, 246, 0.4)',
  color2 = 'rgba(59, 130, 246, 0.1)',
  size = 600,
  opacity = 0.4
}) => {
  // Set position based on prop
  const positionStyles = {
    'top-left': { top: '-15%', left: '-15%' },
    'top-right': { top: '-15%', right: '-15%' },
    'bottom-left': { bottom: '-15%', left: '-15%' },
    'bottom-right': { bottom: '-15%', right: '-15%' }
  };

  const animationVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.05, 1], 
      rotate: position.includes('left') ? [0, -5, 0] : [0, 5, 0]
    }
  };

  return (
    <motion.div
      className="fixed pointer-events-none blur-3xl rounded-full"
      style={{
        ...positionStyles[position],
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 70%, transparent 100%)`,
        opacity
      }}
      initial="initial"
      animate="animate"
      variants={animationVariants}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
};

export default GradientAccent; 