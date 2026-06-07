"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 1200 }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, [count]);

  // Set initial position attribute once
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [positions]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i * 0.1) * 0.0008;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry />
      <pointsMaterial size={0.04} color="#4f8cf7" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function FloatingShapes() {
  const shapes = useMemo(() => {
    const arr = [];
    const colors = ['#0065AC', '#4f8cf7', '#34d399', '#818cf8', '#f472b6'];
    for (let i = 0; i < 10; i++) {
      arr.push({
        pos: [(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6 - 2],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.4 + 0.2,
        color: colors[i % colors.length],
        type: i % 4,
        speed: 0.3 + Math.random() * 1.2,
        floatIntensity: 0.3 + Math.random() * 0.4,
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.2} floatIntensity={s.floatIntensity} position={s.pos as [number, number, number]}>
          <mesh scale={s.scale}>
            {s.type === 0 ? <icosahedronGeometry args={[0.6, 0]} /> :
             s.type === 1 ? <octahedronGeometry args={[0.6, 0]} /> :
             s.type === 2 ? <torusGeometry args={[0.5, 0.15, 8, 12]} /> :
             <dodecahedronGeometry args={[0.5, 0]} />}
            <MeshDistortMaterial color={s.color} transparent opacity={0.12} distort={0.3} speed={1.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.rotation.y += 0.002;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={2.5}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial color="#0065AC" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export default function HeroThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#0065AC" />
      <WireframeGlobe />
      <FloatingShapes />
      <Particles count={1200} />
    </Canvas>
  );
}
