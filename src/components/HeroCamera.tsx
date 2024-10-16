import {useRef} from "react"
import * as THREE from "three"
import {useFrame} from "@react-three/fiber"
import {easing} from "maath"
import {HeroCameraProps} from "../types.ts"

const HeroCamera = ({ children, isMobile }: HeroCameraProps) => {

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta)
    if(!isMobile) {
      // @ts-expect-error/ possible nulls can not be addressed, but we know it is not null
      easing.dampE(groupRef.current?.rotation, [-state.pointer.y / 3, -state.pointer.x / 5, 0], 0.25, delta)
    }
  })

  return <group ref={groupRef}> { children } </group>
}

export default HeroCamera