"use client"
import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, ThreeElements, CameraProps } from '@react-three/fiber'
import { AsciiRenderer, Center, Loader, Text3D } from '@react-three/drei'

const spinResistance: number = 20;
const scaleValue: number = 0.8;
const fontPath: string = "/fonts/anarchy_regular.json";

function Text(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(
        (state, delta) => (
            meshRef.current.rotation.x += (delta / spinResistance),
            meshRef.current.rotation.y += (delta / spinResistance)
        )
    );
    return (
        <mesh
            {...props}
            ref={meshRef}
        >
            <Center scale={scaleValue}>
                <Text3D font={fontPath}>A
                    <meshNormalMaterial />
                </Text3D>
            </Center>
        </mesh>
    );
};

const cameraPosition: CameraProps = { position: [1, 1, 1] };
const canvasStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
    width: '100vw',
    height: '100vh',
};

function Experience() {
    return (
        <Canvas style={canvasStyle}
            camera={cameraPosition}>
            <Suspense fallback={<Loader />}>
                <AsciiRenderer invert={false} bgColor='transparent' />
                <Text />
            </Suspense>
        </Canvas>
    );
};

export default Experience;