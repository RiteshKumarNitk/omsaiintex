"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

function MouseReactiveLights() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = pointer.x * 5;
      lightRef.current.position.y = pointer.y * 3 + 2;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 2, 3]}
      intensity={2}
      color="#4f8cf7"
      distance={10}
    />
  );
}

function FloatingInteriorElements() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const elements = useMemo(() => [
    { pos: [-2, 1, 0], color: '#4f8cf7', size: 0.8 },
    { pos: [2, -1, -1], color: '#34d399', size: 0.6 },
    { pos: [0, 2, -2], color: '#818cf8', size: 0.5 },
    { pos: [-1.5, -1.5, 1], color: '#f472b6', size: 0.4 },
    { pos: [3, 0.5, -1.5], color: '#60a5fa', size: 0.7 },
  ], []);

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={1} position={el.pos as [number, number, number]}>
          <mesh scale={el.size}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <MeshDistortMaterial
              color={el.color}
              transparent
              opacity={0.12}
              distort={0.3}
              speed={2}
              wireframe
            />
          </mesh>
          <mesh scale={el.size * 0.7}>
            <icosahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color={el.color}
              transparent
              opacity={0.08}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[20, 30, '#4f8cf7', '#1a1a2e']}
      position={[0, -2.5, -2]}
    />
  );
}

export default function RoomVisualizer() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 4]} intensity={0.3} />
        <MouseReactiveLights />
        <FloatingInteriorElements />
        <GridFloor />
      </Canvas>
    </div>
  );
}
