import React, { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableGlow?: boolean;
  tiltStrength?: number;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = '',
  enableTilt = true,
  enableGlow = true,
  tiltStrength = 10,
  glowColor = 'rgba(59, 130, 246, 0.12)', // Default blue glow
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate relative to card
    const y = e.clientY - rect.top; // y coordinate relative to card

    // Glow position
    if (enableGlow) {
      setGlowPos({ x, y });
    }

    // 3D Tilt calculation
    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Calculate normal offset (-1 to 1)
      const offsetX = (x - centerX) / centerX;
      const offsetY = (y - centerY) / centerY;

      // Rotation angles: moving mouse right rotates card around Y, moving mouse down rotates card around X
      setRotateX(-offsetY * tiltStrength);
      setRotateY(offsetX * tiltStrength);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-card relative overflow-hidden rounded-2xl p-6 ${className}`}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        z: isHovered ? 20 : 0,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
    >
      {/* Dynamic Radial Spotlight Glow */}
      {enableGlow && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      
      {/* Content wrapper to preserve 3D layering */}
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}
