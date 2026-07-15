import { motion, Variants } from 'framer-motion';
import { FileText, Github, Linkedin, ArrowDown, Mail } from 'lucide-react';
import Hologram from '../components/Hologram';
import TypingEffect from '../components/TypingEffect';
import MagneticButton from '../components/MagneticButton';
import portfolioData from '../data/portfolio.json';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const roles = [
    "AI & Deep Learning Architect",
    "Full-Stack Software Engineer",
    "NLP & Transformer Researcher",
    "Creative 3D Web Developer"
  ];

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden max-w-7xl mx-auto px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* Left: Text & CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col text-left justify-center order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Badge */}
          <motion.div 
            variants={itemVariants}
            className="w-fit mb-4 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 text-xs text-accent-cyan font-mono tracking-widest uppercase"
          >
            Welcome to the Future of Web
          </motion.div>

          {/* Large Glowing Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight text-white mb-4 leading-tight"
          >
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple bg-clip-text text-transparent text-glow-cyan animate-pulse duration-[8s]">
              {portfolioData.personal.name}
            </span>
          </motion.h1>

          {/* Subtitle / Typing animation */}
          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl font-medium text-slate-300 mb-6 h-8 flex items-center"
          >
            <span className="text-slate-400 mr-2 font-mono">_execute:</span>
            <TypingEffect words={roles} />
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-400 max-w-xl mb-8 leading-relaxed font-light"
          >
            {portfolioData.personal.summary}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-12"
          >
            <MagneticButton range={30}>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-8 py-3.5 rounded-full font-semibold font-orbitron text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                <Mail size={16} /> Contact Me
              </a>
            </MagneticButton>

            <MagneticButton range={30}>
              <a
                href="https://github.com/adharanidharan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-sm"
              >
                <FileText size={16} /> View CV / Resume
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social Icons Trail */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5 text-slate-500"
          >
            <span className="text-xs uppercase tracking-widest font-mono font-medium">Connect</span>
            <div className="w-12 h-[1px] bg-slate-800" />
            <div className="flex gap-4">
              <MagneticButton range={40}>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-cyan transition-colors"
                >
                  <Github size={20} />
                </a>
              </MagneticButton>
              <MagneticButton range={40}>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-purple transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </MagneticButton>
              <MagneticButton range={40}>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="hover:text-accent-blue transition-colors"
                >
                  <Mail size={20} />
                </a>
              </MagneticButton>
            </div>
          </motion.div>

        </motion.div>

        {/* Right: 3D Hologram Scene */}
        <motion.div
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Glowing purple ambient aura behind hologram */}
          <div className="absolute w-[200px] h-[200px] bg-accent-purple/20 rounded-full blur-[100px] -z-10 animate-pulse bg-glow-pulse" />
          <Hologram />
        </motion.div>

      </div>

      {/* Floating mouse scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-slate-500 font-mono text-[10px] tracking-widest">
        <span>SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-accent-cyan" />
        </motion.div>
      </div>

    </section>
  );
}
