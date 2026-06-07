"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Mouse-reactive camera that gently follows cursor position
 */
function MouseCamera() {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 1.2, 5));

  useFrame(() => {
    targetPos.current.x = pointer.x * 1.5;
    targetPos.current.y = pointer.y * 1.0 + 1.2;
    camera.position.lerp(targetPos.current, 0.03);
    camera.lookAt(0, 0.5, -1);
  });

  return null;
}

/**
 * Mouse-reactive ambient light that follows cursor
 */
function MouseReactiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = pointer.x * 4;
      lightRef.current.position.y = pointer.y * 3 + 2;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 2, 4]}
      intensity={3}
      color="#4f8cf7"
      distance={12}
      decay={2}
    />
  );
}

/**
 * A single desk with monitor — used inside Workstation groups
 */
function DeskUnit() {
  return (
    <group>
      {/* Desktop surface */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2.0, 0.06, 1.0]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Desk legs — L-shaped frame */}
      {[[-0.9, 0, -0.4], [0.9, 0, -0.4], [-0.9, 0, 0.4], [0.9, 0, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.37, pos[2]]}>
          <boxGeometry args={[0.04, 0.7, 0.04]} />
          <meshStandardMaterial color="#2a2a4a" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
      {/* Monitor */}
      <mesh position={[0, 1.15, -0.35]}>
        <boxGeometry args={[1.0, 0.6, 0.03]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Monitor screen glow */}
      <mesh position={[0, 1.15, -0.33]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshBasicMaterial color="#0065AC" transparent opacity={0.12} />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[0, 0.9, -0.35]}>
        <cylinderGeometry args={[0.03, 0.05, 0.25, 8]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

/**
 * Ergonomic office chair
 */
function ChairUnit() {
  return (
    <group position={[0, 0, 0.85]}>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.45, 0.05, 0.45]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.75, -0.2]}>
        <boxGeometry args={[0.45, 0.5, 0.03]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Chair base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Chair stem */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Complete workstation — a desk + chair pair facing a direction
 */
function Workstation({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <DeskUnit />
      <ChairUnit />
    </group>
  );
}

/**
 * Pod of 4 workstations arranged in a 2×2 cluster (common office layout)
 */
function WorkstationPod({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const deskSpacing = 2.4; // center-to-center desk spacing
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Front row — 2 desks facing away from center */}
      <Workstation position={[-deskSpacing / 2, 0, 0]} rotation={0} />
      <Workstation position={[deskSpacing / 2, 0, 0]} rotation={0} />
      {/* Back row — 2 desks facing toward center (180° rotated) */}
      <Workstation position={[-deskSpacing / 2, 0, -1.8]} rotation={Math.PI} />
      <Workstation position={[deskSpacing / 2, 0, -1.8]} rotation={Math.PI} />
      {/* Low divider between front and back rows */}
      <mesh position={[0, 0.55, -0.9]}>
        <boxGeometry args={[deskSpacing + 0.6, 0.5, 0.06]} />
        <meshStandardMaterial color="#16162a" metalness={0.2} roughness={0.8} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Hanging pendant light — descends from ceiling with cable, conical shade, and warm downlight
 */
function PendantLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const shadeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { camera, pointer } = useThree();
  const currentIntensity = useRef(1.0);
  const targetIntensity = useRef(1.0);
  const _worldPos = useRef(new THREE.Vector3());
  const _screenPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    // Reuse persistent vectors to avoid per-frame allocation
    _worldPos.current.set(position[0], position[1] + 0.95, position[2]);
    _screenPos.current.copy(_worldPos.current).project(camera);
    const dx = _screenPos.current.x - pointer.x;
    const dy = _screenPos.current.y - pointer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Turn on when mouse is near (within ~0.3 screen units), off otherwise
    const isHovered = dist < 0.3;
    targetIntensity.current = isHovered ? 5.0 : 1.0;

    // Smooth lerp toward target
    currentIntensity.current += (targetIntensity.current - currentIntensity.current) * 0.08;

    if (lightRef.current) {
      lightRef.current.intensity = currentIntensity.current + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.05;
    }

    // Glow ring brightness follows light state
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, isHovered ? 0.9 : 0.25, 0.08);
    }

    // Shade emissive glow on hover
    if (shadeRef.current) {
      const mat = shadeRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isHovered ? 1.5 : 0, 0.08);
    }
  });

  return (
    <group position={position}>
      {/* Ceiling mount plate */}
      <mesh position={[0, 3.0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Suspension cable — connects mount to shade top */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 2.0, 4]} />
        <meshStandardMaterial color="#3a3a5a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Pendant shade — inverted cone (narrow top, wide bottom) */}
      <mesh ref={shadeRef} position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.08, 0.22, 0.3, 16, 1, true]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.5}
          roughness={0.5}
          side={THREE.DoubleSide}
          emissive="#f0e6d3"
          emissiveIntensity={0}
        />
      </mesh>
      {/* Shade top cap — closes the open top of the cone */}
      <mesh position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Inner shade glow ring — warm white accent */}
      <mesh ref={glowRef} position={[0, 0.98, 0]}>
        <ringGeometry args={[0.06, 0.2, 16]} />
        <meshBasicMaterial color="#f0e6d3" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Downlight point light — warm white */}
      <pointLight
        ref={lightRef}
        position={[0, 0.95, 0]}
        intensity={1.0}
        color="#f0e6d3"
        distance={4}
        decay={2}
      />
    </group>
  );
}

/**
 * Glass partition wall — transparent panel with edge frame separating workspace zones
 */
function GlassPartition({ position, width = 14 }: { position: [number, number, number]; width?: number }) {
  const panelHeight = 2.2; // typical office glass partition height
  const frameThickness = 0.04;
  const frameDepth = 0.06;

  return (
    <group position={position}>
      {/* Main glass panel — semi-transparent with subtle reflection */}
      <mesh position={[0, panelHeight / 2, 0]}>
        <boxGeometry args={[width, panelHeight, 0.02]} />
        <meshPhysicalMaterial
          color="#8ec8e8"
          transparent
          opacity={0.08}
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top rail — brushed aluminum frame */}
      <mesh position={[0, panelHeight, 0]}>
        <boxGeometry args={[width + 0.08, frameThickness, frameDepth]} />
        <meshStandardMaterial color="#4a4a6a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Bottom rail */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.08, frameThickness, frameDepth]} />
        <meshStandardMaterial color="#4a4a6a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Vertical edge posts */}
      {[-width / 2, width / 2].map((x, i) => (
        <mesh key={i} position={[x, panelHeight / 2, 0]}>
          <boxGeometry args={[frameThickness, panelHeight + frameThickness, frameDepth]} />
          <meshStandardMaterial color="#4a4a6a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Frosted strip at desk height for privacy */}
      <mesh position={[0, 0.85, 0.005]}>
        <boxGeometry args={[width, 0.35, 0.005]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          metalness={0.0}
          roughness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Floor lamp with glowing shade
 */
function FloorLamp({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const shadeRef = useRef<THREE.Mesh>(null);
  const { camera, pointer } = useThree();
  const currentIntensity = useRef(0.8);
  const targetIntensity = useRef(0.8);
  const _worldPos = useRef(new THREE.Vector3());
  const _screenPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    // Reuse persistent vectors to avoid per-frame allocation
    _worldPos.current.set(position[0], position[1] + 1.65, position[2]);
    _screenPos.current.copy(_worldPos.current).project(camera);
    const dx = _screenPos.current.x - pointer.x;
    const dy = _screenPos.current.y - pointer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const isHovered = dist < 0.3;
    targetIntensity.current = isHovered ? 6.0 : 0.8;

    currentIntensity.current += (targetIntensity.current - currentIntensity.current) * 0.08;

    if (lightRef.current) {
      lightRef.current.intensity = currentIntensity.current + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }

    if (shadeRef.current) {
      const mat = shadeRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isHovered ? 2.5 : 0.3, 0.08);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, isHovered ? 0.6 : 0.2, 0.08);
    }
  });

  return (
    <group position={position}>
      {/* Lamp base */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Lamp pole */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.6, 8]} />
        <meshStandardMaterial color="#3a3a5a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Lamp shade */}
      <mesh ref={shadeRef} position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.25, 16, 1, true]} />
        <meshStandardMaterial
          color="#4f8cf7"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          emissive="#4f8cf7"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Lamp light */}
      <pointLight
        ref={lightRef}
        position={[0, 1.5, 0]}
        intensity={0.8}
        color="#4f8cf7"
        distance={5}
        decay={2}
      />
    </group>
  );
}

/**
 * Floating particles with gentle animation
 */
function AmbientParticles({ count = 300 }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, [count]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [positions]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.2 + i * 0.1) * 0.0005;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.03}
        color="#4f8cf7"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Subtle grid floor for spatial context
 */
function FloorGrid() {
  return (
    <group position={[0, -0.5, 0]}>
      <gridHelper args={[20, 20, '#1a1a3e', '#0d0d1a']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a14" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/**
 * RoomVisualizer - Premium interior design 3D scene with mouse-reactive camera
 */
export default React.memo(function RoomVisualizer() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} color="#1a1a3e" />
        <directionalLight position={[5, 8, 5]} intensity={0.4} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.2} color="#4f8cf7" />

        {/* Mouse-reactive elements */}
        <MouseCamera />
        <MouseReactiveLight />

        {/* ===== Office Floor Layout ===== */}
        {/* Center row — 3 pods of 4 desks each, tighter spacing */}
        <WorkstationPod position={[0, -0.5, 0]} rotation={0} />
        <WorkstationPod position={[-3.5, -0.5, 0]} rotation={0} />
        <WorkstationPod position={[3.5, -0.5, 0]} rotation={0} />

        {/* Back row — 2 pods closer, offset for aisle */}
        <WorkstationPod position={[-1.75, -0.5, -3.2]} rotation={Math.PI} />
        <WorkstationPod position={[1.75, -0.5, -3.2]} rotation={Math.PI} />

        {/* Glass partition separating center and back workspace zones */}
        <GlassPartition position={[0, -0.5, -1.9]} width={10} />

        {/* Floor lamps flanking the aisles */}
        <FloorLamp position={[-5.5, -0.5, 0.5]} />
        <FloorLamp position={[5.5, -0.5, 0.5]} />
        <FloorLamp position={[0, -0.5, -4.5]} />

        {/* Hanging pendant lights above each workstation pod */}
        <PendantLight position={[0, 0, -0.9]} />
        <PendantLight position={[-3.5, 0, -0.9]} />
        <PendantLight position={[3.5, 0, -0.9]} />
        <PendantLight position={[-1.75, 0, -4.1]} />
        <PendantLight position={[1.75, 0, -4.1]} />

        {/* Ambient elements */}
        <FloorGrid />
        <AmbientParticles count={200} />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a14', 9, 20]} />
      </Canvas>
    </div>
  );
});
