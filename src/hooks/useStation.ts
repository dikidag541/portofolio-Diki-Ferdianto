import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export type Station = 'hero' | 'about' | 'expertise' | 'projects' | 'contact';

export const STATIONS: { id: Station; range: [number, number]; color: string }[] = [
  { id: 'hero', range: [0, 0.15], color: '#00f2ff' },
  { id: 'about', range: [0.15, 0.40], color: '#fa00ff' },
  { id: 'expertise', range: [0.40, 0.60], color: '#ffb300' },
  { id: 'projects', range: [0.60, 0.85], color: '#00f2ff' },
  { id: 'contact', range: [0.85, 1.0], color: '#7000ff' },
];

export const useStation = () => {
  const { scrollYProgress } = useScroll();
  const [currentStation, setCurrentStation] = useState<Station>('hero');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const station = STATIONS.find(s => latest >= s.range[0] && latest <= s.range[1]);
    if (station && station.id !== currentStation) {
      setCurrentStation(station.id);
    }
  });

  return {
    scrollYProgress,
    currentStation,
    stations: STATIONS
  };
};
