/*
Modern Gamer Desk, RGB Gaming PC & Curved Ultrawide Monitor 3D model generated in Blender
*/
import { useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import { CustomGLTF } from "../types.ts"

export default function HackerRoom(props: JSX.IntrinsicElements['group']) {

  const { nodes, materials } = useGLTF('/models/gamer_desk.glb') as unknown as CustomGLTF
  const screenTexture = useTexture('/textures/desk/screen.png')

  useEffect(() => {
    if (screenTexture) {
      screenTexture.flipY = false
      screenTexture.colorSpace = THREE.SRGBColorSpace
      screenTexture.needsUpdate = true
    }
  }, [screenTexture])

  return (
    <group {...props} dispose={null}>
      <mesh name="ultrawide-screen" geometry={nodes['ultrawide-screen'].geometry}>
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>
      <mesh name="desk-top" castShadow receiveShadow geometry={nodes['desk-top'].geometry} material={materials.DeskTop} />
      <mesh name="desk-frame" castShadow receiveShadow geometry={nodes['desk-frame'].geometry} material={materials.DeskMetal} />
      <mesh name="desk-mat" receiveShadow geometry={nodes['desk-mat'].geometry} material={materials.MatFabric} />
      <mesh name="monitor-body" castShadow receiveShadow geometry={nodes['monitor-body'].geometry} material={materials.MonitorChassis} />
      <mesh name="pc-case" castShadow receiveShadow geometry={nodes['pc-case'].geometry} material={materials.CaseMetal} />
      <mesh name="pc-internals" castShadow receiveShadow geometry={nodes['pc-internals'].geometry} material={materials.HardwareMetal} />
      <mesh name="pc-glass" geometry={nodes['pc-glass'].geometry} material={materials.TemperedGlass} />
      <mesh name="peripherals" castShadow receiveShadow geometry={nodes['peripherals'].geometry} material={materials.PeripheralMat} />
      <mesh name="rgb-cyan" geometry={nodes['rgb-cyan'].geometry} material={materials.RgbCyan} />
      <mesh name="rgb-magenta" geometry={nodes['rgb-magenta'].geometry} material={materials.RgbMagenta} />
    </group>
  )
}

useGLTF.preload('/models/gamer_desk.glb')
