import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Content */}
      <motion.div 
        className="relative z-10 min-h-screen w-full"
        style={{ opacity, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxBackground; 