import { motion, Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Award, BookOpen } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import RotatingEarth from '../components/RotatingEarth';
import portfolioData from '../data/portfolio.json';

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 12 },
    },
  };

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Background glow */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-accent-blue/10 rounded-full blur-[120px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-widest font-orbitron text-accent-cyan mb-2"
        >
          System.Profile()
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-5xl font-bold font-display text-white text-glow-cyan"
        >
          Decrypting The Architect
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left Side: Photo Frame & 3D Earth */}
        <div className="lg:col-span-5 flex flex-col items-center gap-6 justify-center">
          {/* Glowing Avatar Frame */}
          <GlassCard
            enableTilt={true}
            tiltStrength={12}
            className="p-3 w-[260px] h-[260px] md:w-[320px] md:h-[320px] flex items-center justify-center glow-border-purple"
            glowColor="rgba(139, 92, 246, 0.25)"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <img
                src="/profile_avatar.png"
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60" />
              
              {/* Scanline overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[length:100%_4px] pointer-events-none opacity-20" />
            </div>
          </GlassCard>

          {/* Holographic Earth Globe */}
          <div className="w-full">
            <RotatingEarth />
          </div>
        </div>

        {/* Right Side: Professional Details */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl md:text-2xl font-semibold text-white font-display mb-3">
              About Me
            </h3>
            <p className="text-slate-400 font-light leading-relaxed mb-6">
              {portfolioData.personal.summary}
            </p>
          </motion.div>

          {/* Quick Metrics / Badges */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard enableTilt={false} className="py-4 px-5 border-l-2 border-l-accent-cyan flex gap-4 items-center">
              <Award className="text-accent-cyan" size={24} />
              <div>
                <h4 className="text-xs uppercase text-slate-500 font-mono">MCA Grade</h4>
                <p className="text-white font-bold font-orbitron text-lg">{portfolioData.education[0].grade}</p>
              </div>
            </GlassCard>

            <GlassCard enableTilt={false} className="py-4 px-5 border-l-2 border-l-accent-purple flex gap-4 items-center">
              <BookOpen className="text-accent-purple" size={24} />
              <div>
                <h4 className="text-xs uppercase text-slate-500 font-mono">BSc Grade</h4>
                <p className="text-white font-bold font-orbitron text-lg">{portfolioData.education[1].grade}</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Personal Info Grid */}
          <motion.div variants={itemVariants} className="mt-4">
            <GlassCard enableTilt={false} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-cyan">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Location</span>
                  <span className="text-sm text-slate-300 font-medium">{portfolioData.personal.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-purple">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Email</span>
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-sm text-slate-300 hover:text-accent-purple font-medium transition-colors">
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-blue">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Phone</span>
                  <a href={`tel:${portfolioData.personal.phone}`} className="text-sm text-slate-300 hover:text-accent-blue font-medium transition-colors">
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                  <Award size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Status</span>
                  <span className="text-sm text-slate-300 font-medium">Ready for Opportunities</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
