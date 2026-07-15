import { motion, Variants } from 'framer-motion';
import { 
  Code, Server, Database, Brain, Terminal, GitBranch, Cpu, MessageSquare 
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import portfolioData from '../data/portfolio.json';

// Helper to resolve relevant Lucide icon for each skill
const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('react')) return <Code className="w-6 h-6 text-accent-cyan" />;
  if (n.includes('node') || n.includes('express')) return <Server className="w-6 h-6 text-slate-300" />;
  if (n.includes('mongo') || n.includes('sql')) return <Database className="w-6 h-6 text-accent-blue" />;
  if (n.includes('python')) return <Cpu className="w-6 h-6 text-yellow-400" />;
  if (n.includes('bert') || n.includes('roberta') || n.includes('nlp')) return <MessageSquare className="w-6 h-6 text-accent-purple" />;
  if (n.includes('deep learning')) return <Brain className="w-6 h-6 text-pink-500" />;
  if (n.includes('git')) return <GitBranch className="w-6 h-6 text-orange-500" />;
  if (n.includes('linux')) return <Terminal className="w-6 h-6 text-emerald-400" />;
  return <Code className="w-6 h-6 text-slate-400" />;
};

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Background neon glow */}
      <div className="absolute left-10 top-1/4 w-[300px] h-[300px] bg-accent-purple/10 rounded-full blur-[140px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-widest font-orbitron text-accent-cyan mb-2"
        >
          System.Capabilities()
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-5xl font-bold font-display text-white text-glow-cyan"
        >
          Tech Stack Matrix
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4" />
      </div>

      {/* Grid of Skills */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {portfolioData.skills.map((skill) => {
          const radius = 28;
          const stroke = 3.5;
          const normalizedRadius = radius - stroke * 2;
          const circumference = normalizedRadius * 2 * Math.PI;
          const strokeDashoffset = circumference - (skill.level / 100) * circumference;

          return (
            <motion.div key={skill.name} variants={itemVariants}>
              <GlassCard
                enableTilt={true}
                tiltStrength={15}
                glowColor={
                  skill.category === 'Frontend'
                    ? 'rgba(34, 211, 238, 0.15)'
                    : skill.category === 'Backend' || skill.category === 'Database'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(139, 92, 246, 0.15)'
                }
                className="flex flex-col h-full items-center text-center p-6 justify-between group"
              >
                {/* Header: Rotating Category Badge & Icon */}
                <div className="w-full flex justify-between items-start mb-4">
                  <span className="text-[9px] uppercase font-mono tracking-widest bg-slate-900/80 px-2 py-0.5 border border-slate-800 rounded text-slate-500">
                    {skill.category}
                  </span>
                  
                  {/* Rotating Icon wrapper */}
                  <motion.div
                    className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/40"
                    whileHover={{ rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10, duration: 0.8 }}
                  >
                    {getSkillIcon(skill.name)}
                  </motion.div>
                </div>

                {/* Core Detail */}
                <div className="my-4">
                  <h3 className="text-lg font-bold text-white tracking-wide font-display">
                    {skill.name}
                  </h3>
                </div>

                {/* Footer: Circular Progress Indicator */}
                <div className="relative flex items-center justify-center mt-2">
                  <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                    {/* Background Track */}
                    <circle
                      stroke="rgba(255, 255, 255, 0.03)"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                    {/* Foreground Bar */}
                    <motion.circle
                      stroke={
                        skill.category === 'Frontend'
                          ? '#22d3ee'
                          : skill.category === 'Backend' || skill.category === 'Database'
                          ? '#3b82f6'
                          : '#8b5cf6'
                      }
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeDasharray={circumference + ' ' + circumference}
                      style={{ strokeDashoffset }}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold font-mono text-slate-400 group-hover:text-white transition-colors duration-300">
                    {skill.level}%
                  </span>
                </div>

              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
