import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MagneticButton from '../components/MagneticButton';
import portfolioData from '../data/portfolio.json';

export default function Publication() {
  const pub = portfolioData.publication;

  return (
    <section id="publication" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Background neon aura */}
      <div className="absolute left-1/3 bottom-10 w-[280px] h-[280px] bg-accent-cyan/5 rounded-full blur-[120px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-widest font-orbitron text-accent-cyan mb-2"
        >
          System.Intellect()
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-5xl font-bold font-display text-white text-glow-cyan"
        >
          Research & Publications
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4" />
      </div>

      {/* Single premium badge showcase */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        >
          <GlassCard
            enableTilt={true}
            tiltStrength={8}
            glowColor="rgba(139, 92, 246, 0.15)"
            className="p-8 md:p-12 relative overflow-hidden group glow-border-purple border border-slate-800/80"
          >
            {/* Sliding metallic shine overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background: `linear-gradient(135deg, 
                  transparent 25%, 
                  rgba(255, 255, 255, 0.05) 45%, 
                  rgba(255, 255, 255, 0.15) 50%, 
                  rgba(255, 255, 255, 0.05) 55%, 
                  transparent 75%)`,
                backgroundSize: '200% 200%',
                animation: 'shine 2.5s infinite linear',
              }}
            />
            
            {/* Custom keyframes injected via tailwind-compatible class in index.css */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes shine {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-20">
              
              {/* Left Column: Shield Badge Medal (3D floating) */}
              <div className="md:col-span-4 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="relative w-40 h-40 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  {/* Cyber Shield Graphic */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                    {/* Outer Shield Border */}
                    <path
                      d="M 50 5 L 90 25 V 65 C 90 85 50 95 50 95 C 50 95 10 85 10 65 V 25 Z"
                      fill="url(#metalGrad)"
                      stroke="url(#shieldGrad)"
                      strokeWidth="2.5"
                    />
                    {/* Inner Shield */}
                    <path
                      d="M 50 12 L 82 28 V 60 C 82 76 50 85 50 85 C 50 85 18 76 18 60 V 28 Z"
                      fill="#030712"
                      opacity="0.9"
                    />
                    {/* Glowing Tech Circuits inside shield */}
                    <circle cx="50" cy="50" r="16" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3,3" />
                  </svg>
                  
                  {/* Badge Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award size={48} className="text-accent-cyan animate-[pulse_3s_infinite] drop-shadow-[0_0_8px_#22d3ee]" />
                  </div>
                </motion.div>

                {/* Badge Tag */}
                <div className="mt-4 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono">
                  <ShieldCheck size={14} />
                  <span>{pub.badge}</span>
                </div>
              </div>

              {/* Right Column: Publication Details */}
              <div className="md:col-span-8 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-accent-purple" />
                  <span className="text-xs uppercase font-orbitron font-bold tracking-widest text-accent-purple">
                    {pub.type}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-4 leading-tight group-hover:text-accent-cyan transition-colors duration-300">
                  "{pub.title}"
                </h3>

                <p className="text-slate-500 font-mono text-xs mb-4">
                  {pub.citation}
                </p>

                {/* Abstract Text */}
                <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed mb-8 border-l border-slate-800 pl-4 py-1 italic">
                  {pub.abstract}
                </p>

                {/* Action button */}
                <MagneticButton range={30}>
                  <a
                    href="https://ieeexplore.ieee.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-accent-purple to-accent-blue text-white px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider font-orbitron hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300"
                  >
                    <ExternalLink size={14} /> Read Paper on IEEE Explore
                  </a>
                </MagneticButton>
              </div>

            </div>
          </GlassCard>
        </motion.div>
      </div>

    </section>
  );
}
