import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    
    const moveCursor = (e: MouseEvent) => {
      const radius = isHovered ? 30 : 3;
      gsap.to(cursor, {
        x: e.clientX - radius,
        y: e.clientY - radius,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.classList.contains('interactive')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className={`custom-cursor ${isHovered ? 'hovered' : ''}`}></div>
  );
};

export default CustomCursor;
