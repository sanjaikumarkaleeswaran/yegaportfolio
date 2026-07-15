import { motion, Variants } from 'framer-motion';
import { Github, ExternalLink, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MagneticButton from '../components/MagneticButton';
import portfolioData from '../data/portfolio.json';

// Mapping project IDs to their generated public images
const PROJECT_IMAGES: Record<string, string> = {
  'sentiment-analysis': '/project_sentiment.png',
  'inventory-management': '/project_inventory.png',
  'employee-management': '/project_employee.png',
};

export default function Projects() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 14 },
    },
  };

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Background radial glow */}
      <div className="absolute right-20 top-1/3 w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[130px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-widest font-orbitron text-accent-cyan mb-2"
        >
          System.Deployments()
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-5xl font-bold font-display text-white text-glow-cyan"
        >
          Featured Prototypes
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4" />
      </div>

      {/* Projects Stack */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col gap-16"
      >
        {portfolioData.projects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div key={project.id} variants={cardVariants}>
              <GlassCard
                enableTilt={true}
                tiltStrength={6}
                glowColor="rgba(34, 211, 238, 0.1)"
                className="p-6 md:p-8 lg:p-10 border border-slate-800/60"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left (or Right): Project Mockup Zoom */}
                  <div className={`lg:col-span-6 relative overflow-hidden rounded-xl border border-slate-800/80 group ${
                    isEven ? 'order-1' : 'order-1 lg:order-2'
                  }`}>
                    {/* Glowing effect inside image container */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="w-full aspect-[16/10] overflow-hidden"
                    >
                      <img
                        src={PROJECT_IMAGES[project.id]}
                        alt={project.title}
                        className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
                      />
                    </motion.div>

                    {/* Tech Badges floating over image */}
                    <div className="absolute top-3 left-3 z-20 flex gap-2 flex-wrap">
                      <span className="text-[10px] font-bold font-mono tracking-wider bg-bg-dark/80 backdrop-blur-md px-3 py-1 border border-accent-cyan/30 rounded-full text-accent-cyan flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        <Sparkles size={10} /> Active Demo
                      </span>
                    </div>
                  </div>

                  {/* Right (or Left): Details */}
                  <div className={`lg:col-span-6 flex flex-col text-left ${
                    isEven ? 'order-2' : 'order-2 lg:order-1'
                  }`}>
                    {/* Tagline */}
                    <span className="text-xs uppercase font-orbitron text-accent-purple tracking-widest mb-1.5 font-bold">
                      {project.tagline}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4 hover:text-accent-cyan transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Overview */}
                    <p className="text-slate-400 font-light leading-relaxed mb-6 text-sm md:text-base">
                      {project.overview}
                    </p>

                    {/* Features List */}
                    <div className="mb-6 flex flex-col gap-2">
                      <span className="text-xs uppercase font-mono font-medium text-slate-500 tracking-wider">Core Operations</span>
                      {project.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-accent-cyan shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] md:text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Buttons */}
                    <div className="flex gap-4">
                      <MagneticButton range={30}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-orbitron transition-all duration-300"
                        >
                          <Github size={14} /> Repository
                        </a>
                      </MagneticButton>

                      <MagneticButton range={30}>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-orbitron hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-300"
                        >
                          <ExternalLink size={14} /> Live System
                        </a>
                      </MagneticButton>
                    </div>

                  </div>

                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
