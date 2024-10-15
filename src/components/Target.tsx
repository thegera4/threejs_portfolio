import {useRef} from "react"
import {TargetProps} from "../types.ts"
import {useGLTF} from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"

const Target = (props: TargetProps) => {

  const targetRef = useRef<THREE.Mesh | null>(null)
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf")

  //TODO: fix possible nulls here
  useGSAP(() => {
    return gsap.to(targetRef.current?.position,
      {
        y: targetRef.current?.position?.y + 0.5,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
      })
  })

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Target