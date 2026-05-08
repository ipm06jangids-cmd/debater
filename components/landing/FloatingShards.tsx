"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Shard({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.4 + mouse.x * 0.4;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
    ref.current.position.x = position[0] + mouse.x * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.3}
        roughness={0.15}
        transmission={0.7}
        thickness={1.5}
        ior={1.4}
        emissive={color}
        emissiveIntensity={0.25}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#7DF9FF" />
      <pointLight position={[-5, -3, 4]} intensity={0.8} color="#D4AF37" />
      <Shard position={[-3.2, 1.2, -2]} scale={0.55} speed={0.3} color="#7DF9FF" />
      <Shard position={[3.4, -0.6, -1]} scale={0.42} speed={0.45} color="#D4AF37" />
      <Shard position={[1.2, 1.8, -3]} scale={0.32} speed={0.55} color="#8B6BFF" />
      <Shard position={[-2.0, -1.4, -2.5]} scale={0.28} speed={0.6} color="#7DF9FF" />
    </>
  );
}

export function FloatingShards() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) setEnabled(false);
  }, []);

  if (reduced || !enabled) return null;

  return (
    <div className="absolute inset-0 -z-[5] pointer-events-none">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
