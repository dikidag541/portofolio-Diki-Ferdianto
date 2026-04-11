import { motion } from 'framer-motion';

const DEBRIS = [
  { x: "300vw", y: "500vh", label: "SYST_BOOT", delay: 0 },
  { x: "450vw", y: "550vh", label: "MAPPING_FRAG", delay: 1 },
  { x: "680vw", y: "250vh", label: "ELITE_SIGNAL", delay: 2 },
  { x: "250vw", y: "300vh", label: "NEURAL_CORE", delay: 0.5 },
  { x: "550vw", y: "700vh", label: "SPATIAL_SYNC", delay: 1.5 },
];

const SpaceDebris = () => {
  return (
    <>
      {DEBRIS.map((item, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -40, 0]
          }}
          transition={{ 
            duration: 10, 
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
          <div className="flex flex-col items-center gap-4">
             <div className="w-px h-8 bg-white/20"></div>
             <span className="text-[9px] uppercase tracking-[1em] font-mono font-bold whitespace-nowrap text-white/30 text-stroke-thin">
               {item.label}
             </span>
             <div className="flex gap-2 mt-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white/10"></div>
                ))}
             </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default SpaceDebris;
