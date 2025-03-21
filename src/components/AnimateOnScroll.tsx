import React, { useEffect } from 'react';
import { motion, useAnimation, Variants, HTMLMotionProps } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimateOnScrollProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideLeft: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideRight: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  rotate: {
    hidden: { rotate: -5, opacity: 0 },
    visible: { rotate: 0, opacity: 1 }
  }
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = 'fadeIn',
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  once = true,
  className = '',
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: once });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll; 