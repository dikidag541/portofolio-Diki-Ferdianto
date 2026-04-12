import { motion, useScroll, useTransform } from 'framer-motion';

const NavigationalPaths = () => {
  const { scrollYProgress } = useScroll();

  const coords = {
    hero: { x: "50%", y: "50%" },
    about: { x: "21.25%", y: "81.25%" },
    expertise: { x: "56.25%", y: "93.75%" }, // 450/800, 750/800
    projects: { x: "92.5%", y: "51.25%" },  // 740/800, 410/800
    contact: { x: "81.25%", y: "18.75%" },
  };

  const lines = [
    { start: coords.hero, end: coords.about, range: [0.08, 0.18] },
    { start: coords.about, end: coords.expertise, range: [0.26, 0.36] },
    { start: coords.expertise, end: coords.projects, range: [0.44, 0.50] },
    { start: coords.projects, end: coords.contact, range: [0.85, 0.93] },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-[-1]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(250, 250, 250, 0.1)" />
          <stop offset="50%" stopColor="rgba(250, 250, 250, 0.3)" />
          <stop offset="100%" stopColor="rgba(250, 250, 250, 0.1)" />
        </linearGradient>
      </defs>

      {lines.map((line, idx) => (
        <g key={idx}>
          <motion.line
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="url(#lineGrad)"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <TrainPulse line={line} scrollYProgress={scrollYProgress} />
        </g>
      ))}

      {Object.entries(coords).map(([name, pos]) => (
        <g key={name}>
          <circle 
            cx={pos.x} 
            cy={pos.y} 
            r="60" 
            fill="rgba(250, 250, 250, 0.03)" 
            stroke="rgba(250, 250, 250, 0.15)"
            strokeDasharray="8 8"
          />
          <text 
            x={pos.x} cy={pos.y} dy="80"
            textAnchor="middle"
            fill="rgba(250, 250, 250, 0.2)"
            className="text-[10px] uppercase tracking-[0.8em] font-mono font-bold"
          >
            {name === 'contact' ? 'DEPLOYMENT' : name}_STATION
          </text>
        </g>
      ))}
    </svg>
  );
};

const TrainPulse = ({ line, scrollYProgress }: any) => {
  const x = useTransform(scrollYProgress, line.range, [line.start.x, line.end.x]);
  const y = useTransform(scrollYProgress, line.range, [line.start.y, line.end.y]);
  const opacity = useTransform(scrollYProgress, [line.range[0] - 0.05, line.range[0], line.range[1], line.range[1] + 0.05], [0, 1, 1, 0]);

  return (
    <motion.circle
      cx={x} cy={y} r="4"
      fill="#fafafa"
      style={{ opacity }}
      filter="url(#glow)"
    />
  );
};

export default NavigationalPaths;
