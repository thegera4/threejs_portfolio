/*
Google Pixel 10 3D model generated procedurally in Blender
*/
import { useRef, useEffect } from "react"
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { DemoPhoneProps, DemoPhoneGLTF } from "../types.ts"
import * as THREE from "three"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function DemoPhone({ texture }: DemoPhoneProps) {

  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF('/models/google_pixel_10.glb') as unknown as DemoPhoneGLTF
  const txt = useVideoTexture(texture ? texture : '/textures/project/notudus.mp4')

  useEffect(() => {
    if (!txt) return
    txt.flipY = false
    const video = txt.image as HTMLVideoElement | undefined
    const applyUvCrop = () => {
      const isLandscapeVideo = !video?.videoWidth || video.videoWidth > video.videoHeight
      if (isLandscapeVideo) {
        txt.repeat.set(0.2594, 1)
        txt.offset.set(0.3698, 0)
      } else {
        txt.repeat.set(1, 1)
        txt.offset.set(0, 0)
      }
      txt.needsUpdate = true
    }
    applyUvCrop()
    video?.addEventListener('loadedmetadata', applyUvCrop)
    return () => {
      video?.removeEventListener('loadedmetadata', applyUvCrop)
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
      <mesh name="phone-screen" geometry={nodes['phone-screen'].geometry}>
        <meshBasicMaterial map={txt} toneMapped={false} />
      </mesh>
      <mesh name="phone-frame" geometry={nodes['phone-frame'].geometry} material={materials.Frame} />
      <mesh name="phone-back" geometry={nodes['phone-back'].geometry} material={materials.BackGlass} />
      <mesh name="phone-bezel" geometry={nodes['phone-bezel'].geometry} material={materials.Bezel} />
      <mesh name="camera-visor-frame" geometry={nodes['camera-visor-frame'].geometry} material={materials.Frame} />
      <mesh name="camera-visor-glass" geometry={nodes['camera-visor-glass'].geometry} material={materials.VisorGlass} />
      <mesh name="camera-lenses" geometry={nodes['camera-lenses'].geometry} material={materials.Lens} />
      <mesh name="camera-flash" geometry={nodes['camera-flash'].geometry} material={materials.Flash} />
      <mesh name="google-logo" geometry={nodes['google-logo'].geometry} material={materials.Logo} />
    </group>
  )
}

useGLTF.preload('/models/google_pixel_10.glb')
