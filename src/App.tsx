import { useEffect } from 'react';
import Lenis from 'lenis';

// Global / Base Components
import CustomCursor from './components/CustomCursor';
import BackgroundScene from './components/BackgroundScene';
import Navbar from './components/Navbar';
import OSOverlay from './components/OSOverlay';

// Page Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Publication from './sections/Publication';
import Timeline from './sections/Timeline';
import Github from './sections/Github';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-accent-cyan/30 selection:text-white overflow-hidden">
      {/* OS HUD Overlay */}
      <OSOverlay />

      {/* Premium glowing custom cursor pointer & trail */}
      <CustomCursor />

      {/* Global Three.js Background & Auroras */}
      <BackgroundScene />

      {/* Glassmorphic Navbar */}
      <Navbar />

      {/* Page Sections Container */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Publication />
        <Timeline />
        <Github />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
