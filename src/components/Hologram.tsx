import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function HologramMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particleGroupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-1 to 1)
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Auto rotation
      meshRef.current.rotation.y = elapsed * 0.25;
      meshRef.current.rotation.x = elapsed * 0.15;
      
      // Morph scale slightly to feel organic/liquid
      const scaleMultiplier = Math.sin(elapsed * 2) * 0.05 + 1.0;
      meshRef.current.scale.set(
        1.8 * scaleMultiplier, 
        1.8 * scaleMultiplier, 
        1.8 * scaleMultiplier
      );

      // Mouse tilt reaction
      const targetRX = mouse.y * 0.4;
      const targetRY = mouse.x * 0.4;
      meshRef.current.rotation.x += (targetRX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRY - meshRef.current.rotation.y) * 0.05;
    }

    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = -elapsed * 0.15;
      particleGroupRef.current.rotation.z = elapsed * 0.05;
      
      // Orbiting height shift
      particleGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.15;
    }
  });

  // Create a points array for the halo particles
  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 3.5 + Math.random() * 1.2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  return (
    <group>
      {/* Core Hologram Shape */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 120, 16]} />
        <meshPhysicalMaterial
          wireframe
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Orbiting Particles Halo */}
      <points ref={particleGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#8b5cf6"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function Hologram() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-[350px] md:h-[500px]">
      {/* Interactive Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#8b5cf6" />
        <directionalLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <HologramMesh />
        </Float>
        
        {/* Allows manual rotation on desktop if desired, but doesn't lock scroll */}
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/1.8} minPolarAngle={Math.PI/2.5} />}
      </Canvas>

      {/* Futuristic Holographic Ring Overlays in 2D CSS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] border border-accent-cyan/10 rounded-full animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] border border-dashed border-accent-purple/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
        <div className="absolute w-[160px] h-[160px] md:w-[220px] md:h-[220px] border border-accent-blue/15 rounded-full" />
      </div>
    </div>
  );
}
