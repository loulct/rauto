'use client';

import React, { useRef, useMemo, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader } from '../shaders/vertexShader';
import { fragmentShader } from '../shaders/fragmentShader';

export interface PsychedelicSpiralProps extends React.HTMLAttributes<HTMLDivElement> {
  spinRotation?: number;
  spinSpeed?: number;
  offset?: [number, number];
  color1?: string;
  color2?: string;
  color3?: string;
  contrast?: number;
  lighting?: number;
  spinAmount?: number;
  pixelFilter?: number;
  spinEase?: number;
  isRotate?: boolean;
  mouseInteraction?: boolean;
}

// Convert hex to vec4
function hexToVec4(hex: string): [number, number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
    1.0
  ];
}

interface SpiralMeshProps {
  spinRotation: number;
  spinSpeed: number;
  offset: [number, number];
  color1: string;
  color2: string;
  color3: string;
  contrast: number;
  lighting: number;
  spinAmount: number;
  pixelFilter: number;
  spinEase: number;
  isRotate: boolean;
}

function SpiralMesh({
  spinRotation,
  spinSpeed,
  offset,
  color1,
  color2,
  color3,
  contrast,
  lighting,
  spinAmount,
  pixelFilter,
  spinEase,
  isRotate
}: SpiralMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current?.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.iTime.value = state.clock.getElapsedTime();
      // Update resolution to match canvas size
      material.uniforms.iResolution.value.set(state.size.width, state.size.height);

      // Scale mesh to fill viewport based on camera and aspect ratio
      const aspect = state.size.width / state.size.height;
      const camera = state.camera as THREE.PerspectiveCamera;
      const distance = camera.position.z;
      const fov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * distance;
      const width = height * aspect;

      meshRef.current.scale.set(width / 2, height / 2, 1);
    }
  });

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0.0 },
      iResolution: { value: new THREE.Vector2(1920, 1080) },
      u_spinRotation: { value: spinRotation },
      u_spinSpeed: { value: spinSpeed },
      u_offset: { value: new THREE.Vector2(offset[0], offset[1]) },
      u_color1: { value: new THREE.Vector4(...hexToVec4(color1)) },
      u_color2: { value: new THREE.Vector4(...hexToVec4(color2)) },
      u_color3: { value: new THREE.Vector4(...hexToVec4(color3)) },
      u_contrast: { value: contrast },
      u_lighting: { value: lighting },
      u_spinAmount: { value: spinAmount },
      u_pixelFilter: { value: pixelFilter },
      u_spinEase: { value: spinEase },
      u_isRotate: { value: isRotate ? 1.0 : 0.0 },
    }),
    [spinRotation, spinSpeed, offset, color1, color2, color3, contrast, lighting, spinAmount, pixelFilter, spinEase, isRotate]
  );

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const PsychedelicSpiral = forwardRef<HTMLDivElement, PsychedelicSpiralProps>(({
  className,
  spinRotation = -2.0,
  spinSpeed = 7.0,
  offset = [0.0, 0.0],
  color1 = '#DE443B',
  color2 = '#DE443B',
  color3 = '#DE443B',
  contrast = 3.5,
  lighting = 0.4,
  spinAmount = 0.25,
  pixelFilter = 745.0,
  spinEase = 1.0,
  isRotate = false,
  mouseInteraction = true,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90, near: 0.1, far: 1000 }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
        orthographic={false}
      >
        <SpiralMesh
          spinRotation={spinRotation}
          spinSpeed={spinSpeed}
          offset={offset}
          color1={color1}
          color2={color2}
          color3={color3}
          contrast={contrast}
          lighting={lighting}
          spinAmount={spinAmount}
          pixelFilter={pixelFilter}
          spinEase={spinEase}
          isRotate={isRotate}
        />
      </Canvas>
    </div>
  );
});

PsychedelicSpiral.displayName = 'PsychedelicSpiral';

export default function Spiral() {
  return (
    <PsychedelicSpiral
      className='psyspiral'
      spinRotation={-2.0}
      spinSpeed={1.0}
      offset={[0.0, 0.0]}
      color1="black" //#DE443B
      color2="black"
      color3="black"
      contrast={3.5}
      lighting={0.4}
      spinAmount={0.25}
      pixelFilter={745.0}
      spinEase={1}
      isRotate={false}
    />
  )
}