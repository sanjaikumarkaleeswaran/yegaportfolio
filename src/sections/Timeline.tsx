import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import portfolioData from '../data/portfolio.json';

export default function Timeline() {
  const education = portfolioData.education;

  return (
    <section id="timeline" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Background neon glows */}
      <div className="absolute right-10 top-1/3 w-[260px] h-[260px] bg-accent-purple/5 rounded-full blur-[110px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-widest font-orbitron text-accent-cyan mb-2"
        >
          System.Chronology()
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-5xl font-bold font-display text-white text-glow-cyan"
        >
          Educational Odyssey
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4" />
      </div>

      {/* Timeline Structure */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical glowing line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-purple shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

        {/* Timeline Items */}
        <div className="flex flex-col gap-16">
          {education.map((edu, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div key={edu.degree} className="relative flex flex-col md:flex-row items-start md:items-center w-full">
                
                {/* Node Dot overlay */}
                <div className="absolute left-4 md:left-1/2 top-6 md:top-auto -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-bg-dark border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_12px_#22d3ee]">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-ping" />
                  </div>
                </div>

                {/* Left side spacing or card */}
                <div className={`w-full md:w-1/2 flex pl-12 md:pl-0 ${isLeft ? 'md:pr-12 md:justify-end' : 'md:order-2 md:pl-12 md:justify-start'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring' as const, stiffness: 70, damping: 14 }}
                    className="w-full max-w-md"
                  >
                    <GlassCard
                      enableTilt={true}
                      tiltStrength={8}
                      glowColor={isLeft ? 'rgba(34, 211, 238, 0.12)' : 'rgba(139, 92, 246, 0.12)'}
                      className="border border-slate-800/80 p-6 text-left"
                    >
                      {/* Duration */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-2">
                        <Calendar size={12} />
                        <span>{edu.duration}</span>
                      </div>

                      {/* Institution & Degree */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-accent-cyan shrink-0">
                          <GraduationCap size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white font-display leading-snug">
                            {edu.degree}
                          </h3>
                          <p className="text-xs text-slate-400 font-semibold">{edu.institution}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <p className="text-slate-400 font-light text-sm leading-relaxed mb-4">
                        {edu.details}
                      </p>

                      {/* Grade Badge */}
                      <div className="w-fit flex items-center gap-1.5 bg-accent-blue/10 border border-accent-blue/20 text-accent-cyan px-3 py-1 rounded-full text-xs font-mono font-bold">
                        <Award size={12} />
                        <span>Grade: {edu.grade}</span>
                      </div>

                    </GlassCard>
                  </motion.div>
                </div>

                {/* Right side placeholder spacer on desktop */}
                <div className={`hidden md:block w-1/2 ${isLeft ? 'order-2' : ''}`} />

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
