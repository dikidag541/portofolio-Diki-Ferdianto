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
    // Map station index to scroll progress percentages
    // Hero: 0.05, Projects: 0.35, About: 0.65, Contact: 0.95
    const stops = [0.05, 0.35, 0.65, 0.95];
    const targetScroll = stops[index] * (document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-100 flex justify-between items-center px-[5vw] py-8 pointer-events-none"
    >
      <div className="pointer-events-auto cursor-pointer interactive" onClick={() => scrollToStation(0)}>
        <Magnetic>
          <div className="text-sm font-bold tracking-tighter">DIKI FERDIANTO ©</div>
        </Magnetic>
      </div>
      
      <div className="flex gap-8 pointer-events-auto">
        {['About', 'Porto', 'Contact'].map((item, i) => (
          <Magnetic key={item}>
            <button 
              onClick={() => scrollToStation(i + 1)}
              className="text-[10px] uppercase tracking-[0.3em] font-medium hover:opacity-50 transition-smooth interactive px-4 py-2 bg-transparent border-none cursor-pointer"
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
