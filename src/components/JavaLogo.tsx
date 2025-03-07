/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: PhantomXD (https://sketchfab.com/PhantomXD)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/java-442de0f1b8a54966bc16466b329105af
Title: Java
*/
import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import {JavaLogoGLTF, JavaLogoProps} from "../types.ts"
import {useMediaQuery} from "react-responsive"
import gsap from 'gsap'

export default function JavaLogo({position}: JavaLogoProps) {

  const groupRef = useRef<THREE.Group>(null)
  const torusRefs = useRef<THREE.Mesh[]>([])
  const { nodes, materials } = useGLTF('/models/java.glb') as JavaLogoGLTF

  const isSmall = useMediaQuery({ maxWidth: 440 })
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })

  const scale = isSmall ? 0.5 : isMobile ? 0.5 : isTablet ? 0.6 : 0.7

  useEffect(() => {
    if (torusRefs?.current?.length === 0) return

    gsap
      .timeline({ repeat: -1, repeatDelay: 0.5 })
      .to(torusRefs?.current?.map(torus => torus.rotation), {
        y: `+=${Math.PI * 2}`,
        x: `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: {
          each: 0.15,
        },
      })

    if(groupRef.current){
      gsap.to(groupRef.current.rotation, {
        y: `+=${Math.PI * 2}`,
        duration: 8,
        repeat: -1,
        ease: 'linear'
      })
    }

  }, [])

  const setTorusRef = (mesh: THREE.Mesh) => {
    if (mesh && !torusRefs.current.includes(mesh)) {
      torusRefs?.current?.push(mesh)
    }
  }

  return (
    <React.Fragment>
      <directionalLight position={[100, -100, 100]} intensity={0.7}/>
      <group ref={groupRef} dispose={null} scale={scale} position={position}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="Root">
              <group name="Cube">
                <mesh name="Cube_0" geometry={nodes.Cube_0.geometry} material={materials.Material}/>
              </group>
              <group name="Plane" position={[0.787, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh name="Plane_0" geometry={nodes.Plane_0.geometry} material={materials.Material}/>
              </group>
              <group name="Plane001" position={[0, 0, 1.518]} rotation={[Math.PI / 2, 0, 0]} scale={1.218}>
                <mesh
                  name="Plane001_0"
                  geometry={nodes.Plane001_0.geometry}
                  material={materials['Material.002']}
                  morphTargetDictionary={nodes.Plane001_0.morphTargetDictionary}
                  morphTargetInfluences={nodes.Plane001_0.morphTargetInfluences}
                />
              </group>
              <group name="Torus001" position={[-0.138, -0.061, -0.771]} rotation={[-0.14, -0.02, 0.097]}
                     scale={[0.467, 0.432, 0.432]}>
                <mesh name="Torus001_0" geometry={nodes.Torus001_0.geometry} material={materials.Material}
                      ref={setTorusRef}/>
              </group>
              <group name="Torus000" position={[0.095, -0.029, -0.88]} rotation={[-0.134, -0.046, 0.098]}
                     scale={[0.454, 0.419, 0.303]}>
                <mesh name="Torus000_0" geometry={nodes.Torus000_0.geometry} material={materials.Material}
                      ref={setTorusRef}/>
              </group>
            </group>
          </group>
        </group>
      </group>
    </React.Fragment>
  )
}

useGLTF.preload('/models/java.glb')