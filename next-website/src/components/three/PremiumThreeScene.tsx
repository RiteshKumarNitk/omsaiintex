"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 2000 }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      size[i] = Math.random() * 0.1 + 0.02;
    }
    return size;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
      
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      meshRef.current.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    }
  }, [positions, sizes]);

  return (
    <points ref={meshRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.05}
        color="#4f8cf7"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingGeometries() {
  const geometries = useMemo(() => {
    const geo = [];
    const colors = ['#4f8cf7', '#34d399', '#818cf8', '#f472b6', '#60a5fa'];
    for (let i = 0; i < 12; i++) {
      geo.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5 - 3
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.5 + 0.3,
        color: colors[i % colors.length],
        type: i % 3,
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    return geo;
  }, []);

  return (
    <group>
      {geometries.map((geo, i) => (
        <Float
          key={i}
          speed={geo.speed}
          rotationIntensity={0.3}
          floatIntensity={0.5}
          position={geo.position as [number, number, number]}
        >
          <mesh scale={geo.scale}>
            {geo.type === 0 ? (
              <icosahedronGeometry args={[0.5, 0]} />
            ) : geo.type === 1 ? (
              <octahedronGeometry args={[0.5, 0]} />
            ) : (
              <torusGeometry args={[0.4, 0.15, 8, 12]} />
            )}
            <MeshDistortMaterial
              color={geo.color}
              transparent
              opacity={0.15}
              distort={0.2}
              speed={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function PremiumThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#4f8cf7" />
        
        <ParticleField count={2500} />
        <FloatingGeometries />
      </Canvas>
    </div>
  );
}
