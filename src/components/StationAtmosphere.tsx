import { motion, useTransform } from 'framer-motion';
import { useStation, STATIONS } from '../hooks/useStation';

const ASSETS = {
  hero: '/hero_bg_nebula_1776727891942.png',
  about: '/about_structural_network_1776727916699.png',
  expertise: '/expertise_constellation_1776727931810.png',
  projects: '/projects_digital_archive_1776727947022.png',
  contact: '/contact_neural_horizon_1776728026845.png',
};

const StationAtmosphere = () => {
  const { scrollYProgress } = useStation();

  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden bg-off-black">
      {STATIONS.map((station) => {
        const opacity = useTransform(
          scrollYProgress,
          [
            Math.max(0, station.range[0] - 0.1), 
            station.range[0], 
            station.range[1], 
            Math.min(1, station.range[1] + 0.1)
          ],
          [0, 1, 1, 0]
        );

        const y = useTransform(
          scrollYProgress,
          station.range,
          ['5%', '-5%']
        );

        return (
          <motion.div
            key={station.id}
            className="absolute inset-0 z-0"
            style={{ opacity }}
          >
            <motion.div 
               className="absolute inset-[-10%] z-0"
               style={{ y }}
            >
              <img
                src={ASSETS[station.id]}
                alt=""
                className="w-full h-full object-cover opacity-40 mix-blend-screen grayscale-[0.5] brightness-75 transition-all duration-1000"
              />
            </motion.div>
            
            {/* Thematic Glow */}
            <div 
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{ backgroundColor: station.color }}
            ></div>
          </motion.div>
        );
      })}

      {/* 3D Neural Grid - For spatial depth */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ perspective: '1000px' }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            rotateX: 60,
            y: useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
          }}
        />
      </div>

      {/* Flux Lines - Energy pulses following the railway */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(5)].map((_, i) => (
           <motion.path
             key={i}
             d={`M ${Math.random() * 100} 0 Q ${Math.random() * 100} 50 ${Math.random() * 100} 100`}
             stroke="white"
             strokeWidth="0.5"
             fill="transparent"
             initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
             animate={{ 
               pathLength: [0, 0.5, 1], 
               opacity: [0, 0.5, 0],
               pathOffset: [0, 0.5, 1]
             }}
             transition={{ 
               duration: 5 + Math.random() * 5, 
               repeat: Infinity, 
               delay: i * 2,
               ease: "linear",
               times: [0, 0.5, 1]
             }}
             style={{ 
               vectorEffect: 'non-scaling-stroke',
               x: `${i * 20}%`
             }}
           />
        ))}
      </svg>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[100]">
        {/* Global Scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-[0.03]"></div>
        
        {/* CRT Flicker */}
        <div className="absolute inset-0 bg-white/5 opacity-0 animate-flicker pointer-events-none"></div>
      </div>

      {/* Global Grain & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-off-black opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(8,8,8,0.4)_100%)]"></div>
    </div>
  );
};

export default StationAtmosphere;
