import { motion } from 'framer-motion';

const SKILLS = [
  { name: "React.js", category: "Frontend", x: -150, y: -100 },
  { name: "Laravel", category: "Backend", x: 180, y: -140 },
  { name: "Python & AI", category: "Data & AI", x: 220, y: 80 },
  { name: "React Native", category: "Mobile", x: -200, y: 120 },
  { name: "Tailwind CSS", category: "Styling", x: 40, y: 180 },
  { name: "Firebase", category: "Backend/Realtime", x: -80, y: -220 },
  { name: "MySQL & Postgres", category: "Database", x: 280, y: -40 },
  { name: "System Analysis", category: "Architecture", x: -300, y: -50 },
];

const Expertise = () => {
  return (
    <section className="relative w-screen h-screen flex items-center justify-center pointer-events-auto overflow-visible">
      {/* Central Core */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border border-off-white/10 rounded-full flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-off-white rounded-full shadow-none"></div>
        </motion.div>
        <h2 className="mt-12 text-[clamp(4rem,12vw,10rem)] font-display uppercase tracking-[-0.02em] leading-[0.8] text-center hover-glitch transition-all">
          NEURAL <br /> <span className="text-stroke">EXPERTISE.</span>
        </h2>
        <span className="text-[10px] uppercase tracking-[0.8em] opacity-30 mt-8">Technical Constellation // v1.0</span>
      </div>

      {/* Skills Galaxy Cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        {SKILLS.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "backOut" }}
            className="absolute group cursor-help"
            style={{ x: skill.x, y: skill.y }}
          >
            <div className="relative">
              {/* Connecting Line to Center */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 0.15, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1 }}
                className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-transparent to-off-white origin-left"
                style={{
                  width: Math.sqrt(skill.x ** 2 + skill.y ** 2),
                  transform: `rotate(${Math.atan2(-skill.y, -skill.x) * 180 / Math.PI}deg)`,
                  left: 64, top: 64 // Offset from skill card center/anchor
                }}
              >
                {/* Energy Pulse */}
                <motion.div 
                  animate={{ left: ['0%', '50%', '100%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5, ease: "linear", times: [0, 0.5, 1] }}
                  className="absolute top-[-2px] w-8 h-[5px] bg-off-white blur-[1px] rounded-full"
                />
              </motion.div>

              <div className="relative z-20 bg-off-black/80 backdrop-blur-md border border-off-white/10 p-4 md:p-6 transition-smooth group-hover:border-off-white/40 group-hover:-translate-y-2">
                <span className="block text-[8px] uppercase tracking-[0.4em] opacity-40 mb-2">{skill.category}</span>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter whitespace-nowrap">{skill.name}</h3>
              </div>

              {/* Particle bits */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-off-white/20 group-hover:bg-off-white transition-colors"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Narrative */}
      <div className="absolute bottom-[15%] left-[5%] max-w-xs opacity-20 hidden md:block">
        <p className="text-[10px] uppercase tracking-[0.4em] leading-relaxed italic">
          Developing high-performance architectures using modern digital stacks. Bridging the gap between design precision and engineering logic.
        </p>
      </div>
    </section>
  );
};

export default Expertise;
