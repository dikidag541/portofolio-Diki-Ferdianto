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

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-100 flex justify-between items-center px-[5vw] py-8 pointer-events-none"
    >
      <div className="pointer-events-auto cursor-pointer interactive">
        <Magnetic>
          <div className="text-sm font-bold tracking-tighter">DIKI FERDIANTO ©</div>
        </Magnetic>
      </div>
      
      <div className="flex gap-8 pointer-events-auto">
        {['Work', 'About', 'Contact'].map((item) => (
          <Magnetic key={item}>
            <a 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.3em] font-medium hover:opacity-50 transition-smooth interactive px-4 py-2"
            >
              {item}
            </a>
          </Magnetic>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
