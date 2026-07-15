import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function OSOverlay() {
  const [gpuLoad, setGpuLoad] = useState(98);
  const [coreTemp, setCoreTemp] = useState(42);
  const [ping, setPing] = useState(24);
  const [timeStr, setTimeStr] = useState('');

  // Animate status readouts dynamically to look alive
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuLoad((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(100, Math.max(90, prev + delta));
      });
      setCoreTemp((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.min(50, Math.max(38, prev + delta));
      });
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.min(45, Math.max(18, prev + delta));
      });
    }, 1800);

    const timeInterval = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-mono select-none">
      
      {/* 1. Global Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.12))] bg-[length:100%_4px] opacity-35" />
      
      {/* 2. Global Glitch Scan Overlay (Vertical sweeping line) */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-accent-cyan/15 shadow-[0_0_15px_rgba(34,211,238,0.5)] opacity-40"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* 3. Screen Borders / HUD Frame */}
      <div className="absolute inset-4 md:inset-8 border border-slate-500/10 pointer-events-none rounded-xl">
        {/* Subtle grid indicators on top and bottom borders */}
        <div className="absolute -top-1 left-10 right-10 h-[2px] flex justify-between text-[6px] text-slate-600/40">
          <span>||||||||||||||||||||</span>
          <span>SYSTEM CALIBRATION NETWORK</span>
          <span>||||||||||||||||||||</span>
        </div>
        <div className="absolute -bottom-1 left-10 right-10 h-[2px] flex justify-between text-[6px] text-slate-600/40">
          <span>||||||||||||||||||||</span>
          <span>AI-DEEPLER ARCHITECTURE</span>
          <span>||||||||||||||||||||</span>
        </div>

        {/* Side Ruler / Scale Ticks */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[5px] flex flex-col justify-between text-[6px] text-slate-600/30">
          <span>- 80%</span>
          <span>- 60%</span>
          <span>- 40%</span>
          <span>- 20%</span>
        </div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-[5px] flex flex-col justify-between text-[6px] text-slate-600/30 text-right">
          <span>100% -</span>
          <span>75% -</span>
          <span>50% -</span>
          <span>25% -</span>
        </div>
      </div>

      {/* 4. Top Left Readout: System Status */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 flex flex-col gap-1 text-[10px] text-accent-cyan">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="font-bold tracking-wider">[SYS.STATUS : ONLINE]</span>
        </div>
        <div className="text-slate-500 text-[8px] pl-4 uppercase font-medium">
          COORDS: 11.0154° N, 77.7172° E
        </div>
        <div className="text-slate-500 text-[8px] pl-4 uppercase font-medium">
          NODE: YEGA_OS_V1.8
        </div>
      </div>

      {/* 5. Top Right Readout: AI Model Info */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 flex flex-col gap-1 text-[10px] text-accent-purple text-right items-end">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider">[AI MODEL : ACTIVE]</span>
          <span className="w-2 h-2 rounded-full bg-accent-purple animate-ping" />
        </div>
        <div className="text-slate-500 text-[8px] pr-4 uppercase font-medium">
          CLOCK: 4.80 GHz // {timeStr || '16:00:00'}
        </div>
        <div className="text-slate-500 text-[8px] pr-4 uppercase font-medium">
          NLP.KERNELS: LOADING...
        </div>
      </div>

      {/* 6. Bottom Left Readout: Hardware Load */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex flex-col gap-1 text-[10px] text-accent-blue">
        <div className="font-bold tracking-wider">
          [GPU.LOAD : {gpuLoad}%]
        </div>
        <div className="text-slate-500 text-[8px] uppercase font-medium">
          CORE.TEMP: {coreTemp}°C // VOLTAGE: 1.18V
        </div>
        <div className="text-slate-500 text-[8px] uppercase font-medium">
          VRAM: 8.4GB / 12.0GB (70%)
        </div>
      </div>

      {/* 7. Bottom Right Readout: Connection Status */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex flex-col gap-1 text-[10px] text-accent-cyan text-right items-end">
        <div className="font-bold tracking-wider flex items-center gap-1.5 justify-end">
          [NETWORK : STABLE]
          <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        </div>
        <div className="text-slate-500 text-[8px] pr-0 uppercase font-medium">
          LATENCY: {ping}ms // LOSS: 0.0%
        </div>
        <div className="text-slate-500 text-[8px] pr-0 uppercase font-medium flex items-center gap-1">
          SECURE_SSL: TRUE <span className="w-1 h-2 bg-accent-cyan/80 animate-pulse" />
        </div>
      </div>

      {/* 8. Target Crosshair Indicators in Viewport Centers (Jarvis HUD style) */}
      <div className="absolute top-1/2 left-6 md:left-12 w-8 h-[1px] bg-slate-500/20 -translate-y-1/2" />
      <div className="absolute top-1/2 right-6 md:right-12 w-8 h-[1px] bg-slate-500/20 -translate-y-1/2" />
      <div className="absolute left-1/2 top-6 md:top-12 h-8 w-[1px] bg-slate-500/20 -translate-x-1/2" />
      <div className="absolute left-1/2 bottom-6 md:bottom-12 h-8 w-[1px] bg-slate-500/20 -translate-x-1/2" />

    </div>
  );
}
