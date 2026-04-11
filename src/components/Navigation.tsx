import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Magnetic from './Magnetic';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out',
      delay: 1
    });
  }, []);

  const scrollToStation = (index: number) => {
    // Map 5 stations to their dwell center percentages
    const stops = [0.04, 0.23, 0.40, 0.66, 0.94];
    const targetScroll = stops[index] * (document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-[5vw] py-8 pointer-events-none"
    >
      <div className="pointer-events-auto cursor-pointer interactive" onClick={() => scrollToStation(0)}>
        <Magnetic>
          <div className="text-sm font-bold tracking-tighter">DIKI FERDIANTO ©</div>
        </Magnetic>
      </div>
      
      <div className="flex gap-4 md:gap-8 pointer-events-auto">
        {['About', 'Skill', 'Porto', 'Contact'].map((item, i) => (
          <Magnetic key={item}>
            <button 
              onClick={() => scrollToStation(i + 1)}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-medium hover:opacity-50 transition-smooth interactive px-3 md:px-4 py-2 bg-transparent border-none cursor-pointer"
            >
              {item}
            </button>
          </Magnetic>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
