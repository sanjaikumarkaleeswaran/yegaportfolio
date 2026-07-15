import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import portfolioData from '../data/portfolio.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-dark border-t border-slate-900/60 overflow-hidden pt-20 pb-12 w-full">
      {/* Animated liquid waves at the top of footer */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden pointer-events-none opacity-40">
        <svg className="waves w-full h-full min-h-[40px] max-h-[80px]" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(34, 211, 238, 0.08)" className="animate-[wave_12s_linear_infinite]" />
            <use href="#gentle-wave" x="48" y="3" fill="rgba(139, 92, 246, 0.08)" className="animate-[wave_8s_linear_infinite_reverse]" />
            <use href="#gentle-wave" x="48" y="5" fill="rgba(59, 130, 246, 0.12)" className="animate-[wave_5s_linear_infinite]" />
          </g>
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0% { transform: translate3d(-90px, 0, 0); }
          100% { transform: translate3d(85px, 0, 0); }
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Brand */}
        <div className="text-center md:text-left">
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="text-lg font-orbitron font-black tracking-wider text-accent-cyan text-glow-cyan"
          >
            DHARANI<span className="text-accent-purple">.</span>
          </a>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            CREATIVE PORTFOLIO // VER 1.0.0
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex gap-4">
          <MagneticButton range={35}>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900/60 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/20 transition-all duration-300"
            >
              <Github size={16} />
            </a>
          </MagneticButton>

          <MagneticButton range={35}>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900/60 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-accent-purple hover:border-accent-purple/20 transition-all duration-300"
            >
              <Linkedin size={16} />
            </a>
          </MagneticButton>

          <MagneticButton range={35}>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="w-10 h-10 rounded-full bg-slate-900/60 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-accent-blue hover:border-accent-blue/20 transition-all duration-300"
            >
              <Mail size={16} />
            </a>
          </MagneticButton>
        </div>

        {/* Right Side: Copyright */}
        <div className="text-center md:text-right font-light text-xs text-slate-500 flex flex-col items-center md:items-end gap-1">
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-accent-purple animate-pulse" /> by {portfolioData.personal.name}
          </p>
          <p className="text-[10px] font-mono opacity-80">
            © {currentYear} // ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
}
