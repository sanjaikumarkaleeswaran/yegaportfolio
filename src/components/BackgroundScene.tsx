import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

// Starfield particles reacting to mouse
function InteractiveParticles({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slow auto-rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;

    // React to mouse
    const targetX = mouse.x * 0.5;
    const targetY = mouse.y * 0.5;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (-targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <group ref={pointsRef}>
      <Stars
        radius={120}
        depth={60}
        count={isMobile ? 800 : 2500}
        factor={6}
        saturation={0.8}
        fade
        speed={1.5}
      />
    </group>
  );
}

// Drifting shapes
function DriftingShapes({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow scroll tracking
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    groupRef.current.position.y = scrollY * 0.005;
  });

  if (isMobile) return null; // Avoid rendering complex geo on mobile backgrounds

  return (
    <group ref={groupRef}>
      {/* Glow Torus Ring */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[-8, 4, -10]}>
        <Torus args={[2, 0.3, 16, 64]}>
          <meshPhysicalMaterial
            wireframe
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </Torus>
      </Float>

      {/* Wireframe Sphere */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={3} position={[9, -6, -12]}>
        <Sphere args={[2.5, 20, 20]}>
          <meshPhysicalMaterial
            wireframe
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
            transparent
            opacity={0.25}
          />
        </Sphere>
      </Float>

      {/* Liquid Glass Cube */}
      <Float speed={2.0} rotationIntensity={1} floatIntensity={1.5} position={[-6, -12, -8]}>
        <Box args={[1.8, 1.8, 1.8]}>
          <meshPhysicalMaterial
            color="#3b82f6"
            roughness={0.1}
            transmission={0.9}
            thickness={1}
            transparent
            opacity={0.3}
            roughness-value={0.05}
          />
        </Box>
      </Float>

      {/* Another Ring */}
      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={2} position={[7, 10, -15]}>
        <Torus args={[3.2, 0.15, 8, 32]}>
          <meshPhysicalMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.2}
          />
        </Torus>
      </Float>
    </group>
  );
}

export default function BackgroundScene() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-bg-dark">
      {/* Background Aurora Gradients & Light Beams */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(34,211,238,0.08),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_20%_650px,rgba(59,130,246,0.08),transparent)]" />
      
      {/* Perspective Grid Floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(75deg) scale(2.0)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        
        <InteractiveParticles isMobile={isMobile} />
        <DriftingShapes isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
