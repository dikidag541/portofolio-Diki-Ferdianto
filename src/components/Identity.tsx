import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Identity = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.identity-reveal', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specs = [
    { label: 'System_Name', value: 'Diki Ferdianto' },
    { label: 'Class_Type', value: 'Fullstack Architect' },
    { label: 'Origin_Point', value: 'Jember, ID' },
    { label: 'Uptime', value: '4.2 Years' },
    { label: 'Core_Logic', value: 'TypeScript / React / Node' },
    { label: 'Current_Mission', value: 'Building Cinematic Web' },
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative w-[90vw] md:w-[60vw] h-auto p-12 md:p-20 bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-visible"
    >
      {/* Background Decorative Elements */}
      <div className="absolute -top-10 -left-10 w-20 h-20 border-t border-l border-neural-cyan/30 opacity-50"></div>
      <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b border-r border-neural-cyan/30 opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Section Header */}
          <div className="w-full md:w-1/3">
            <span className="identity-reveal text-[10px] uppercase tracking-[0.6em] text-neural-cyan/60 block mb-4">Identification // 01</span>
            <h2 className="identity-reveal text-7xl md:text-9xl font-display uppercase tracking-tighter leading-[0.8] mb-8 hover-glitch transition-all">
              CORE<br />DATA
            </h2>
            <div className="identity-reveal h-1 w-12 bg-neural-cyan/40"></div>
          </div>

          {/* Technical Specs Grid */}
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {specs.map((spec, index) => (
              <div key={index} className="identity-reveal group cursor-default">
                <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 block mb-3 group-hover:text-neural-cyan group-hover:opacity-100 transition-colors">
                  {spec.label}
                </span>
                <div className="text-xl md:text-2xl font-light tracking-tight border-b border-white/5 pb-2 group-hover:border-neural-cyan/20 transition-colors">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy / Bio Quote */}
        <div className="mt-24 pt-12 border-t border-white/5 identity-reveal">
          <p className="text-sm md:text-base font-serif italic text-off-white/60 leading-relaxed max-w-2xl">
            "I view digital architecture not just as code, but as a cinematic experience—an interplay of spatial movement, neural logic, and visual harmony."
          </p>
        </div>
      </div>

      {/* Decorative Serial Number */}
      <div className="absolute bottom-8 right-12 text-[10px] font-mono opacity-10 tracking-[1em] rotate-90 origin-right">
        SN-2026-DF-001
      </div>
    </div>
  );
};

export default Identity;
