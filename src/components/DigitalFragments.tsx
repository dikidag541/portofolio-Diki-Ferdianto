const FRAGMENTS = [
  { text: "0xA4F2_SYNTAX", x: "120vw", y: "80vh", rotate: -15, scale: 0.8 },
  { text: "NEURAL_ENGINE_ACTIVE", x: "180vw", y: "130vh", rotate: 5, scale: 0.6 },
  { text: "v0.33.0_RELEASE", x: "240vw", y: "210vh", rotate: -5, scale: 0.7 },
  { text: "EST. 2026 // BEYOND", x: "80vw", y: "250vh", rotate: 10, scale: 0.5 },
  { text: "INFORMATIKA.UNEJ", x: "320vw", y: "150vh", rotate: -20, scale: 0.9 },
  { text: "JSX_PRIMITIVE_RENDER", x: "280vw", y: "290vh", rotate: 0, scale: 0.6 },
  { text: "HIGH_FIDELITY_MOTION", x: "60vw", y: "180vh", rotate: 45, scale: 0.4 }
];

const DigitalFragments = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-[-1]">
      {FRAGMENTS.map((f, i) => (
        <div 
          key={i}
          className="absolute font-mono text-off-white/5 whitespace-nowrap"
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
      
      {/* Small Geometric Glyphs */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={`glyph-${i}`}
          className="absolute border border-off-white/5"
          style={{
            top: `${Math.random() * 400}vh`,
            left: `${Math.random() * 400}vw`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 2}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.1
          }}
        />
      ))}
    </div>
  );
};

export default DigitalFragments;
