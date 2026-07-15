import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Code, Server, Database, Brain, Terminal, GitBranch, Cpu, MessageSquare, Sparkles
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import portfolioData from '../data/portfolio.json';

// Helper to resolve relevant Lucide icon for each skill
const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('react')) return <Code className="w-6 h-6 text-accent-cyan" />;
  if (n.includes('node') || n.includes('express')) return <Server className="w-6 h-6 text-indigo-400" />;
  if (n.includes('mongo') || n.includes('sql')) return <Database className="w-6 h-6 text-accent-blue" />;
  if (n.includes('python')) return <Cpu className="w-6 h-6 text-yellow-400" />;
  if (n.includes('bert') || n.includes('roberta') || n.includes('nlp')) return <MessageSquare className="w-6 h-6 text-accent-purple" />;
  if (n.includes('deep learning')) return <Brain className="w-6 h-6 text-pink-500" />;
  if (n.includes('git')) return <GitBranch className="w-6 h-6 text-orange-500" />;
  if (n.includes('linux')) return <Terminal className="w-6 h-6 text-emerald-400" />;
  return <Code className="w-6 h-6 text-slate-400" />;
};

// Descriptions mapping for each skill to render on hover
const SKILL_DESCRIPTIONS: Record<string, string> = {
  'React': 'High-performance interactive UIs & component lifecycle control.',
  'Node': 'Asynchronous server-side architectures and runtime scaling.',
  'Express': 'RESTful microservices, middleware chains & endpoint routing.',
  'MongoDB': 'NoSQL document indexing, aggregation pipelines & data models.',
  'SQL': 'Relational schema structures, complex joins & query optimization.',
  'Python': 'Core language for tensor operations, model training & data pipelines.',
  'BERT': 'Transformer encoders for bi-directional text sequence analysis.',
  'DistilBERT': 'Compressed Transformer pipelines for low-latency inferences.',
  'XLM-RoBERTa': 'Multi-lingual pre-trained architectures for cross-lingual tasks.',
  'NLP': 'Tokenization, syntax trees, sentiment scoring & vector embeddings.',
  'Deep Learning': 'Gradient descent, backpropagation, and multi-layer neural architectures.',
  'Git': 'Distributed version control, branch trees & merge strategies.',
  'GitHub': 'Repository hosting, collaborative pull requests & CI/CD automation.',
  'Linux': 'Shell scripting, POSIX system configurations & server operations.'
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Dynamic Glow Background */}
      <div className="absolute left-10 top-1/4 w-[350px] h-[350px] bg-accent-purple/10 rounded-full blur-[140px] -z-10 bg-glow-pulse" />
      <div className="absolute right-10 bottom-1/4 w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[120px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-20 relative z-10">
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

      {/* Animated Neural Connection Background (SVG lines with animated dashoffset) */}
      <div className="absolute inset-0 top-40 bottom-10 opacity-30 pointer-events-none z-0 hidden lg:block">
        <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
          <defs>
            <linearGradient id="neuralGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* Interwoven neural curves */}
          <path d="M100,100 C300,150 200,450 500,300 C700,200 600,500 900,450" stroke="url(#neuralGrad1)" strokeWidth="1.5" className="neural-link-path" />
          <path d="M150,500 C400,400 300,100 600,250 C800,350 700,50 850,200" stroke="url(#neuralGrad1)" strokeWidth="1" className="neural-link-path opacity-60" />
          <path d="M50,300 C350,250 500,50 750,400 C850,500 900,150 950,50" stroke="#8b5cf6" strokeWidth="1.2" className="neural-link-path" />
        </svg>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes neuralDash {
            to {
              stroke-dashoffset: -50;
            }
          }
          .neural-link-path {
            stroke-dasharray: 10, 10;
            animation: neuralDash 4s linear infinite;
          }
        `}} />
      </div>

      {/* Grid of Interactive 3D Skill Chips */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10"
      >
        {portfolioData.skills.map((skill, index) => {
          const isHovered = hoveredSkill === skill.name;
          
          // Generate a slow floating translation offset for each chip out of phase
          const floatDelay = index * 0.4;
          
          return (
            <motion.div 
              key={skill.name} 
              variants={itemVariants}
              animate={{ 
                y: [0, -6, 0],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                  delay: floatDelay
                }
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative"
            >
              <GlassCard
                enableTilt={true}
                tiltStrength={15}
                glowColor={
                  skill.category === 'Frontend'
                    ? 'rgba(34, 211, 238, 0.22)'
                    : skill.category === 'Backend' || skill.category === 'Database'
                    ? 'rgba(59, 130, 246, 0.22)'
                    : 'rgba(139, 92, 246, 0.22)'
                }
                className="flex flex-col h-[180px] p-5 justify-between transition-all duration-300 border border-slate-800/60 bg-slate-950/20 backdrop-blur-md"
              >
                {/* Header: Skill Category & Rotating Icon */}
                <div className="w-full flex justify-between items-start">
                  <span className="text-[8px] font-mono tracking-widest bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">
                    {skill.category}
                  </span>
                  
                  {/* Icon Rotates Slowly on Auto, Fast on Hover */}
                  <motion.div
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 shadow-[inset_0_0_8px_rgba(255,255,255,0.02)]"
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                  >
                    {getSkillIcon(skill.name)}
                  </motion.div>
                </div>

                {/* Body Details: Name & Expandable Description */}
                <div className="flex-grow flex flex-col justify-center text-left my-2">
                  <h3 className="text-base font-bold text-white tracking-wide font-display mb-1 flex items-center gap-1.5">
                    {skill.name}
                    {isHovered && <Sparkles size={11} className="text-accent-cyan animate-pulse" />}
                  </h3>
                  
                  {/* Expand and reveal description when hovered */}
                  <div className="h-10 overflow-hidden">
                    <p className="text-[10px] md:text-xs text-slate-400 font-light leading-relaxed select-none">
                      {isHovered 
                        ? SKILL_DESCRIPTIONS[skill.name] || 'Active engineering module.'
                        : `System node verified. Calibration level optimal.`
                      }
                    </p>
                  </div>
                </div>

                {/* Footer: Energy Glow Bar */}
                <div className="w-full mt-2">
                  <div className="w-full h-1.5 bg-slate-900/60 rounded-full overflow-hidden border border-slate-800/40">
                    <motion.div
                      className={`h-full rounded-full ${
                        skill.category === 'Frontend'
                          ? 'bg-gradient-to-r from-accent-cyan to-accent-blue shadow-[0_0_8px_#22d3ee]'
                          : skill.category === 'Backend' || skill.category === 'Database'
                          ? 'bg-gradient-to-r from-accent-blue to-accent-purple shadow-[0_0_8px_#3b82f6]'
                          : 'bg-gradient-to-r from-accent-purple to-pink-500 shadow-[0_0_8px_#8b5cf6]'
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[8px] font-mono text-slate-500 font-medium">
                    <span>INDEX: {skill.level}%</span>
                    <span>ACTIVE</span>
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
