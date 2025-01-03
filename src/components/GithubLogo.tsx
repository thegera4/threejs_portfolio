/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: pengedarseni (https://sketchfab.com/pengedarseni)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/3d-github-logo-441d03d1076b44f483df551e02d970fe
Title: 3D Github Logo
*/
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import {GithubGLTFResult} from "../types.ts"
import gsap from 'gsap'

export default function GithubLogo() {
    const group = useRef<THREE.Group>(null)
    const { nodes, materials } = useGLTF('/models/github.glb') as GithubGLTFResult

    useEffect(() => {
        if (group.current) {
            gsap.to(group.current.rotation, {
                z: '+=6.28319', // 2 * Math.PI (one full rotation)
                duration: 10,
                repeat: -1,
                ease: 'linear'
            });
        }
    }, [])

    return (
        <group dispose={null}>
            <group ref={group}  position={[-0.055, 2.945, 6.336]} rotation={[Math.PI / 2, 0, 0]} scale={28.364}>
                <mesh geometry={nodes.Object_4.geometry} material={materials.glossy_putih} />
                <mesh geometry={nodes.Object_5.geometry} material={materials.github} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/github.glb')