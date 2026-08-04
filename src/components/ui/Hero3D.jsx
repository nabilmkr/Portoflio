/* React Three Fiber 3D Interactive Mesh for Hero Background */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function InteractiveParticles({ count = 80 }) {
  const pointsRef = useRef(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#C5A880"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingMesh() {
  const meshRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer; // Mouse coords (-1 to +1)

    if (meshRef.current) {
      // Rotate mesh & smooth mouse reaction
      meshRef.current.rotation.x = time * 0.15 + y * 0.3;
      meshRef.current.rotation.y = time * 0.2 + x * 0.3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshBasicMaterial
            color="#C5A880"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      <InteractiveParticles count={100} />
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingMesh />
      </Canvas>
    </div>
  );
}
