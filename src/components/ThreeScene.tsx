import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface MeshProps {
  position: [number, number, number];
  key: string;
}

interface FrameState {
  clock: { getElapsedTime: () => number };
}

const FloatingSubjects = () => {
  const groupRef = useRef<THREE.Group>(null);
  const subjects = ['Web Dev', 'Data', 'Cloud', 'AI/ML', 'Design', 'Security'];

  useFrame(({ clock }: FrameState) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += 0.001;
    const time = clock.getElapsedTime();

    groupRef.current.children.forEach((child: THREE.Object3D, index: number) => {
      child.position.y = Math.sin(time * 0.5 + index * 2) * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {subjects.map((subject, i) => {
        const angle = (i / subjects.length) * Math.PI * 2;
        const radius = 7;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <mesh key={`subject-${i}`} position={[x, 0, z]}>
            <Text
              color="#ffffff"
              fontSize={0.7}
              maxWidth={4}
              lineHeight={1}
              letterSpacing={0.02}
              anchorX="center"
              anchorY="middle"
            >
              {subject}
            </Text>
            <meshStandardMaterial 
              color={i % 2 === 0 ? '#6366f1' : '#8b5cf6'}
              transparent
              opacity={0.9}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const ThreeDBackground = () => {
  const ref = useRef(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }: FrameState) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh position={[0, 0, -10]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial color="#444" emissive="#222" />
        </mesh>
      </group>
    </>
  );
};

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => {
        gl.setClearAlpha(0);
      }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <ThreeDBackground />
      <FloatingSubjects />
      <Stars radius={40} depth={40} count={1500} factor={3} fade speed={0.5} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
    </Canvas>
  );
}
