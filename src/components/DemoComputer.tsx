/*
MacBook Air 3D model generated procedurally in Blender
*/
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { DemoComputerProps, DemoPCGLTF } from "../types.ts"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function DemoComputer({ texture }: DemoComputerProps) {

  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF('/models/macbook_air.glb') as unknown as DemoPCGLTF
  const txt = useVideoTexture(texture ? texture : '/textures/project/sqlite-browser.mp4')

  useEffect(() => {
    if (txt) {
      txt.flipY = false
    }
  }, [txt])

  useGSAP(() => {
    if (group.current) {
      gsap.from(group.current.rotation, {
        y: Math.PI / 2,
        duration: 1,
        ease: 'power3.out'
      })
    }
  }, [txt])

  return (
    <group ref={group} dispose={null}>
      <mesh name="monitor-screen" geometry={nodes['monitor-screen'].geometry}>
        <meshBasicMaterial map={txt} toneMapped={false} />
      </mesh>
      <mesh name="macbook-body" geometry={nodes['macbook-body'].geometry} material={materials.Aluminum} />
      <mesh name="macbook-trackpad" geometry={nodes['macbook-trackpad'].geometry} material={materials.Trackpad} />
      <mesh name="macbook-keyboard-well" geometry={nodes['macbook-keyboard-well'].geometry} material={materials.DarkMetal} />
      <mesh name="macbook-keys" geometry={nodes['macbook-keys'].geometry} material={materials.Keys} />
      <mesh name="macbook-bezel" geometry={nodes['macbook-bezel'].geometry} material={materials.Bezel} />
      <mesh name="macbook-webcam" geometry={nodes['macbook-webcam'].geometry} material={materials.Lens} />
      <mesh name="apple-logo" geometry={nodes['apple-logo'].geometry} material={materials.Logo} />
    </group>
  )
}

useGLTF.preload('/models/macbook_air.glb')
