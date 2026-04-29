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
      {/* Layer 1: Background Big Text (Deep Parallax) - Much more subtle */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
      >
        <h2 className="text-[45vw] font-bold uppercase tracking-[0.1em] leading-none">DIKI</h2>
      </div>

      {/* Layer 2: Main Image (Middle Parallax) */}
      <div
        className="hero-img-container relative z-10 w-[70vw] md:w-[40vw] aspect-[3/4.5] group pointer-events-auto"
        style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
      >
        <div className="absolute inset-x-0 -bottom-20 h-1/2 bg-gradient-to-t from-off-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-neural-cyan/5 blur-[150px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div
          className="relative w-full h-full overflow-hidden transition-all duration-1000 border border-white/5 shadow-2xl"
          style={{
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/input_file_0.png"
            alt="Diki Ferdianto"
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-2000 brightness-110 contrast-[1.1] grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-off-black/40 via-transparent to-transparent"></div>

          {/* Scanning Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-neural-cyan/20 shadow-[0_0_15px_rgba(0,242,255,0.3)] animate-scan"></div>
        </div>

        {/* Floating Metadata around Image */}
        <div className="absolute -top-8 left-0 hero-fragment px-4 border-l border-white/10">
          <span className="text-[9px] font-mono tracking-[0.2em] opacity-40 block uppercase">Bio_Stream_Active</span>
          <span className="text-[10px] font-mono tracking-widest opacity-20">[ 8.16°S 113.7°E ]</span>
        </div>
        <div className="absolute -bottom-4 right-0 hero-fragment px-4 border-r border-white/10 text-right">
          <span className="text-[9px] font-mono tracking-[0.2em] opacity-40 block uppercase">Neural_Link</span>
          <span className="text-[10px] font-mono tracking-widest opacity-20 font-bold italic">04.12.26</span>
        </div>
      </div>

      {/* Layer 3: Main Title Typography (Front Overlap) - The "Blending Magic" */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-difference"
        style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
      >
        <div className="text-center w-full px-4">
          <h1
            ref={titleRef}
            className="text-[clamp(4rem,18vw,20rem)] font-bold uppercase leading-[0.85] tracking-[-0.07em] overflow-visible drop-shadow-[0_0_20px_rgba(0,242,255,0.15)] whitespace-nowrap text-white"
          >
            DIKI<br />
            <span className="font-serif italic lowercase tracking-tight -mt-4 block pl-[5vw] text-off-white/90">ferdianto</span>
          </h1>

          <div className="hero-fragment mt-16 flex items-center justify-center gap-12 opacity-40">
            <div className="h-px w-16 bg-white/30"></div>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.8em] font-light max-w-[280px] leading-relaxed">
              Software Engineer crafting <span className="font-serif italic lowercase tracking-normal">cinematic</span> digital architectures.
            </p>
            <div className="h-px w-16 bg-white/30"></div>
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
