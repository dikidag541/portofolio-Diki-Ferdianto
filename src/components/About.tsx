import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal typography on scroll
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out'
    });

    // Parallax effect for the image
    gsap.to('.about-image', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: -100,
      ease: 'none'
    });
    
    // Capabilities list reveal
    gsap.from('.capability-item', {
      scrollTrigger: {
        trigger: '.capabilities-grid',
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative px-[5vw] py-32 bg-transparent overflow-visible pointer-events-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Large Typography Header */}
        <div className="md:col-span-12 mb-32">
          <h2 
            ref={titleRef}
            className="text-[clamp(4rem,18vw,15rem)] font-bold uppercase tracking-[-0.08em] leading-[0.75] italic font-serif"
          >
            The <span className="text-stroke not-italic font-sans">Mind</span> <br /> Behind.
          </h2>
        </div>

        {/* Editorial Photo Column */}
        <div className="md:col-span-5 aspect-[3/4] md:aspect-[4/5] overflow-hidden grayscale relative group border border-off-white/10">
          <div ref={imageRef} className="about-image absolute inset-[-10%] w-[120%] h-[120%]">
             <img 
               src="/input_file_1.png" 
               alt="Diki Ferdianto Editorial" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-off-black via-transparent to-transparent opacity-40"></div>
          </div>
          <div className="absolute top-8 right-8 mix-blend-difference">
             <span className="text-[10px] uppercase tracking-[0.6em] font-bold opacity-30 italic">Syntax_Identity_V2</span>
          </div>
        </div>

        {/* Narrative & Capabilities Column */}
        <div className="md:col-start-7 md:col-span-5 flex flex-col justify-center mt-12 md:mt-0">
          <p className="text-xl md:text-3xl leading-snug tracking-tighter opacity-80 mb-20 italic">
            Engineering the intersection of high-fidelity aesthetics and neural logic. Founder of SyntaxWeb.id and Software Engineer at Universitas Jember. My mission is to decode complex systems into premium, seamless digital narratives.
          </p>
          
          <div className="capabilities-grid space-y-12">
            <div>
               <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-20 block mb-6">Capabilities</span>
               {[
                 'Advanced Web Architecture',
                 'AI Engine Integration',
                 'High-End Motion Design',
                 'Mobile App Engineering'
               ].map((item, idx) => (
                 <div key={idx} className="capability-item py-6 border-b border-off-white/5 group cursor-pointer interactive flex justify-between items-center transition-smooth">
                    <h4 className="text-2xl uppercase tracking-tighter group-hover:italic transition-all">{item}</h4>
                    <svg className="opacity-0 group-hover:opacity-100 transition-smooth" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.16667 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                 </div>
               ))}
            </div>
            
            <button className="text-[10px] uppercase tracking-[0.6em] font-bold border border-off-white/20 px-12 py-6 hover:bg-off-white hover:text-off-black transition-smooth interactive w-fit">
               Start A Project
            </button>
          </div>
        </div>
      </div>

      {/* Background Decorative Stroked Text */}
      <div className="absolute bottom-0 right-[-10%] select-none pointer-events-none opacity-[0.02]">
         <span className="text-[30vw] font-bold text-stroke leading-none">ABOUT</span>
      </div>
    </section>
  );
};

export default About;
