import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
  {
    title: "UKM KETALASE",
    category: "Digital Ecosystem",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop",
    year: "2024"
  },
  {
    title: "MASTER CIGARS",
    category: "Luxury Retail",
    image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2070&auto=format&fit=crop",
    year: "2023"
  },
  {
    title: "SUGOI8 MGMT",
    category: "AI Management",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    year: "2024"
  },
  {
    title: "AF STUDIO",
    category: "Creative Agency",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    year: "2023"
  },
  {
    title: "NURUL AI",
    category: "Social Platform",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    year: "2024"
  }
];

const Projects = () => {
  const { scrollYProgress } = useScroll();
  
  // Mapping the 0.55 - 0.8 range from Galactic Railway to horizontal transform
  // We want the strip to move from 0 to -80% (approx 4 out of 5 projects)
  const x = useTransform(scrollYProgress, [0.55, 0.8], ["0%", "-80%"]);

  return (
    <section 
      id="work"
      className="relative w-screen min-h-screen bg-transparent overflow-visible pointer-events-auto flex flex-col justify-center"
    >
      {/* Header Overlay - Minimalist Static */}
      <div className="absolute top-12 left-[5vw] z-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
          SELECTED<br />PORTO.
        </h2>
        <span className="text-[10px] uppercase tracking-[0.8em] mt-2 block opacity-30">Vertical Scroll to Pan Horizontal</span>
      </div>

      {/* Horizontal Cinematic Rail */}
      <div className="relative w-full overflow-visible">
        <motion.div 
          style={{ x }}
          className="flex gap-4 px-[5vw]"
        >
          {PROJECTS.map((project, index) => (
            <div 
              key={index}
              className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] aspect-[21/9] md:aspect-[16/7] overflow-hidden cursor-pointer"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-smooth">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-off-black/80 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Minimalist Labels */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10 pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 italic">{project.year}</span>
                  <span className="text-[10px] font-mono tracking-widest text-white/40">FRAG_{index + 1}</span>
                </div>
                
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <h3 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter mb-1">{project.title}</h3>
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-[1px] bg-off-white/40"></div>
                     <span className="text-[10px] uppercase tracking-[0.6em] opacity-40">{project.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Narrative Legend */}
      <div className="absolute bottom-12 right-[5vw] text-right opacity-20 hidden md:block">
         <span className="text-[8px] uppercase tracking-[0.8em] font-bold">End of Horizontal Rail // System Nominal</span>
      </div>
    </section>
  );
};

export default Projects;
