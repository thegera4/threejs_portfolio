import {useRef} from "react"
import {TargetProps} from "../types.ts"
import {useGLTF} from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"

const Target = (props: TargetProps) => {

  const targetRef = useRef<THREE.Mesh | null>(null)
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf")

  useGSAP(() => {
      // @ts-expect-error/ possible nulls can not be addressed, but we know it is not null
    gsap.to(targetRef.current?.position, {
        // @ts-expect-error/ possible nulls can not be addressed, but we know it is not null
        y: targetRef.current?.position?.y + 0.5,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
      })
  })

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Target