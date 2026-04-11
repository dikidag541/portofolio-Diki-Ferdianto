import { motion } from 'framer-motion';

const About = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.section 
      id="about"
      className="relative px-[5vw] py-32 bg-transparent overflow-visible pointer-events-auto"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "100px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Large Typography Header - More Asymmetric */}
        <div className="md:col-start-2 md:col-span-10 mb-24 md:mb-48">
          <motion.h2 
            variants={fadeInUp}
            className="text-[clamp(3rem,15vw,12rem)] font-bold uppercase tracking-[-0.08em] leading-[0.8] italic font-serif"
          >
            The <span className="text-stroke not-italic font-sans">Mind</span> <br /> 
            <span className="md:ml-[20%]">Behind.</span>
          </motion.h2>
        </div>

        {/* Narrative & Capabilities Column - Shifted */}
        <div className="md:col-start-2 md:col-span-4 flex flex-col justify-center">
          <motion.div variants={fadeInUp} className="overflow-hidden mb-8">
            <span className="text-[10px] uppercase tracking-[0.6em] opacity-30 block">Context // Information</span>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-lg md:text-2xl leading-relaxed tracking-tight opacity-70 mb-12">
            Engineering the intersection of high-fidelity aesthetics and neural logic. Founder of SyntaxWeb.id and Software Engineer at Universitas Jember. My mission is to decode complex systems into premium, seamless digital narratives.
          </motion.p>
          
          <motion.div variants={staggerContainer} className="capabilities-grid space-y-6">
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-20 block mb-4 border-b border-off-white/10 pb-4">Specialties</span>
             {[
               'Web Architecture',
               'AI Integration',
               'Motion Design',
               'Mobile Engineering'
             ].map((item, idx) => (
               <motion.div 
                 key={idx} 
                 variants={{
                   initial: { x: -20, opacity: 0 },
                   whileInView: { x: 0, opacity: 1 }
                 }}
                 className="capability-item group cursor-pointer interactive flex justify-between items-center py-2 transition-smooth"
               >
                  <h4 className="text-xl uppercase tracking-tighter group-hover:pl-4 transition-all">{item}</h4>
                  <div className="h-[1px] flex-1 bg-off-white/5 mx-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
               </motion.div>
             ))}
          </motion.div>
        </div>

        {/* Editorial Photo Column - More Floating Feel */}
        <motion.div 
          variants={fadeInUp}
          className="md:col-start-8 md:col-span-4 aspect-[3/4] overflow-hidden grayscale relative group border border-off-white/10 shadow-3xl mt-12 md:mt-0"
        >
          <div className="about-image absolute inset-[-10%] w-[120%] h-[120%]">
             <img 
               src="/input_file_1.png" 
               alt="Diki Ferdianto Editorial" 
               className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-off-black via-transparent to-transparent opacity-60"></div>
          </div>
          <div className="absolute top-8 right-8 mix-blend-difference">
             <span className="text-[10px] uppercase tracking-[0.6em] font-bold opacity-30 italic">v2.0_IDENTITY</span>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Stroked Text */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.02, x: 0 }}
        transition={{ duration: 2 }}
        className="absolute bottom-0 right-[-10%] select-none pointer-events-none"
      >
         <span className="text-[30vw] font-bold text-stroke leading-none">ABOUT</span>
      </motion.div>
    </motion.section>
  );
};

export default About;
