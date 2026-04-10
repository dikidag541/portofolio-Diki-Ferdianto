import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface CanvasWrapperProps {
  children: ReactNode;
}

const CanvasWrapper = ({ children }: CanvasWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Perfect centering for the Hero island (located at 350vh, 350vw on a 800x800 canvas)
  const x = useMotionValue(-window.innerWidth * 3.5);
  const y = useMotionValue(-window.innerHeight * 3.5);

  // Velocity tracking for cinematic skew
  const xVelocity = useVelocity(x);
  const yVelocity = useVelocity(y);

  // Map velocity to skew (clamped for subtlety)
  const skewX = useTransform(xVelocity, [-2000, 2000], [-5, 5]);
  const skewY = useTransform(yVelocity, [-2000, 2000], [-5, 5]);

  // Springs for smooth inertia
  const springConfig = { damping: 50, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springSkewX = useSpring(skewX, { damping: 20, stiffness: 100 });
  const springSkewY = useSpring(skewY, { damping: 20, stiffness: 100 });

  return (
    <div className="fixed inset-0 bg-off-black overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <motion.div
        ref={containerRef}
        className="relative w-[800vw] h-[800vh] pointer-events-none"
        drag
        dragConstraints={{
          left: -window.innerWidth * 7.5,
          right: window.innerWidth * 0.5,
          top: -window.innerHeight * 7.5,
          bottom: window.innerHeight * 0.5,
        }}
        dragElastic={0.05}
        dragTransition={{ bounceStiffness: 60, bounceDamping: 15 }}
        style={{ 
          x: springX, 
          y: springY,
          skewX: springSkewX,
          skewY: springSkewY
        }}
      >
        <div className="absolute inset-0 pointer-events-auto">
          {children}
        </div>
      </motion.div>
      
      {/* Visual Indicator of Space / Depth */}
      <div className="fixed bottom-12 right-12 z-[100] text-[8px] uppercase tracking-[0.5em] font-bold opacity-30 mix-blend-difference pointer-events-none">
        SPACE COORDS // DRAG TO NAVIGATE
      </div>
    </div>
  );
};

export default CanvasWrapper;
