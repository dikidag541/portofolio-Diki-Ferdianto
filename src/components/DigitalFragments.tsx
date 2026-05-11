import { useMemo } from 'react';

const DIGITAL_WORDS = [
  "0xA4F2_SYNTAX", "NEURAL_ENGINE_ACTIVE", "v0.33.0_RELEASE", "EST. 2026", 
  "INFORMATIKA.UNEJ", "JSX_RENDER", "HIGH_FIDELITY", "NULL_PTR", 
  "MEM_LEAK_DETECTED", "SYS_OVERRIDE", "QUANTUM_STATE", "GALACTIC_RAILWAY",
  "AESTHETIC_PROTOCOL", "PORT:8080", "VITE_HMR_ACTIVE", "REACT_STRICT_MODE"
];

const DigitalFragments = () => {
  // Use useMemo to prevent re-generation on re-renders, simulating server/client consistency if needed
  const fragments = useMemo(() => {
    return Array.from({ length: 35 }).map(() => ({
      text: DIGITAL_WORDS[Math.floor(Math.random() * DIGITAL_WORDS.length)],
      x: `${Math.random() * 800}vw`,
      y: `${Math.random() * 800}vh`,
      rotate: (Math.random() - 0.5) * 90,
      scale: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  const glyphs = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      x: `${Math.random() * 800}vw`,
      y: `${Math.random() * 800}vh`,
      w: `${Math.random() * 80 + 20}px`,
      h: `${Math.random() * 2 + 1}px`,
      rotate: Math.random() * 360,
      opacity: 0.05 + Math.random() * 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-[-1]">
      {fragments.map((f, i) => (
        <div 
          key={`text-${i}`}
          className="absolute font-mono text-off-white/5 whitespace-nowrap mix-blend-overlay"
          style={{ 
            top: f.y, 
            left: f.x, 
            transform: `rotate(${f.rotate}deg) scale(${f.scale})`,
            fontSize: "clamp(1rem, 5vw, 6rem)",
            fontWeight: "bold",
            letterSpacing: "0.2em",
            textShadow: "0 0 20px rgba(250,250,250,0.05)"
          }}
        >
          {f.text}
        </div>
      ))}
      
      {/* Small Geometric Glyphs / Tech Lines */}
      {glyphs.map((g, i) => (
        <div 
          key={`glyph-${i}`}
          className="absolute border border-neural-cyan/10"
          style={{
            top: g.y,
            left: g.x,
            width: g.w,
            height: g.h,
            transform: `rotate(${g.rotate}deg)`,
            opacity: g.opacity
          }}
        />
      ))}
    </div>
  );
};

export default DigitalFragments;
