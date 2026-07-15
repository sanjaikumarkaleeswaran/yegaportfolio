import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MagneticButton from '../components/MagneticButton';
import portfolioData from '../data/portfolio.json';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute right-10 bottom-1/4 w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[140px] -z-10 bg-glow-pulse" />
      <div className="absolute left-10 top-1/3 w-[250px] h-[250px] bg-accent-purple/5 rounded-full blur-[120px] -z-10 bg-glow-pulse" />

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative z-10">
        
        {/* Left Column: Contact Cards & Map Backdrop */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between relative overflow-hidden rounded-2xl">
          
          {/* Wireframe dot map backdrop inside contact card column */}
          <div className="absolute inset-0 opacity-15 pointer-events-none -z-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-700">
              <pattern id="dotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
              <rect width="100" height="100" fill="url(#dotPattern)" />
              {/* Glowing connection node */}
              <circle cx="50" cy="50" r="2" fill="#22d3ee" className="animate-ping" />
              <circle cx="50" cy="50" r="1" fill="#22d3ee" />
            </svg>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl font-bold font-display text-white text-left mb-2">
              Communication Details
            </h3>
            <p className="text-slate-400 font-light text-left leading-relaxed text-sm md:text-base mb-4">
              Feel free to initiate a connection. I am active and open to discussing full-stack roles, machine learning platforms, or creative project ideas.
            </p>

            {/* Quick Contact Cards */}
            <div className="flex flex-col gap-4">
              <GlassCard enableTilt={false} className="p-4 flex gap-4 items-center text-left border border-slate-800/40">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-cyan">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Email Address</span>
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-sm text-slate-200 hover:text-accent-cyan transition-colors font-medium">
                    {portfolioData.personal.email}
                  </a>
                </div>
              </GlassCard>

              <GlassCard enableTilt={false} className="p-4 flex gap-4 items-center text-left border border-slate-800/40">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-purple">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Phone Number</span>
                  <a href={`tel:${portfolioData.personal.phone}`} className="text-sm text-slate-200 hover:text-accent-purple transition-colors font-medium font-mono">
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </GlassCard>

              <GlassCard enableTilt={false} className="p-4 flex gap-4 items-center text-left border border-slate-800/40">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-blue">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Primary Coordinates</span>
                  <span className="text-sm text-slate-200 font-medium">{portfolioData.personal.location}</span>
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/30 p-4 rounded-xl text-xs text-slate-500 font-mono text-left flex gap-2.5 items-center mt-6">
            <MessageSquareCode size={16} className="text-accent-cyan" />
            <span>Encrypted transmission initialized over SSL/TLS.</span>
          </div>

        </div>

        {/* Right Column: Dynamic Form Panel */}
        <div className="lg:col-span-7">
          <GlassCard
            enableTilt={true}
            tiltStrength={4}
            glowColor="rgba(34, 211, 238, 0.12)"
            className="p-6 md:p-8 border border-slate-800/80 h-full flex flex-col justify-center"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-4 justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle2 size={32} className="animate-bounce" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                  Handshake Established!
                </h3>
                <p className="text-slate-400 font-light max-w-sm">
                  Your message has been successfully transmitted. I will respond to your coordinates shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-2">
                  Transmit Message
                </h3>

                {/* Name Field */}
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 rounded-lg px-4 py-3.5 text-slate-200 text-sm font-light transition-all outline-none"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-light transition-all duration-300 pointer-events-none group-focus-within:-translate-y-9 group-focus-within:text-xs group-focus-within:text-accent-cyan input-not-empty"
                    style={formState.name ? { transform: 'translateY(-2.25rem) scale(0.85)', color: '#22d3ee' } : {}}
                  >
                    IDENTIFIER (YOUR NAME)
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 rounded-lg px-4 py-3.5 text-slate-200 text-sm font-light transition-all outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-light transition-all duration-300 pointer-events-none group-focus-within:-translate-y-9 group-focus-within:text-xs group-focus-within:text-accent-cyan input-not-empty"
                    style={formState.email ? { transform: 'translateY(-2.25rem) scale(0.85)', color: '#22d3ee' } : {}}
                  >
                    CONTACT MATRIX (YOUR EMAIL)
                  </label>
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 rounded-lg px-4 py-3.5 text-slate-200 text-sm font-light transition-all outline-none resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-5 text-slate-500 text-sm font-light transition-all duration-300 pointer-events-none group-focus-within:-translate-y-8 group-focus-within:text-xs group-focus-within:text-accent-cyan input-not-empty"
                    style={formState.message ? { transform: 'translateY(-2.25rem) scale(0.85)', color: '#22d3ee' } : {}}
                  >
                    TRANSMISSION CORE (YOUR MESSAGE)
                  </label>
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                  <MagneticButton range={30} className="w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white py-3.5 px-6 rounded-lg text-sm font-semibold uppercase tracking-wider font-orbitron hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 disabled:opacity-55"
                    >
                      {isSubmitting ? (
                        <>Transmitting...</>
                      ) : (
                        <>
                          <Send size={14} /> Send Transmission
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>

              </form>
            )}
          </GlassCard>
        </div>

      </div>

    </section>
  );
}
