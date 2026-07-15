import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '../data/portfolio.json';

// Hologram Shader Code for the Circular Image Plane
const HologramImageShader = {
  uniforms: {
    uTexture: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uColorCyan: { value: new THREE.Color('#22d3ee') },
    uColorPurple: { value: new THREE.Color('#8b5cf6') },
    uGlitch: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vec3 pos = position;
      // Organic holographic waving/wobble
      pos.z += sin(uv.y * 6.0 + uTime * 1.5) * 0.04;
      pos.x += cos(uv.x * 4.0 + uTime * 1.0) * 0.02;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec3 uColorCyan;
    uniform vec3 uColorPurple;
    uniform float uGlitch;
    
    void main() {
      // Circular Mask
      float dist = distance(vUv, vec2(0.5));
      if (dist > 0.5) {
        discard;
      }
      
      // Neon Cyber Ring Border
      if (dist > 0.482 && dist <= 0.5) {
        vec3 borderColor = mix(uColorCyan, uColorPurple, sin(uTime * 2.0) * 0.5 + 0.5);
        gl_FragColor = vec4(borderColor * 1.8, 1.0);
        return;
      }
      
      // Sample the texture
      vec4 texColor = texture2D(uTexture, vUv);
      
      // Calculate brightness for transparency and masking
      float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
      
      // Scanlines movement
      float scanline = sin(vUv.y * 140.0 - uTime * 8.0) * 0.12 + 0.88;
      
      // Cyberpunk cyan/purple styling overlay
      vec3 neonOverlay = mix(uColorCyan, uColorPurple, vUv.y);
      vec3 finalColor = mix(texColor.rgb, neonOverlay, 0.4) * 1.6 * scanline;
      
      // Random glitch flashes
      if (uGlitch > 0.97) {
        finalColor += vec3(0.4);
      }
      
      // Soften edges slightly
      float alpha = smoothstep(0.5, 0.38, dist) * 0.85;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

// Hologram Shader Code for the 3D Particle Cloud
const HologramParticlesShader = {
  uniforms: {
    uTexture: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uColorCyan: { value: new THREE.Color('#22d3ee') },
    uColorPurple: { value: new THREE.Color('#8b5cf6') },
    uDisplacement: { value: 0.5 },
    uGlitch: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vBrightness;
    varying vec3 vPos;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uDisplacement;
    
    void main() {
      vUv = uv;
      
      // Sample texture for displacement depth
      vec4 texColor = texture2D(uTexture, uv);
      float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
      vBrightness = brightness;
      
      vec3 pos = position;
      
      // 3D face relief extrusion based on image brightness
      pos.z += brightness * uDisplacement;
      
      // Wavy transmission perturbation
      pos.z += sin(uv.y * 10.0 + uTime * 2.0) * 0.05;
      pos.x += cos(uv.x * 8.0 + uTime * 1.5) * 0.02;
      
      vPos = pos;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation based on depth and brightness
      gl_PointSize = (16.0 / -mvPosition.z) * (0.7 + brightness * 0.8);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vBrightness;
    varying vec3 vPos;
    uniform float uTime;
    uniform vec3 uColorCyan;
    uniform vec3 uColorPurple;
    uniform float uGlitch;
    
    void main() {
      // Make particles perfectly circular
      vec2 circ = gl_PointCoord - vec2(0.5);
      if (dot(circ, circ) > 0.25) {
        discard;
      }
      
      // Circular Mask (discard particles outside the main circle radius)
      float dist = distance(vUv, vec2(0.5));
      if (dist > 0.5) {
        discard;
      }

      // Background subtraction (remove black/very dark pixels from point cloud)
      if (vBrightness < 0.12) {
        discard;
      }
      
      // Cyberpunk dual color gradient based on particle height & UV
      vec3 finalColor = mix(uColorCyan, uColorPurple, vUv.y + vPos.z * 0.5);
      
      // Glitch white flash
      if (uGlitch > 0.97) {
        finalColor = vec3(1.0);
      }
      
      // Scanline overlay
      float scanline = sin(gl_FragCoord.y * 0.4 + uTime * 14.0) * 0.18 + 0.82;
      
      gl_FragColor = vec4(finalColor * 2.2 * scanline, vBrightness * 0.9);
    }
  `
};

interface HologramSceneProps {
  mouse: { x: number; y: number };
}

function HologramScene({ mouse }: HologramSceneProps) {
  const meshRef = useRef<THREE.Group>(null);
  const particleGroupRef = useRef<THREE.Group>(null);
  const imageMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const particlesMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Load the profile avatar texture
  const texture = useTexture('/profile_avatar.png');

  // Initialize shader uniforms
  const imageUniforms = useMemo(() => {
    const uniforms = THREE.UniformsUtils.clone(HologramImageShader.uniforms);
    uniforms.uTexture.value = texture;
    return uniforms;
  }, [texture]);

  const particlesUniforms = useMemo(() => {
    const uniforms = THREE.UniformsUtils.clone(HologramParticlesShader.uniforms);
    uniforms.uTexture.value = texture;
    return uniforms;
  }, [texture]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const glitchVal = Math.random();

    // Update uniform times & glitch triggers
    if (imageMaterialRef.current) {
      imageMaterialRef.current.uniforms.uTime.value = elapsed;
      imageMaterialRef.current.uniforms.uGlitch.value = glitchVal;
    }
    if (particlesMaterialRef.current) {
      particlesMaterialRef.current.uniforms.uTime.value = elapsed;
      particlesMaterialRef.current.uniforms.uGlitch.value = glitchVal;
    }

    if (meshRef.current) {
      // Rotation and float animation
      meshRef.current.rotation.y = elapsed * 0.15;
      
      // Mouse tilt reaction
      const targetRX = mouse.y * 0.35;
      const targetRY = mouse.x * 0.35;
      meshRef.current.rotation.x += (targetRX - meshRef.current.rotation.x) * 0.08;
      meshRef.current.rotation.y += (targetRY - meshRef.current.rotation.y) * 0.08;

      // Small hover/float
      meshRef.current.position.y = Math.sin(elapsed * 1.2) * 0.08;
    }

    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = -elapsed * 0.1;
      particleGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.1;
    }
  });

  // Halo points around the hologram
  const haloParticleCount = 120;
  const haloPositions = useMemo(() => {
    const positions = new Float32Array(haloParticleCount * 3);
    for (let i = 0; i < haloParticleCount; i++) {
      const angle = (i / haloParticleCount) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 0.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  return (
    <group ref={meshRef}>
      {/* 3D Light Projection Cone (From bottom to avatar center) */}
      <mesh position={[0, -1.8, -0.2]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 0.02, 3.2, 32, 1, true]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.05}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Holographic Face Image Mesh (Circular) */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <shaderMaterial
          ref={imageMaterialRef}
          vertexShader={HologramImageShader.vertexShader}
          fragmentShader={HologramImageShader.fragmentShader}
          uniforms={imageUniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3D Particle Cloud Extruded Face */}
      <points position={[0, 0, 0.02]}>
        <planeGeometry args={[3, 3, 100, 100]} />
        <shaderMaterial
          ref={particlesMaterialRef}
          vertexShader={HologramParticlesShader.vertexShader}
          fragmentShader={HologramParticlesShader.fragmentShader}
          uniforms={particlesUniforms}
          transparent
          depthWrite={false}
        />
      </points>

      {/* Inner Glowing Core Mesh */}
      <mesh position={[0, 0, -0.1]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Orbiting Halo Particles */}
      <points ref={particleGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[haloPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#22d3ee"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Inline fallback loader component for React Suspense inside Three.js
function LoadingCore() {
  const sphereRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 2.0;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

export default function Hologram() {
  const [isMobile, setIsMobile] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-1 to 1) relative to screen center
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Text circles parameters
  const systemName = portfolioData.personal.name.toUpperCase();
  const systemTitle = "SOFTWARE ENGINEER // AI ENGINEER";

  return (
    <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center">
      
      {/* Rotating Cyberpunk HUD Text Rings (SVG overlay, matching Image 1) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20">
        
        {/* Outer Circular Name & Title Text Path */}
        <svg 
          className="absolute w-[290px] h-[290px] md:w-[390px] md:h-[390px] animate-[spin_32s_linear_infinite] drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]" 
          viewBox="0 0 100 100"
        >
          <path 
            id="circleTextPath" 
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
            fill="none" 
          />
          <text className="fill-accent-cyan/70 font-orbitron text-[3.8px] font-bold tracking-[0.2em]">
            <textPath href="#circleTextPath" startOffset="0%">
              {systemName} // {systemTitle} // {systemName} // {systemTitle} //
            </textPath>
          </text>
        </svg>

        {/* Concentric Decorative Rings */}
        <div className="absolute w-[330px] h-[330px] md:w-[440px] md:h-[440px] border border-accent-cyan/15 rounded-full" />
        <div className="absolute w-[324px] h-[324px] md:w-[432px] md:h-[432px] border border-dashed border-accent-cyan/10 rounded-full animate-[spin_60s_linear_infinite]" />
        
        <div className="absolute w-[250px] h-[250px] md:w-[330px] md:h-[330px] border border-dashed border-accent-purple/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
        <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] border border-accent-purple/10 rounded-full" />
        
        {/* Sci-Fi HUD Corners / Brackets Overlay */}
        <div className="absolute w-[210px] h-[210px] md:w-[280px] md:h-[280px] flex justify-between items-between pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-cyan/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-cyan/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-cyan/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-cyan/40" />
        </div>

        {/* Hologram State Status Readouts */}
        <div className="absolute bottom-4 left-6 md:left-12 font-mono text-[9px] text-accent-cyan/50 flex flex-col gap-1 tracking-wider uppercase">
          <div>[SYS.LOAD: OK]</div>
          <div>[RESOLUTION: 3D.PARTICLES]</div>
        </div>

        <div className="absolute top-4 right-6 md:right-12 font-mono text-[9px] text-accent-purple/50 flex flex-col gap-1 tracking-wider uppercase text-right">
          <div>[LOC: {portfolioData.personal.location}]</div>
          <div>[BEAM.STATUS: TRANSMITTING]</div>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] z-10">
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={2.2} color="#22d3ee" />
          <pointLight position={[-5, -5, -5]} intensity={1.8} color="#8b5cf6" />
          <directionalLight position={[0, 4, 0]} intensity={1.2} color="#ffffff" />
          
          <Suspense fallback={<LoadingCore />}>
            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
              <HologramScene mouse={mouse} />
            </Float>
          </Suspense>

          {!isMobile && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              maxPolarAngle={Math.PI / 1.7} 
              minPolarAngle={Math.PI / 2.3} 
            />
          )}
        </Canvas>
      </div>

    </div>
  );
}
