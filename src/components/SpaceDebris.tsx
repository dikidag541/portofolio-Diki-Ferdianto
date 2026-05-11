import { motion } from 'framer-motion';
import { useMemo } from 'react';

const DEBRIS_LABELS = [
  "SYST_BOOT", "MAPPING_FRAG", "ELITE_SIGNAL", "NEURAL_CORE", "SPATIAL_SYNC",
  "ORBITAL_PATH", "DATA_STREAM", "CONNECTION_ESTABLISHED", "ANOMALY_DETECTED",
  "NODE_ACTIVE", "LINK_SECURE", "TELEMETRY_DATA", "SECTOR_SCAN"
];

const SpaceDebris = () => {
  const debrisList = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 800}vw`,
      y: `${Math.random() * 800}vh`,
      label: DEBRIS_LABELS[Math.floor(Math.random() * DEBRIS_LABELS.length)],
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 10
    }));
  }, []);

  return (
    <>
      {debrisList.map((item) => (
        <motion.div
          key={item.id}
          className="absolute pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.05, 0.25, 0.05],
            y: [0, -40, 0]
          }}
          transition={{ 
            duration: item.duration, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut"
          }}
          style={{ 
            left: item.x, 
            top: item.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex flex-col items-center gap-2">
             <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
             <span className="text-[8px] uppercase tracking-[0.8em] font-mono font-bold whitespace-nowrap text-white/40 text-stroke-thin">
               {item.label} :: {Math.floor(Math.random() * 99)}
             </span>
             <div className="flex gap-2 mt-1 opacity-50">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-neural-cyan shadow-[0_0_5px_rgba(0,242,255,0.8)]' : 'bg-white/20'}`}></div>
                ))}
             </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default SpaceDebris;
