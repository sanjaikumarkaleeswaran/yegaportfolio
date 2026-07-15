import { motion } from 'framer-motion';
import { GitCommit, GitBranch, FolderGit, Star, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GithubCube from '../components/GithubCube';
import portfolioData from '../data/portfolio.json';

export default function Github() {
  // Generate random data for heatmap squares (7 rows x 28 columns for visual fit)
  const heatmapRows = Array.from({ length: 7 });
  const heatmapCols = Array.from({ length: 26 });
  const getGlowLevel = () => {
    const val = Math.random();
    if (val < 0.3) return 'bg-slate-900 border-slate-950'; // 0
    if (val < 0.6) return 'bg-emerald-950 border-emerald-900'; // low
    if (val < 0.8) return 'bg-emerald-800 border-emerald-700'; // mid
    return 'bg-emerald-500 border-emerald-400 shadow-[0_0_6px_#10b981]'; // high
  };

  const stats = [
    { label: 'Commits', count: '1,248', icon: <GitCommit className="text-emerald-400" /> },
    { label: 'Repositories', count: '22', icon: <FolderGit className="text-accent-cyan" /> },
    { label: 'Stars Earned', count: '184', icon: <Star className="text-yellow-400" /> },
    { label: 'Pull Requests', count: '46', icon: <GitBranch className="text-accent-purple" /> },
  ];

  const languages = [
    { name: 'Python', percent: 45, color: 'bg-yellow-400' },
    { name: 'TypeScript / React', percent: 35, color: 'bg-accent-cyan' },
    { name: 'Node.js / Express', percent: 12, color: 'bg-accent-purple' },
    { name: 'SQL / MongoDB', percent: 8, color: 'bg-emerald-400' },
  ];

  return (
    <section id="github" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Background neon glows */}
      <div className="absolute left-10 bottom-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[140px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-widest font-orbitron text-emerald-400 mb-2"
        >
          System.Repository()
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-5xl font-bold font-display text-white text-glow-cyan"
        >
          GitHub Dev Diagnostics
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-emerald-500 to-accent-cyan mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D rotating Github cube + stats */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <GlassCard
            enableTilt={true}
            tiltStrength={8}
            glowColor="rgba(16, 185, 129, 0.15)"
            className="border border-slate-800/80 p-4"
          >
            <GithubCube />
          </GlassCard>

          {/* Core Numerical Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <GlassCard
                key={stat.label}
                enableTilt={false}
                className="p-4 border border-slate-800/50 flex flex-col items-start text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                    {stat.label}
                  </span>
                </div>
                <span className="text-xl md:text-2xl font-bold font-orbitron text-white leading-none">
                  {stat.count}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Heatmap Mock & Languages */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Mock Heatmap */}
          <GlassCard
            enableTilt={false}
            className="p-6 border border-slate-800/80 text-left flex flex-col gap-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                Contribution Heatmap (Mocked Activity)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                1,420+ Contributions in the last year
              </span>
            </div>

            {/* Grid Container */}
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[500px]">
                {heatmapRows.map((_, rIdx) => (
                  <div key={rIdx} className="flex gap-1">
                    {heatmapCols.map((_, cIdx) => (
                      <motion.div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-3.5 h-3.5 rounded-sm border ${getGlowLevel()}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (rIdx + cIdx) * 0.002 }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-end gap-2 items-center text-[10px] text-slate-500 font-mono mt-1">
              <span>Less</span>
              <div className="w-2.5 h-2.5 bg-slate-900 border border-slate-950 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-emerald-950 border border-emerald-900 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-emerald-800 border border-emerald-700 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-emerald-500 border border-emerald-400 rounded-sm" />
              <span>More</span>
            </div>
          </GlassCard>

          {/* Top Languages breakdown */}
          <GlassCard
            enableTilt={false}
            className="p-6 border border-slate-800/80 text-left flex flex-col gap-5"
          >
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
              Core Code Diagnostics (Top Languages)
            </span>

            <div className="flex flex-col gap-4">
              {languages.map((lang) => (
                <div key={lang.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono font-medium">
                    <span className="text-slate-300">{lang.name}</span>
                    <span className="text-slate-400">{lang.percent}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${lang.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>

    </section>
  );
}
