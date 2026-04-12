import { useEffect, useRef } from 'react';

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let blobs: GlowBlob[] = [];
    const particleCount = 60;
    const blobCount = 3;

    class GlowBlob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(color: string) {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 400 + 400; // Large blobs
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.radius || this.x > canvas!.width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > canvas!.height + this.radius) this.vy *= -1;
      }

      draw() {
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 255, 0.2)' : 'rgba(250, 250, 250, 0.15)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      blobs = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      
      const blobColors = [
        'rgba(0, 242, 255, 0.05)', // Cyan
        'rgba(112, 0, 255, 0.04)',  // Purple
        'rgba(0, 150, 255, 0.03)'   // Blue
      ];
      for (let i = 0; i < blobCount; i++) {
        blobs.push(new GlowBlob(blobColors[i % blobColors.length]));
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            const opacity = 0.08 * (1 - distance / 150);
            const isColored = particles[i].color.includes('242');
            ctx.strokeStyle = isColored ? `rgba(0, 242, 255, ${opacity})` : `rgba(250, 250, 250, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blobs.forEach(b => {
        b.update();
        b.draw();
      });

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
};

export default NeuralBackground;
