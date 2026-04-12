import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!titleRef.current) return;

    const split = new SplitType(titleRef.current, { types: 'chars,words' });
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 2 } });

    tl.from('.hero-img-container', {
      scale: 1.1,
      opacity: 0,
      duration: 2.5,
      ease: 'power3.out',
    })
    .from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.015,
    }, '-=2.2')
    .from('.hero-fragment', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
    }, '-=1.5');

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      split.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-screen h-screen flex items-center justify-center bg-transparent overflow-visible"
    >
      {/* Layer 1: Background Big Text (Deep Parallax) */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` }}
      >
        <h2 className="text-[35vw] font-bold uppercase tracking-tighter leading-none text-stroke">DIKI</h2>
      </div>

      {/* Layer 2: Main Image (Middle Parallax) */}
      <div 
        className="hero-img-container relative z-10 w-[60vw] md:w-[35vw] aspect-[3/4] group pointer-events-auto"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
      >
        <div className="absolute inset-0 bg-neural-cyan/10 blur-[120px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div 
          className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5"
          style={{ 
            maskImage: 'radial-gradient(ellipse at 50% 40%, black 40%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 40%, transparent 90%)'
          }}
        >
          <img 
            src="/input_file_0.png" 
            alt="Diki Ferdianto" 
            className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-off-black via-transparent to-transparent opacity-40"></div>
          
          {/* Scanning Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-neural-cyan/30 shadow-[0_0_10px_rgba(0,242,255,0.5)] animate-scan"></div>
        </div>

        {/* Floating Metadata around Image */}
        <div className="absolute -top-12 -left-12 hero-fragment">
           <span className="text-[10px] font-mono tracking-widest opacity-20">[ COORDS: 8.16°S 113.7°E ]</span>
        </div>
        <div className="absolute -bottom-8 -right-8 hero-fragment">
           <span className="text-[10px] font-mono tracking-widest opacity-20 font-bold">LATEST_SYNC // 04.12.26</span>
        </div>
      </div>

      {/* Layer 3: Main Title Typography (Front Overlap) */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-difference"
        style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)` }}
      >
        <div className="text-center">
          <h1 
            ref={titleRef}
            className="text-[clamp(4rem,18vw,16rem)] font-bold uppercase leading-[0.75] tracking-[-0.08em] overflow-visible drop-shadow-[0_0_15px_rgba(0,242,255,0.1)]"
          >
            DIKI<br />
            <span className="text-stroke-cyan tracking-[0.05em]">FERDIANTO</span>
          </h1>
          
          <div className="hero-fragment mt-12 flex items-center justify-center gap-8 opacity-40">
             <div className="h-[1px] w-24 bg-white/20"></div>
             <p className="text-[10px] uppercase tracking-[0.6em] font-medium max-w-[200px]">
               Software Engineer & Digital Architect establishing neural visual systems.
             </p>
             <div className="h-[1px] w-24 bg-white/20"></div>
          </div>
        </div>
      </div>

      {/* Layer 4: Floating UI Status (Fixed Relative to Section) */}
      <div className="absolute bottom-12 left-[5vw] hero-fragment pointer-events-none">
         <div className="flex items-center gap-4">
            <div className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neural-cyan opacity-40"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-neural-cyan shadow-[0_0_10px_rgba(0,242,255,0.8)]"></span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 text-neural-cyan">Neural Feed Active // Uptime 99.9%</span>
         </div>
      </div>
    </section>
  );
};

export default Hero;
