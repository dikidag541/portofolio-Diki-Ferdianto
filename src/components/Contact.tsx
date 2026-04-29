import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const Contact = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-[5vw] py-32 text-off-white overflow-hidden pointer-events-auto"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "100px" }}
    >
      <div className="absolute top-[10%] left-[5%] opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20vw] font-bold uppercase tracking-tighter leading-none">DEPLOY</span>
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <motion.div variants={fadeInUp} className="overflow-hidden mb-4">
          <span className="text-[10px] uppercase tracking-[1em] opacity-40 block">Phase // 04</span>
        </motion.div>

        <motion.h2 variants={fadeInUp} className="text-[clamp(3.5rem,15vw,12rem)] font-bold uppercase tracking-[-0.05em] leading-[0.8] mb-16">
          ELITE <br /> <span className="text-stroke">DEPLOYMENT.</span>
        </motion.h2>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 text-left">
          <motion.div variants={fadeInUp}>
            <h3 className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-6">Inquiries</h3>
            <div className="group cursor-pointer">
              <span className="text-2xl md:text-3xl font-medium tracking-tighter hover:italic transition-all duration-300">hello@syntaxweb.id</span>
              <div className="h-[1px] w-0 group-hover:w-full bg-off-white transition-all duration-500"></div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 md:justify-end items-end">
            {['Instagram', 'Github', 'LinkedIn'].map((link) => (
              <Magnetic key={link}>
                <a
                  href="#"
                  className="text-[10px] uppercase tracking-[0.4em] font-bold hover:opacity-50 transition-smooth"
                >
                  {link}
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 text-[8px] uppercase tracking-[0.8em] whitespace-nowrap">
        Transmission Terminated // End of Line
      </div>
    </motion.section>
  );
};

export default Contact;
