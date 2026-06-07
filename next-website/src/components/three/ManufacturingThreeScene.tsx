'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

/** Image plane that reacts to mouse position */
function ImagePlane({ texture }: { texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const { x, y } = mouseRef.current;
    // Smooth parallax tilt
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.03,
      0.05,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.02,
      0.05,
    );
    // Subtle position shift for parallax depth
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      x * 0.15,
      0.05,
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      y * 0.08,
      0.05,
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width * 1.15, viewport.height * 1.15]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/** Floating light particles */
function FloatingParticles({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const arr = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.4 + i * 0.7) * 0.002;
      arr[i3] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.5) * 0.001;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      );
    }
  }, [positions]);

  return (
    <points ref={meshRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Gentle ambient light sweep */
function LightSweep() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    lightRef.current.position.x = Math.sin(t * 0.3) * 6;
    lightRef.current.position.y = Math.cos(t * 0.2) * 3;
    lightRef.current.intensity = 0.6 + Math.sin(t * 0.5) * 0.2;
  });

  return <pointLight ref={lightRef} position={[0, 2, 4]} color="#4f8cf7" distance={14} decay={2} />;
}

function Scene({ texture }: { texture: THREE.Texture }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 5]} intensity={0.3} />
      <LightSweep />
      <ImagePlane texture={texture} />
      <FloatingParticles />
    </>
  );
}

export default function ManufacturingThreeScene() {
  const texture = useLoader(THREE.TextureLoader, '/assets/images/2023/06/manufacturing-unit.jpg');

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Scene texture={texture} />
      </Canvas>
    </div>
  );
}
