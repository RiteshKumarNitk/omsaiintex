'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/** A single floating image plane with slow rotation and bob */
function FloatingImage({
  texture,
  position,
  rotation,
  scale,
  speed,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number];
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = initialY + Math.sin(t * speed * 0.5) * 0.15;
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * speed * 0.3) * 0.08;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * speed * 0.25) * 0.04;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={scale} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Ambient floating particles */
function FloatingParticles({ count = 60 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return pos;
  }, [count]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      );
    }
  }, [positions]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i * 0.7) * 0.001;
      arr[i3] += Math.cos(state.clock.elapsedTime * 0.2 + i * 0.5) * 0.0008;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.04}
        color="#4f8cf7"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  const [tex1, tex2, tex3] = useTexture([
    '/assets/custom/office_sketch.png',
    '/assets/images/2023/05/project-banner-1.png',
    '/assets/images/2023/05/project-banner-2.png',
  ]);

  const layouts = useMemo(
    () => [
      { pos: [-4.5, 1.2, -2] as [number, number, number], rot: [0, 0.3, -0.05] as [number, number, number], scale: [3.2, 4.2] as [number, number], speed: 0.8 },
      { pos: [0, -0.5, -3] as [number, number, number], rot: [0, -0.1, 0.02] as [number, number, number], scale: [2.0, 2.7] as [number, number], speed: 1.0 },
      { pos: [4.8, 0.8, -2.5] as [number, number, number], rot: [0, -0.25, 0.04] as [number, number, number], scale: [2.8, 3.8] as [number, number], speed: 0.7 },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 5]} intensity={0.3} />
      <FloatingImage texture={tex1} position={layouts[0].pos} rotation={layouts[0].rot} scale={layouts[0].scale} speed={layouts[0].speed} />
      <FloatingImage texture={tex2} position={layouts[1].pos} rotation={layouts[1].rot} scale={layouts[1].scale} speed={layouts[1].speed} />
      <FloatingImage texture={tex3} position={layouts[2].pos} rotation={layouts[2].rot} scale={layouts[2].scale} speed={layouts[2].speed} />
      <FloatingParticles />
    </>
  );
}

export default function ProjectsThreeScene() {
  return (
    <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
