import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlePart1Ref = useRef<HTMLHeadingElement>(null);
  const titlePart2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titlePart1Ref.current || !titlePart2Ref.current) return;

    const split1 = new SplitType(titlePart1Ref.current, { types: 'chars' });
    const split2 = new SplitType(titlePart2Ref.current, { types: 'chars' });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 2 } });

    tl.from('.hero-img-wrapper', {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
      scale: 1.2,
      duration: 2.5,
      ease: 'power4.out',
    })
    .from(split1.chars, {
      y: 150,
      opacity: 0,
      stagger: 0.02,
    }, '-=2.5')
    .from(split2.chars, {
      y: 150,
      opacity: 0,
      stagger: 0.02,
    }, '-=2.3')
    .from('.hero-sub', {
      y: 50,
      opacity: 0,
      duration: 1.5,
    }, '-=1.8')
    .from('.hero-line-long', {
      scaleX: 0,
      transformOrigin: 'right',
      duration: 2.5,
    }, '-=2.5');

    return () => {
      split1.revert();
      split2.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-screen h-screen flex flex-col justify-center px-[5vw] py-24 bg-transparent overflow-visible pointer-events-none"
    >
      {/* Background Large Staggered Name */}
      <div className="absolute top-[10%] left-[-5%] whitespace-nowrap pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[25vw] font-bold uppercase tracking-tighter leading-none text-stroke-thin">DIKI FERDIANTO</h2>
      </div>

      {/* Editorial Photo Integration - Root relative path */}
      <div className="absolute top-[10%] md:top-[15%] right-[5%] md:right-[10%] w-[45vw] md:w-[22vw] hero-img-wrapper z-0 grayscale hover:grayscale-0 transition-all duration-1000 group">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-off-white/10 shadow-2xl">
           <img 
             src="/input_file_0.png" 
             alt="Diki Ferdianto" 
             className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-off-black via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="absolute -bottom-6 -left-6 text-[8px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Encoded Identity // 001
        </div>
      </div>

      <div className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
           <div className="max-w-4xl">
              <h1 
                ref={titlePart1Ref}
                className="text-[clamp(3.5rem,10vw,10rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em] mb-4"
              >
                DIKI <span className="text-stroke">FERDIANTO</span>
              </h1>
              <h1 
                ref={titlePart2Ref}
                className="text-[clamp(1.8rem,5vw,5rem)] font-medium italic font-serif leading-[0.95] tracking-tighter mix-blend-exclusion"
              >
                Software Engineer & <br /> Founder SyntaxWeb.id
              </h1>
           </div>
           
           <div className="hero-sub mt-12 md:mt-0 md:max-w-xs text-right italic opacity-40">
              <div className="w-12 h-[1px] bg-off-white ml-auto mb-4 hero-line-long"></div>
              <p className="text-sm border-r border-off-white/20 pr-4">
                Redefining digital boundaries through high-fidelity engineering and neural aesthetics.
              </p>
           </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-[5vw] flex items-center gap-6">
         <div className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-off-white opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-off-white"></span>
         </div>
         <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Neural Engine Synced</span>
      </div>
    </section>
  );
};

export default Hero;
