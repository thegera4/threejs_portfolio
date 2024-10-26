import {Suspense} from "react"
import {Canvas} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import CanvasLoader from "../../components/CanvasLoader.tsx"
import Avatar3D from "../../components/Avatar3D.tsx"
import {PersonalAvatarProps} from "../../types.ts"

const PersonalAvatar = ({animationName}: PersonalAvatarProps) => {
  return (
    <div className="work-canvas">
      <Canvas>
        <ambientLight intensity={7}/>
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
        <directionalLight position={[10, 10, 10]} intensity={1}/>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2}/>
        <Suspense fallback={<CanvasLoader/>}>
          <Avatar3D position={[0, -3, 0]} scale={3} animationName={animationName}/>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default PersonalAvatar