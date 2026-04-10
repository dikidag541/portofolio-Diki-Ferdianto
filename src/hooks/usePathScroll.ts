import { useScroll, useTransform, useSpring } from 'framer-motion';

const WAYPOINTS = [
  { x: 350, y: 350 }, // Hero
  { x: 650, y: 340 }, // Projects
  { x: 100, y: 600 }, // About
  { x: 600, y: 100 }, // Contact
];

export function usePathScroll() {
  const { scrollYProgress } = useScroll();

  // Calculate X path
  const targetX = useTransform(
    scrollYProgress,
    WAYPOINTS.map((_, i) => i / (WAYPOINTS.length - 1)),
    WAYPOINTS.map(w => -(w.x * window.innerWidth / 100) + window.innerWidth / 2)
  );

  const targetY = useTransform(
    scrollYProgress,
    WAYPOINTS.map((_, i) => i / (WAYPOINTS.length - 1)),
    WAYPOINTS.map(w => -(w.y * window.innerHeight / 100) + window.innerHeight / 2)
  );

  const springConfig = { damping: 50, stiffness: 300, mass: 1 };
  const smoothX = useSpring(targetX, springConfig);
  const smoothY = useSpring(targetY, springConfig);

  return { smoothX, smoothY, scrollYProgress };
}
