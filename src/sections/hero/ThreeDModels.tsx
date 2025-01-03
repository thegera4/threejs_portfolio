import {Canvas, Vector3} from "@react-three/fiber"
import {Suspense} from "react"
import CanvasLoader from "../../components/CanvasLoader.tsx"
import {PerspectiveCamera} from "@react-three/drei"
import HackerRoom from "../../components/HackerRoom.tsx"
import {ThreeDModelProps} from "../../types.ts"
import FloatingIcons from "./FloatingIcons.tsx";
import HeroCamera from "../../components/HeroCamera.tsx";
/* import {Leva, useControls} from "leva" */

const ThreeDModels = ({sizes, isMobile} : ThreeDModelProps) => {

  // Leva controls used to manipulate the 3D object and obtain the desired position, rotation and scale
  /*const ctrls = useControls("HackerRoom", {
    positionX: { value: 2.5, min: -10, max: 10 },
    positionY: { value: 2.5, min: -10, max: 10 },
    positionZ: { value: 2.5, min: -10, max: 10 },
    rotationX: { value: 0, min: -10, max: 10 },
    rotationY: { value: 0, min: -10, max: 10 },
    rotationZ: { value: 0, min: -10, max: 10 },
    scale: { value: 1, min: 0.1, max: 10 },
  })*/

  return (
    <div className="w-full h-full absolute inset-0">
      {/* <Leva /> */}
      <Canvas className="w-full h-full">
        <Suspense fallback={<CanvasLoader/>}>
          <PerspectiveCamera makeDefault position={[0, 0, 20]}/>
          <HeroCamera isMobile={isMobile} >
            <HackerRoom position={sizes.deskPosition as Vector3} rotation={[0, -Math.PI, 0]} scale={sizes.deskScale}/>
          </HeroCamera>
          {!isMobile &&  <FloatingIcons sizes={sizes}/>}
          <ambientLight intensity={1}/>
          <directionalLight position={[10, 10, 10]} intensity={0.5}/>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeDModels