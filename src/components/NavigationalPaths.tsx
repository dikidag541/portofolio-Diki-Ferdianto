import { motion } from 'framer-motion';

const NavigationalPaths = () => {
  // Coordinates as percentages of the 800vw x 800vh canvas
  // Hero: 350 / 800 = 43.75%
  // Projects: 650 / 800 = 81.25% (Y: 340/800 = 42.5%)
  // About: 100 / 800 = 12.5% (Y: 600/800 = 75%)
  // Contact: 600 / 800 = 75% (Y: 100/800 = 12.5%)
  const coords = {
    hero: { x: "43.75%", y: "43.75%" },
    projects: { x: "81.25%", y: "42.5%" },
    about: { x: "12.5%", y: "75%" },
    contact: { x: "75%", y: "12.5%" },
  };

  const lines = [
    { start: coords.hero, end: coords.projects },
    { start: coords.hero, end: coords.about },
    { start: coords.about, end: coords.contact },
    { start: coords.projects, end: coords.contact },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-[-1]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(250, 250, 250, 0.05)" />
          <stop offset="50%" stopColor="rgba(250, 250, 250, 0.2)" />
          <stop offset="100%" stopColor="rgba(250, 250, 250, 0.05)" />
        </linearGradient>
      </defs>

      {lines.map((line, idx) => (
        <g key={idx}>
          {/* Base Connection Line */}
          <motion.line
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: idx * 0.5 + 1.5, ease: "easeInOut" }}
          />
        </g>
      ))}

      {/* Decorative Constellation Points */}
      {Object.values(coords).map((pos, i) => (
        <circle 
          key={i} 
          cx={pos.x} 
          cy={pos.y} 
          r="40" 
          fill="rgba(250, 250, 250, 0.02)" 
          stroke="rgba(250, 250, 250, 0.1)"
          strokeDasharray="4 4"
        />
      ))}
    </svg>
  );
};

export default NavigationalPaths;
