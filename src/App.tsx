import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import NeuralBackground from './components/NeuralBackground'
import CanvasWrapper from './components/CanvasWrapper'
import NavigationalPaths from './components/NavigationalPaths'
import DigitalFragments from './components/DigitalFragments'

function App() {
  return (
    <>
      {/* Background Universe */}
      <NeuralBackground />
      <div className="bg-grain"></div>
      
      <CustomCursor />
      <Navigation />
      
      <CanvasWrapper>
        {/* Spatial Richness Layers */}
        <DigitalFragments />
        <NavigationalPaths />

        {/* Origin Island: Hero - Centered at 350vw, 350vh */}
        <div className="absolute top-[350vh] left-[350vw] w-screen h-screen pointer-events-auto">
          <Hero />
        </div>

        {/* Project Island: To the far right */}
        <div className="absolute top-[340vh] left-[650vw] w-[120vw] scale-95 md:scale-110 pointer-events-auto">
           <Projects />
        </div>

        {/* About Island: To the far bottom-left */}
        <div className="absolute top-[600vh] left-[100vw] w-[140vw] pointer-events-auto">
           <About />
        </div>

        {/* Contact Island: Distant top-right */}
        <div className="absolute top-[100vh] left-[600vw] w-screen pointer-events-auto">
          <section id="contact" className="relative h-screen flex flex-col items-center justify-center px-[5vw] text-off-white">
            <div className="relative z-10 text-center">
              <h2 className="text-[clamp(4rem,18vw,15rem)] font-bold uppercase tracking-[-0.08em] leading-[0.75] interactive">
                LETS <br /> <span className="text-stroke">SYNC.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 mt-24">
                {['Email', 'Instagram', 'Github', 'LinkedIn'].map(link => (
                  <a key={link} href="#" className="text-[10px] uppercase tracking-[0.5em] font-bold hover:text-stroke transition-all duration-300 interactive">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Massive Decorative Background Elements */}
        <div className="absolute top-[250vh] left-[450vw] opacity-5 pointer-events-none select-none">
           <span className="text-[30vw] font-bold text-stroke">ENGINE</span>
        </div>
      </CanvasWrapper>
    </>
  )
}

export default App
