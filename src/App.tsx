import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import NeuralBackground from './components/NeuralBackground'
import CanvasWrapper from './components/CanvasWrapper'
import NavigationalPaths from './components/NavigationalPaths'
import DigitalFragments from './components/DigitalFragments'
import Contact from './components/Contact'
import Preloader from './components/Preloader'
import SpaceDebris from './components/SpaceDebris'
import Expertise from './components/Expertise'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 bg-transparent pointer-events-none z-[-10]">
        <NeuralBackground />
      </div>
      <div className="bg-grain"></div>
      
      <CustomCursor />
      <Navigation />
      
      <CanvasWrapper>
        <DigitalFragments />
        <NavigationalPaths />
        <SpaceDebris />

        {/* 0: Hero - (400, 400) */}
        <div 
          className="absolute w-screen h-screen flex items-center justify-center pointer-events-auto"
          style={{ top: '400vh', left: '400vw', transform: 'translate(-50%, -50%)' }}
        >
          <Hero />
        </div>

        {/* 1: About - (170, 650) */}
        <div 
          className="absolute w-[140vw] flex items-center justify-center pointer-events-auto"
          style={{ top: '650vh', left: '170vw', transform: 'translate(-50%, -50%)' }}
        >
           <About />
        </div>

        {/* 2: Expertise - (450, 750) */}
        <div 
          className="absolute w-screen h-screen flex items-center justify-center pointer-events-auto"
          style={{ top: '750vh', left: '450vw', transform: 'translate(-50%, -50%)' }}
        >
           <Expertise />
        </div>

        {/* 3: Porto - (740, 410) */}
        <div 
          className="absolute w-[200vw] flex items-center justify-center pointer-events-auto"
          style={{ top: '410vh', left: '740vw', transform: 'translate(-50%, -50%)' }}
        >
           <Projects />
        </div>

        {/* 4: Contact - (650, 150) */}
        <div 
          className="absolute w-screen flex items-center justify-center pointer-events-auto"
          style={{ top: '150vh', left: '650vw', transform: 'translate(-50%, -50%)' }}
        >
           <Contact />
        </div>

        {/* Engine Overlay */}
        <div 
          className="absolute opacity-5 pointer-events-none select-none"
          style={{ top: '250vh', left: '450vw', transform: 'translate(-50%, -50%)' }}
        >
           <span className="text-[30vw] font-bold text-stroke">ENGINE</span>
        </div>
      </CanvasWrapper>

      <div className="h-[800vh] w-px pointer-events-none relative z-[-1]" />
    </>
  )
}

export default App
