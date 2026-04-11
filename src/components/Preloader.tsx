import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const MESSAGES = [
  "INITIALIZING NEURAL FABRIC...",
  "MAPPING GALACTIC RAILS...",
  "DECODING SPATIAL FRAGMENTS...",
  "ESTABLISHING LINK...",
  "SYSTEM NOMINAL."
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const msgInterval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[9999] bg-off-black flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-10"></div>
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="flex justify-between items-end mb-4">
           <motion.span 
             key={msgIndex}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/40"
           >
             {MESSAGES[msgIndex]}
           </motion.span>
           <span className="text-4xl md:text-6xl font-black font-mono tracking-tighter">
             {percent.toString().padStart(3, '0')}%
           </span>
        </div>
        
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white origin-left"
            style={{ width: `${percent}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          />
        </div>
        
        <div className="mt-8 flex justify-between text-[8px] uppercase tracking-[0.8em] font-bold opacity-20">
           <span>DIKI_FERDIANTO // SYSTEM_BOOT</span>
           <span>v4.0.2</span>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/20"></div>
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/20"></div>
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/20"></div>
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/20"></div>
    </motion.div>
  );
};

export default Preloader;
