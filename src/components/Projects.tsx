import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project images are currently remote URLs, which is fine. 
// If he provides local images, he should put them in /public/ and use paths like "/project1.jpg"
const PROJECTS = [
  {
    title: "UKM KETALASE",
    category: "E-Commerce / Community Hub",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop"
  },
  {
    title: "MASTER CIGARS",
    category: "Luxury Lifestyle / Retail",
    image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "SUGOI8 MGMT",
    category: "Professional Services / AI",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    title: "AF STUDIO",
    category: "Creative Agency / Branding",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "NURUL AI",
    category: "Islamic Social / AI Engine",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const revealImgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (revealImgRef.current) {
        // Smooth follow with parallax feel
        gsap.to(revealImgRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.2,
          ease: 'power3.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Scroll reveal for the whole section
    gsap.from('.project-item', {
      scrollTrigger: {
        trigger: '#work',
        start: 'top 60%',
      },
      y: 150,
      opacity: 0,
      stagger: 0.15,
      duration: 2,
      ease: 'expo.out'
    });
  }, []);

  return (
    <section 
      id="work"
      ref={sectionRef}
      className="relative px-[5vw] py-32 bg-transparent overflow-visible pointer-events-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-48">
        <div>
           <div className="flex items-center gap-4 mb-8 opacity-20">
              <div className="w-12 h-[1px] bg-off-white"></div>
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold">Selected Fragments</span>
           </div>
           <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em]">
             ELITE <br /> <span className="text-stroke">DEPLOYMENTS.</span>
           </h2>
        </div>
        <div className="mt-12 md:mt-24 text-right max-w-xs">
           <p className="text-sm font-light opacity-40 italic leading-relaxed">
             A curation of digital nodes bridging high-end aesthetics and complex neural architectures.
           </p>
        </div>
      </div>

      <div className="relative z-10">
        {PROJECTS.map((project, index) => (
          <div 
            key={index}
            className="project-item group border-b border-off-white/5 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between cursor-pointer interactive"
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="flex items-center gap-12">
              <span className="text-xs font-mono opacity-15 group-hover:opacity-100 group-hover:text-stroke transition-all duration-500">
                L_0{index + 1}
              </span>
              <h3 className="text-5xl md:text-9xl font-bold uppercase tracking-[-0.05em] group-hover:translate-x-6 transition-all duration-700 ease-expo">
                {project.title}
              </h3>
            </div>
            
            <div className="mt-8 md:mt-0 flex flex-col items-end opacity-20 group-hover:opacity-100 transition-all duration-700">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2">{project.category}</span>
              <div className="w-8 h-[1px] bg-off-white opacity-40 group-hover:w-full transition-all duration-700"></div>
            </div>
          </div>
        ))}
      </div>

      {/* High-End Floating Reveal with Parallax Correction */}
      <div 
        ref={revealImgRef}
        className="fixed top-0 left-0 w-[40vmax] aspect-[3/4] pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 opacity-0 flex items-center justify-center transition-opacity duration-700"
        style={{ 
          opacity: activeProject !== null ? 1 : 0,
        }}
      >
        <div className={`w-full h-full overflow-hidden transition-all duration-1000 ease-expo ${activeProject !== null ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`}>
           <div className="w-full h-full relative">
              {PROJECTS.map((project, index) => (
                <img 
                  key={index}
                  src={project.image}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeProject === index ? 'opacity-100 scale-110' : 'opacity-0 scale-125'}`}
                  style={{ 
                    transition: 'opacity 1s, transform 3s cubic-bezier(0.19, 1, 0.22, 1)'
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-off-black/60 to-transparent"></div>
           </div>
        </div>
        
        {/* Decorative elements over the reveal image */}
        <div className="absolute inset-[-20px] border border-off-white/10 pointer-events-none"></div>
        <div className="absolute top-8 left-8 text-[8px] uppercase tracking-[0.4em] font-bold opacity-40 mix-blend-difference">
          Fragment // {activeProject !== null ? `00${activeProject + 1}` : 'INV'}
        </div>
      </div>

      <div className="mt-64 flex justify-between items-center border-t border-off-white/10 pt-12 opacity-30">
         <span className="text-[10px] font-mono tracking-widest">ARCHITECTURE_END</span>
         <button className="text-xs uppercase tracking-[0.6em] font-bold hover:opacity-100 interactive transition-smooth">
           Decode All Projects
         </button>
      </div>
    </section>
  );
};

export default Projects;
