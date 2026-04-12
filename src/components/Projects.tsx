import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const PROJECTS = [
  {
    title: "UKM KETALASE",
    category: "Arts & Creativity",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    year: "2024",
    url: "https://ukmketalase.com/",
    description: "Sovereign Maximalism in Art. A vehicle for transforming traditional arts through futuristic ambition and maximalist aesthetics."
  },
  {
    title: "AF STUDIO",
    category: "Photography Studio",
    image: "https://images.unsplash.com/photo-1542038783-0addec3cffdd?q=80&w=2070&auto=format&fit=crop",
    year: "2023",
    url: "https://afstudio.my.id/",
    description: "Professional photography archive specializing in wedding, pre-wedding, and lifestyle storytelling in Jember."
  },
  {
    title: "MASTER CIGARS",
    category: "Luxury Heritage",
    image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2070&auto=format&fit=crop",
    year: "2023",
    url: "https://www.mastercigarsandcoffee.com/",
    description: "The definitive sanctuary for hand-rolled cigars and artisan coffee. Premium heritage meets modern ritual."
  },
  {
    title: "SUGOI8 MGMT",
    category: "Event Production",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    year: "2024",
    url: "https://sugoi8management.com/",
    description: "Show management and event production experts. Designing dreams and crafting professional experiences at scale."
  },
  {
    title: "NURUL AI",
    category: "Islamic Education",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    year: "2024",
    url: "https://nurulalijember.id/",
    description: "Digital portal for Pondok Pesantren Nurul Ali. Cultivating religious education and community values with clarity."
  }
];

const Projects = () => {
  const { scrollYProgress } = useScroll();
  
  // Mapping the 0.50 - 0.85 range (PORTO DWELL) to horizontal pan
  // We move further (-320vw) to ensure the last project is fully centered at the end
  const x = useTransform(scrollYProgress, [0.50, 0.85], ["0vw", "-260vw"]);
  
  // Indicator for "Current Project" based on scroll
  const projectIndex = useTransform(scrollYProgress, [0.50, 0.85], [1, 5]);
  const [displayIndex, setDisplayIndex] = useState(1);
  
  useMotionValueEvent(projectIndex, "change", (latest) => {
    setDisplayIndex(Math.round(latest));
  });

  return (
    <>
      <section 
        id="work"
        className="relative w-screen min-h-screen bg-transparent overflow-visible pointer-events-auto flex flex-col justify-center"
      >
        {/* Header Overlay */}
        <div className="absolute top-12 left-[5vw] z-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            SELECTED<br />PORTO.
          </h2>
          <motion.div className="flex items-center gap-4 mt-4">
             <span className="text-[10px] uppercase tracking-[0.8em] opacity-30">Archive Transmission</span>
             <div className="h-[1px] w-12 bg-white/20"></div>
             <span className="text-[10px] font-mono font-bold">
               PROJECT {displayIndex}/5
             </span>
          </motion.div>
        </div>

        {/* Horizontal Cinematic Rail */}
        <div className="relative w-full overflow-visible">
          <motion.div style={{ x }} className="flex gap-12 px-[10vw]">
            {PROJECTS.map((project, index) => (
              <div 
                key={index}
                onClick={() => window.open(project.url, '_blank')}
                className="group relative flex-shrink-0 w-[85vw] md:w-[65vw] aspect-[21/9] md:aspect-[16/7] overflow-hidden cursor-pointer"
              >
                {/* Image Layer - Lighter and clearer */}
                <div className="absolute inset-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-smooth">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-off-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Metadata */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-white/50 italic">{project.year}</span>
                    <span className="text-[10px] font-mono tracking-widest text-white/50">FRAG_{index + 1}</span>
                  </div>
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <h3 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter mb-1">{project.title}</h3>
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-[1px] bg-off-white/40"></div>
                       <span className="text-[10px] uppercase tracking-[0.6em] opacity-50">{project.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Instruction */}
        <div className="absolute bottom-12 right-[5vw] opacity-20 hidden md:flex items-center gap-4">
           <span className="text-[8px] uppercase tracking-[0.8em]">Scroll to Navigate Archive</span>
           <div className="w-12 h-px bg-white"></div>
        </div>
      </section>
    </>
  );
};

export default Projects;
