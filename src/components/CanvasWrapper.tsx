import { motion, useMotionValue, useSpring, useVelocity, useTransform, useScroll } from 'framer-motion';
import { useRef, useLayoutEffect } from 'react';

interface CanvasWrapperProps {
  children: React.ReactNode;
}

const WAYPOINTS = [
  { x: 400, y: 400 }, // 0: Hero Center
  { x: 170, y: 650 }, // 1: About Center
  { x: 450, y: 750 }, // 2: Expertise Center (New)
  { x: 740, y: 410 }, // 3: Porto Center (Slightly adjusted)
  { x: 650, y: 150 }, // 4: Contact Center
];

const CanvasWrapper = ({ children }: CanvasWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Dwell mapping: [Start, Stay, Travel, Stay, Travel, Stay, Travel, Stay (PORTO), Travel, Stay]
  // Hero (0-0.08), About (0.18-0.26), Skill (0.36-0.44), Porto (0.50-0.85), Contact (0.93-1.0)
  const scrollRange = [0, 0.08, 0.18, 0.26, 0.36, 0.44, 0.50, 0.85, 0.93, 1.0];
  
  const xWaypoints = [];
  const yWaypoints = [];
  
  for (let i = 0; i < WAYPOINTS.length; i++) {
    const valX = -(WAYPOINTS[i].x * window.innerWidth / 100) + window.innerWidth / 2;
    const valY = -(WAYPOINTS[i].y * window.innerHeight / 100) + window.innerHeight / 2;
    xWaypoints.push(valX, valX);
    yWaypoints.push(valY, valY);
  }

  const pathX = useTransform(scrollYProgress, scrollRange, xWaypoints);
  const pathY = useTransform(scrollYProgress, scrollRange, yWaypoints);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  useLayoutEffect(() => {
    return scrollYProgress.on("change", () => {
       if (Math.abs(dragX.get()) > 0.1 || Math.abs(dragY.get()) > 0.1) {
          dragX.set(dragX.get() * 0.95);
          dragY.set(dragY.get() * 0.95);
       }
    });
  }, [scrollYProgress, dragX, dragY]);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const springPathX = useSpring(pathX, springConfig);
  const springPathY = useSpring(pathY, springConfig);
  const springDragX = useSpring(dragX, { damping: 30, stiffness: 150 });
  const springDragY = useSpring(dragY, { damping: 30, stiffness: 150 });

  const x = useTransform([springPathX, springDragX], ([px, dx]) => (px as number) + (dx as number));
  const y = useTransform([springPathY, springDragY], ([py, dy]) => (py as number) + (dy as number));

  const xVelocity = useVelocity(x);
  const skewX = useTransform(xVelocity, [-2000, 2000], [-5, 5]);
  const springSkewX = useSpring(skewX, { damping: 20, stiffness: 100 });

  return (
    <div className="fixed inset-0 bg-off-black overflow-hidden cursor-grab active:cursor-grabbing select-none z-0">
      <motion.div
         ref={containerRef}
         className="relative w-[800vw] h-[800vh]"
         drag
         dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
         style={{ 
           x, 
           y,
           skewX: springSkewX,
           pointerEvents: 'auto'
         }}
         onDrag={(_, info) => {
           dragX.set(dragX.get() + info.delta.x);
           dragY.set(dragY.get() + info.delta.y);
         }}
      >
        <div className="absolute inset-0 pointer-events-auto">
            {children}
        </div>
      </motion.div>
      
      <div className="fixed bottom-12 right-12 z-[100] text-[8px] uppercase tracking-[0.5em] font-bold opacity-30 mix-blend-difference pointer-events-none">
        SCROLL TO TRAVEL // DRAG TO PAN
      </div>
    </div>
  );
};

export default CanvasWrapper;
