import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function CubeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const rotationSpeed = useRef(0.2);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = state.clock.getElapsedTime();

    // Gradually speed up rotation if hovered, otherwise decelerate back to baseline
    if (hovered) {
      rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 1.8, 0.05);
    } else {
      rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 0.2, 0.05);
    }

    meshRef.current.rotation.y += rotationSpeed.current * 0.05;
    meshRef.current.rotation.x += rotationSpeed.current * 0.03;
    meshRef.current.rotation.z = Math.sin(elapsed * 0.5) * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2.2, 2.2, 2.2]} />
      {/* Outer Wireframe Face */}
      <meshPhysicalMaterial
        wireframe
        color={hovered ? '#22d3ee' : '#10b981'}
        emissive={hovered ? '#22d3ee' : '#10b981'}
        emissiveIntensity={1.2}
        transparent
        opacity={0.8}
      />
      {/* Inner solid core */}
      <mesh>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.9}
          transmission={0.6}
          thickness={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </mesh>
  );
}

export default function GithubCube() {
  return (
    <div className="relative w-full h-[250px] md:h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color="#10b981" />
        
        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <CubeMesh />
        </Float>
      </Canvas>

      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-md px-3 py-1 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-mono pointer-events-none select-none">
        HOVER TO SPIN CUBE
      </div>
    </div>
  );
}
