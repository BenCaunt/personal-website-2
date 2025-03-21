import React from 'react';
import { motion } from 'framer-motion';

interface SectionTransitionProps {
  color?: string;
  position?: 'top' | 'bottom';
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ 
  color = 'from-yellow-50/50 to-yellow-100/30', 
  position = 'bottom' 
}) => {
  return (
    <div className={`absolute w-full left-0 pointer-events-none ${position === 'top' ? 'top-0' : 'bottom-0'} h-24 overflow-hidden`}>
      <motion.div 
        className={`w-full h-full bg-gradient-to-${position === 'top' ? 'b' : 't'} ${color}`}
        initial={{ y: position === 'top' ? -100 : 100 }}
        whileInView={{ y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 0.8
        }}
      />
    </div>
  );
};

export default SectionTransition; 