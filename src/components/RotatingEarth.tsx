import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function EarthMesh() {
  const earthRef = useRef<THREE.Mesh>(null);
  const orbitsRef = useRef<THREE.Group>(null);
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
    const elapsed = state.clock.getElapsedTime();
    
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsed * 0.15;
      
      // Mouse sway
      earthRef.current.rotation.x = Math.sin(elapsed * 0.2) * 0.1 + mouse.y * 0.3;
      earthRef.current.rotation.y += mouse.x * 0.3;
    }

    if (orbitsRef.current) {
      orbitsRef.current.rotation.y = -elapsed * 0.08;
      orbitsRef.current.rotation.x = elapsed * 0.04;
    }
  });

  return (
    <group>
      {/* Earth Wireframe Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshPhysicalMaterial
          wireframe
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Earth Solid Core with glow */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshPhysicalMaterial
          color="#030712"
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbit Rings & Satellites */}
      <group ref={orbitsRef}>
        {/* Outer Orbit Line */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[2.2, 2.22, 64]} />
          <meshBasicMaterial color="#22d3ee" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
        
        {/* Secondary Orbit Line */}
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <ringGeometry args={[2.5, 2.52, 64]} />
          <meshBasicMaterial color="#8b5cf6" side={THREE.DoubleSide} transparent opacity={0.25} />
        </mesh>

        {/* Orbit Node/Satellite A */}
        <mesh position={[2.2, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>

        {/* Orbit Node/Satellite B */}
        <mesh position={[-1.76, 1.76, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
      </group>
    </group>
  );
}

export default function RotatingEarth() {
  return (
    <div className="relative w-full h-[280px] md:h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#8b5cf6" />
        
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <EarthMesh />
        </Float>
      </Canvas>
    </div>
  );
}
