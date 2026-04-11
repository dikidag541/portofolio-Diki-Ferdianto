import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  category: string;
  image: string;
  url: string;
  description?: string;
  tags?: string[];
}

const ProjectModal = ({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-off-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div 
            className="relative w-full max-w-7xl h-full md:h-auto max-h-[90vh] bg-off-black border border-white/10 overflow-hidden flex flex-col md:flex-row"
            initial={{ y: 100, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 100, scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-4 text-white/50 hover:text-white transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[1em] font-bold">Close // &times;</span>
            </button>

            {/* Left Image Side */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
               <img 
                 src={project.image} 
                 alt={project.title}
                 className="w-full h-full object-cover grayscale opacity-50 contrast-125"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-off-black via-transparent to-transparent opacity-60"></div>
               <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Right Content Side */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-between overflow-y-auto">
              <div>
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.4, x: 0 }}
                  className="text-[10px] uppercase tracking-[1em] block mb-6"
                >
                  Case Study // Archive
                </motion.span>
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-tight mb-8">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl font-light italic opacity-60 leading-relaxed mb-12">
                   Building the definitive digital footprint for {project.title}. A fusion of clean editorial design and robust technical architecture.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-16">
                   {['React', 'GSAP', 'Next.js', 'Tailwind'].map(tag => (
                     <span key={tag} className="text-[10px] font-mono border border-white/10 px-4 py-2 opacity-40 uppercase tracking-widest">{tag}</span>
                   ))}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                 <a 
                   href={project.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="group relative w-full border border-white p-8 text-center uppercase tracking-[1em] font-bold hover:bg-white hover:text-off-black transition-all duration-500 overflow-hidden"
                 >
                    <span className="relative z-10">Live Transmission</span>
                    <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                 </a>
                 <div className="flex justify-between items-center opacity-20">
                    <span className="text-[8px] uppercase tracking-[0.5em]">Auth Code: {project.title.substring(0,3)}_VX</span>
                    <span className="text-[8px] uppercase tracking-[0.5em]">Status: Nominal</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
