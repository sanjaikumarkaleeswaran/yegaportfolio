import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, CheckCircle2, AlertCircle, Wifi, ShieldAlert } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import portfolioData from '../data/portfolio.json';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [activeField, setActiveField] = useState<'name' | 'email' | 'message' | null>(null);
  
  // CLI States
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Initializing secure handshake protocol...',
    'Establishing SSH tunnel to mail.yega.io:465...',
    'Cipher suite negotiated: ECDHE-RSA-AES256-GCM-SHA384',
    'Connection verified. OS.Status: ready for inputs.',
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, activeField]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: 'name' | 'email' | 'message') => {
    setActiveField(field);
    setTerminalLogs((prev) => [
      ...prev,
      `> Input stream activated for descriptor: [${field.toUpperCase()}]`,
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setTerminalLogs((prev) => [
      ...prev,
      `> Transmitting payload to dharanidharana18@gmail.com...`,
      `> COMPRESSING DATA PACKETS...`,
    ]);

    // Simulate upload percentage ticking
    const interval = setInterval(() => {
      setUploadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    // Simulate completion
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTerminalLogs((prev) => [
        ...prev,
        `> Handshake successfully completed.`,
        `> Payload checksum match: OK`,
        `> Transmission status: DELIVERED (200 OK)`,
      ]);
    }, 1500);
  };

  const resetTerminal = () => {
    setForm({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    setUploadPercent(0);
    setActiveField(null);
    setTerminalLogs([
      'Initializing secure handshake protocol...',
      'Establishing SSH tunnel to mail.yega.io:465...',
      'Cipher suite negotiated: ECDHE-RSA-AES256-GCM-SHA384',
      'Connection verified. OS.Status: ready for inputs.',
    ]);
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Background neon glows */}
      <div className="absolute right-10 bottom-1/4 w-[320px] h-[320px] bg-accent-blue/5 rounded-full blur-[140px] -z-10 bg-glow-pulse" />
      <div className="absolute left-10 top-1/3 w-[260px] h-[260px] bg-accent-purple/5 rounded-full blur-[120px] -z-10 bg-glow-pulse" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-widest font-orbitron text-accent-cyan mb-2"
        >
          System.Handshake()
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-5xl font-bold font-display text-white text-glow-cyan"
        >
          Establish Secure Link
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Column: Connection Status Logs */}
        <div className="lg:col-span-5">
          <GlassCard
            enableTilt={true}
            tiltStrength={6}
            glowColor="rgba(139, 92, 246, 0.1)"
            className="p-6 border border-slate-800/80 bg-slate-950/20 backdrop-blur-md h-full flex flex-col justify-between"
          >
            <div className="w-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-purple">
                  <Terminal size={14} />
                  <span>SECURE_LINK.SH</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-mono font-bold">
                  <Wifi size={12} className="animate-pulse" />
                  <span>SYS: ONLINE</span>
                </div>
              </div>

              {/* Terminal Logs Stack */}
              <div className="flex flex-col gap-3 font-mono text-[10px] md:text-xs text-slate-400 text-left bg-slate-950/60 p-4 rounded-xl border border-slate-900 min-h-[220px] max-h-[300px] overflow-y-auto custom-scrollbar">
                {terminalLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={log.startsWith('>') ? 'text-accent-cyan' : ''}
                  >
                    {log}
                  </motion.div>
                ))}

                {/* Show uploading percent in terminal */}
                {isSubmitting && (
                  <div className="text-yellow-400">
                    &gt; PACKETING TRANSMISSION CORE [{uploadPercent}%]
                  </div>
                )}

                {activeField && (
                  <div className="text-slate-500 italic">
                    &gt; User is keying in: [${activeField}]...
                  </div>
                )}
                
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Base Readout */}
            <div className="bg-slate-900/40 border border-slate-800/30 p-3 rounded-lg text-[10px] text-slate-500 font-mono text-left flex gap-2 items-center mt-6">
              <ShieldAlert size={14} className="text-accent-cyan" />
              <span>TLS handshake encryption key: 2048-BIT-RSA</span>
            </div>

          </GlassCard>
        </div>

        {/* Right Column: command CLI console form */}
        <div className="lg:col-span-7">
          <GlassCard
            enableTilt={true}
            tiltStrength={4}
            glowColor="rgba(34, 211, 238, 0.12)"
            className="p-6 md:p-8 border border-slate-800/80 bg-slate-950/20 backdrop-blur-md h-full flex flex-col justify-center relative min-h-[380px]"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-10 flex flex-col items-center gap-5 justify-center h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <CheckCircle2 size={32} className="animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-2">
                      Handshake Established!
                    </h3>
                    <p className="text-slate-400 font-light text-sm max-w-sm mx-auto">
                      Your message payload has been successfully transmitted. I will respond to your coordinates shortly.
                    </p>
                  </div>
                  
                  <button
                    onClick={resetTerminal}
                    className="mt-4 border border-accent-cyan/30 text-accent-cyan font-mono text-xs uppercase px-5 py-2.5 rounded hover:bg-accent-cyan/10 transition-all duration-300"
                  >
                    &gt; Restart Console link
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-6 text-left w-full">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800/60 mb-2">
                    <Terminal size={16} className="text-accent-cyan" />
                    <h3 className="text-base font-bold font-orbitron tracking-widest text-white uppercase">
                      guest@yega-os:~$ initiate_transmission
                    </h3>
                  </div>

                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono font-bold text-accent-purple tracking-widest uppercase">
                      [01] enter_identifier: (name)
                    </label>
                    <div className="relative flex items-center bg-slate-950/80 border border-slate-800/80 focus-within:border-accent-cyan/60 rounded px-4 py-3">
                      <span className="text-slate-600 font-mono text-xs mr-2 shrink-0">&gt;</span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                        placeholder="Key in your identifier"
                        className="w-full bg-transparent text-slate-200 text-xs font-mono font-light outline-none"
                      />
                      {activeField === 'name' && (
                        <span className="absolute right-4 w-1.5 h-3 bg-accent-cyan animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-mono font-bold text-accent-purple tracking-widest uppercase">
                      [02] enter_contact_matrix: (email)
                    </label>
                    <div className="relative flex items-center bg-slate-950/80 border border-slate-800/80 focus-within:border-accent-cyan/60 rounded px-4 py-3">
                      <span className="text-slate-600 font-mono text-xs mr-2 shrink-0">&gt;</span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('email')}
                        placeholder="Key in your email coordinates"
                        className="w-full bg-transparent text-slate-200 text-xs font-mono font-light outline-none"
                      />
                      {activeField === 'email' && (
                        <span className="absolute right-4 w-1.5 h-3 bg-accent-cyan animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[10px] font-mono font-bold text-accent-purple tracking-widest uppercase">
                      [03] enter_core_message: (message)
                    </label>
                    <div className="relative flex items-start bg-slate-950/80 border border-slate-800/80 focus-within:border-accent-cyan/60 rounded px-4 py-3">
                      <span className="text-slate-600 font-mono text-xs mr-2 mt-0.5 shrink-0">&gt;</span>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('message')}
                        placeholder="Write your transmission"
                        className="w-full bg-transparent text-slate-200 text-xs font-mono font-light outline-none resize-none"
                      />
                      {activeField === 'message' && (
                        <span className="absolute right-4 bottom-4 w-1.5 h-3 bg-accent-cyan animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Submit Command */}
                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white py-3.5 px-6 rounded text-xs font-bold uppercase tracking-wider font-orbitron hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 disabled:opacity-55"
                    >
                      {isSubmitting ? (
                        <>
                          <AlertCircle size={14} className="animate-spin" />
                          <span>TRANSMITTING CORE DATA [{uploadPercent}%]</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>SEND_TRANSMISSION.SH</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

      </div>

    </section>
  );
}
