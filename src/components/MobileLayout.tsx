import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';

const SKILLS = [
  { name: "React.js", category: "Frontend" },
  { name: "Laravel", category: "Backend" },
  { name: "Python & AI", category: "Data & AI" },
  { name: "React Native", category: "Mobile" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Firebase", category: "Realtime" },
  { name: "MySQL", category: "Database" },
  { name: "UML & SDLC", category: "Architecture" },
];

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
    description: "Platform arsip fotografi berbasis web untuk komunikasi privat antara studio dan klien. Mengintegrasikan Google Drive dan fitur seleksi foto interaktif.",
    tags: ["Laravel", "Inertia.js", "React.js", "MySQL", "Tailwind"]
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
    title: "NURUL ALI",
    category: "Islamic Education",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    year: "2024",
    url: "https://nurulalijember.id/",
    description: "Digital portal for Pondok Pesantren Nurul Ali. Cultivating religious education and community values with clarity."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const MobileLayout = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-off-black text-off-white font-sans min-h-screen overflow-x-hidden">

      {/* ── Mobile Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-[200] flex justify-between items-center px-6 py-5 bg-off-black/80 backdrop-blur-lg border-b border-off-white/5">
        <span className="text-xs font-bold tracking-[0.2em] uppercase">Diki Ferdianto ©</span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[5px] p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block w-6 h-[1.5px] bg-off-white origin-center transition-all" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-[1.5px] bg-off-white" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block w-6 h-[1.5px] bg-off-white origin-center transition-all" />
        </button>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[190] bg-off-black/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {['hero', 'identity', 'about', 'skills', 'projects', 'contact'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(item)}
                className="text-4xl font-display uppercase tracking-tighter hover:opacity-40 transition-opacity"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION 1: Hero ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
        {/* Background big text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
          <span className="text-[50vw] font-bold uppercase leading-none">DF</span>
        </div>

        {/* Scanning line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-neural-cyan/30 animate-scan" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neural-cyan opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neural-cyan" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.5em] text-neural-cyan/70 font-bold">Available for Work</span>
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={fadeUp}
            className="relative w-44 h-52 mb-8 border border-off-white/10 overflow-hidden"
          >
            <img
              src="./input_file_0.png"
              alt="Diki Ferdianto"
              className="w-full h-full object-cover grayscale-[0.2] brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-off-black/60 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-neural-cyan/40 animate-scan" />
          </motion.div>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="text-[clamp(3.5rem,18vw,8rem)] font-display uppercase leading-[0.8] tracking-[-0.02em] mb-3">
            DIKI<br />
            <span className="font-serif italic lowercase tracking-tight">ferdianto</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.6em] opacity-50 mb-10">
            System Analyst &amp; Fullstack Developer
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4">
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 border border-off-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-off-white hover:text-off-black transition-all duration-500"
            >
              View Work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 border border-off-white/20 text-[10px] uppercase tracking-[0.4em] font-bold hover:border-off-white transition-all duration-500"
            >
              Contact
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[8px] uppercase tracking-[0.5em]">Scroll</span>
          <div className="w-[1px] h-8 bg-off-white" />
        </motion.div>
      </section>

      {/* ── SECTION 2: Identity / Core Data ── */}
      <section id="identity" className="px-6 py-20 border-t border-off-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-[9px] uppercase tracking-[0.6em] opacity-30 block mb-4">
            Identification // 01
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(3rem,15vw,6rem)] font-display uppercase leading-[0.8] tracking-tighter mb-10">
            CORE<br />DATA.
          </motion.h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            {[
              { label: 'System_Name', value: 'Diki Ferdianto' },
              { label: 'Origin_Point', value: 'Jember, Indonesia' },
              { label: 'Current_Status', value: 'S1 Informatika' },
              { label: 'University', value: 'Universitas Jember' },
              { label: 'GPA', value: '3.56 / 4.0' },
              { label: 'Core_Logic', value: 'Laravel / React / Python' },
            ].map((spec, i) => (
              <motion.div key={i} variants={fadeUp} className="border-b border-off-white/10 pb-4">
                <span className="text-[8px] uppercase tracking-[0.4em] opacity-30 block mb-2">{spec.label}</span>
                <div className="text-sm font-light tracking-tight">{spec.value}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-off-white/10">
            <p className="text-sm font-serif italic opacity-50 leading-relaxed">
              "I view digital systems not just as code, but as structured architecture — an interplay of rigorous backend logic, precise system analysis, and visual clarity."
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 3: About ── */}
      <section id="about" className="px-6 py-20 border-t border-off-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-[9px] uppercase tracking-[0.6em] opacity-30 block mb-4">
            Context // Information
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(3rem,15vw,6rem)] font-display uppercase leading-[0.8] tracking-tighter mb-10 italic font-serif">
            The <span className="text-stroke not-italic font-display">Mind</span><br />
            Behind.
          </motion.h2>

          {/* Photo */}
          <motion.div variants={fadeUp} className="relative w-full aspect-[3/4] mb-8 overflow-hidden border border-off-white/10">
            <img
              src="./input_file_1.png"
              alt="Diki Ferdianto"
              className="w-full h-full object-cover grayscale opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-off-black/70 to-transparent" />
            <span className="absolute top-4 right-4 text-[8px] uppercase tracking-[0.6em] opacity-30">v2.0_IDENTITY</span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="text-base leading-relaxed opacity-70 mb-10">
            Mahasiswa Informatika di Universitas Jember yang berfokus pada System Analysis, Backend, dan Fullstack Web Development. Berpengalaman merancang arsitektur sistem (UML, SDLC), mengintegrasikan basis data, serta mengimplementasikan machine learning dan forecasting untuk optimasi sistem informasi.
          </motion.p>

          {/* Specialties */}
          <motion.div variants={fadeUp} className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-20 block pb-3 border-b border-off-white/10">Specialties</span>
            {['System Analysis & UML', 'Backend Engineering', 'Fullstack Development', 'Mobile Development'].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-off-white/5">
                <span className="text-base uppercase tracking-tight font-light">{item}</span>
                <span className="text-[9px] opacity-20">0{idx + 1}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 4: Skills ── */}
      <section id="skills" className="px-6 py-20 border-t border-off-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span variants={fadeUp} className="text-[9px] uppercase tracking-[0.6em] opacity-30 block mb-4">
            Technical Constellation // v1.0
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(3rem,15vw,6rem)] font-display uppercase leading-[0.8] tracking-tighter mb-10">
            NEURAL<br /><span className="text-stroke">EXPERTISE.</span>
          </motion.h2>

          <div className="grid grid-cols-2 gap-3">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border border-off-white/10 p-4 bg-off-white/[0.02] hover:border-off-white/30 transition-colors duration-300"
              >
                <span className="block text-[7px] uppercase tracking-[0.4em] opacity-30 mb-1">{skill.category}</span>
                <span className="text-sm font-bold uppercase tracking-tight">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 5: Projects ── */}
      <section id="projects" className="px-6 py-20 border-t border-off-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-[9px] uppercase tracking-[0.6em] opacity-30 block mb-4">
            Archive Transmission
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(3rem,15vw,6rem)] font-display uppercase leading-[0.8] tracking-tighter mb-10">
            SELECTED<br />PORTO.
          </motion.h2>

          <div className="space-y-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                onClick={() => { setSelectedProject(project); setIsModalOpen(true); }}
                className="group relative cursor-pointer overflow-hidden border border-off-white/10 hover:border-off-white/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[8px] font-mono opacity-40 uppercase tracking-widest">{project.category}</span>
                    <span className="text-[8px] font-mono opacity-30">{project.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">{project.title}</h3>
                  <p className="text-xs opacity-50 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="mt-4 flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] uppercase tracking-[0.4em]">View Case</span>
                    <div className="h-[1px] w-8 bg-off-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 6: Contact ── */}
      <section id="contact" className="px-6 py-20 border-t border-off-white/5 min-h-[60vh] flex flex-col justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-[9px] uppercase tracking-[0.6em] opacity-30 block mb-4">
            Phase // 04
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(3.5rem,18vw,8rem)] font-display uppercase leading-[0.8] tracking-tighter mb-10">
            ELITE<br /><span className="text-stroke">DEPLOY.</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="mb-8">
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 block mb-3">Inquiries</span>
            <a
              href="mailto:DikiFerdianto99@gmail.com"
              className="text-lg font-medium tracking-tight hover:opacity-50 transition-opacity"
            >
              DikiFerdianto99@gmail.com
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10">
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 block mb-3">Phone</span>
            <a
              href="tel:+6285733478061"
              className="text-lg font-medium tracking-tight hover:opacity-50 transition-opacity"
            >
              +62 857 3347 8061
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-8 flex-wrap">
            {[
              { label: 'Instagram', url: 'https://instagram.com/dkyy.no' },
              { label: 'Github', url: 'https://github.com/dikidag541' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/diki-ferdianto-b16a3a2a4/' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-off-white/20 pb-1 hover:border-off-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-off-white/5 flex justify-between items-center"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] opacity-20">Diki Ferdianto © 2026</span>
          <span className="text-[8px] uppercase tracking-[0.4em] opacity-20">SN-2026-DF-001</span>
        </motion.div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MobileLayout;
