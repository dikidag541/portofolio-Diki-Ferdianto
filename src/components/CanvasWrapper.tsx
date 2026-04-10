import { motion, useMotionValue, useSpring, useVelocity, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

interface CanvasWrapperProps {
  children: React.ReactNode;
}

const WAYPOINTS = [
  { x: 350, y: 350 }, // Hero
  { x: 650, y: 340 }, // Projects
  { x: 100, y: 600 }, // About
  { x: 600, y: 100 }, // Contact
];

const CanvasWrapper = ({ children }: CanvasWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Dwell mapping: Start at station, stay for 10% of scroll, move to next
  // Range: [0, 0.1, 0.3, 0.4, 0.6, 0.7, 0.9, 1.0]
  // Stops: [H, H,   P,   P,   A,   A,   C,   C]
  const scrollRange = [0, 0.1, 0.3, 0.4, 0.6, 0.7, 0.9, 1.0];
  const xWaypoints = [
    -(WAYPOINTS[0].x * window.innerWidth / 100) + window.innerWidth / 2,
    -(WAYPOINTS[0].x * window.innerWidth / 100) + window.innerWidth / 2,
    -(WAYPOINTS[1].x * window.innerWidth / 100) + window.innerWidth / 2,
    -(WAYPOINTS[1].x * window.innerWidth / 100) + window.innerWidth / 2,
    -(WAYPOINTS[2].x * window.innerWidth / 100) + window.innerWidth / 2,
    -(WAYPOINTS[2].x * window.innerWidth / 100) + window.innerWidth / 2,
    -(WAYPOINTS[3].x * window.innerWidth / 100) + window.innerWidth / 2,
    -(WAYPOINTS[3].x * window.innerWidth / 100) + window.innerWidth / 2,
  ];
  const yWaypoints = [
    -(WAYPOINTS[0].y * window.innerHeight / 100) + window.innerHeight / 2,
    -(WAYPOINTS[0].y * window.innerHeight / 100) + window.innerHeight / 2,
    -(WAYPOINTS[1].y * window.innerHeight / 100) + window.innerHeight / 2,
    -(WAYPOINTS[1].y * window.innerHeight / 100) + window.innerHeight / 2,
    -(WAYPOINTS[2].y * window.innerHeight / 100) + window.innerHeight / 2,
    -(WAYPOINTS[2].y * window.innerHeight / 100) + window.innerHeight / 2,
    -(WAYPOINTS[3].y * window.innerHeight / 100) + window.innerHeight / 2,
    -(WAYPOINTS[3].y * window.innerHeight / 100) + window.innerHeight / 2,
  ];

  const pathX = useTransform(scrollYProgress, scrollRange, xWaypoints);
  const pathY = useTransform(scrollYProgress, scrollRange, yWaypoints);

  // Manual drag offsets
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Springs for buttery smooth interpolation of BOTH path and drag
  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const springPathX = useSpring(pathX, springConfig);
  const springPathY = useSpring(pathY, springConfig);
  const springDragX = useSpring(dragX, { damping: 30, stiffness: 150 });
  const springDragY = useSpring(dragY, { damping: 30, stiffness: 150 });

  // Final Combined Position
  const x = useTransform([springPathX, springDragX], ([px, dx]) => (px as number) + (dx as number));
  const y = useTransform([springPathY, springDragY], ([py, dy]) => (py as number) + (dy as number));

  // Velocity for cinematic skew
  const xVelocity = useVelocity(x);
  const yVelocity = useVelocity(y);
  const skewX = useTransform(xVelocity, [-2000, 2000], [-5, 5]);
  const skewY = useTransform(yVelocity, [-2000, 2000], [-5, 5]);
  const springSkewX = useSpring(skewX, { damping: 20, stiffness: 100 });
  const springSkewY = useSpring(skewY, { damping: 20, stiffness: 100 });

  return (
    <div className="fixed inset-0 bg-off-black overflow-hidden cursor-grab active:cursor-grabbing select-none z-0">
      <motion.div
         ref={containerRef}
         className="relative w-[800vw] h-[800vh]"
         drag
         dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }} // Limit local drag
         style={{ 
           x, 
           y,
           skewX: springSkewX,
           skewY: springSkewY,
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
