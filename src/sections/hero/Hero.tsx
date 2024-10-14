import {Canvas, Vector3} from "@react-three/fiber"
import {PerspectiveCamera} from "@react-three/drei"
import HackerRoom from "../../components/HackerRoom.tsx"
import {Suspense} from "react"
import CanvasLoader from "../../components/CanvasLoader.tsx"
import {useMediaQuery} from "react-responsive"
import {calculateSizes} from "../../constants"
/* import {Leva, useControls} from "leva" */

const Hero = () => {

  const isSmall: boolean = useMediaQuery({ maxWidth: 440 })
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 })
  const isTablet: boolean = useMediaQuery({ maxWidth: 1024, minWidth: 768 })

  const sizes = calculateSizes(isSmall, isMobile, isTablet)

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
    <section className="min-h-screen w-full flex flex-col relative">
      {/* Text */}
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I'm Gerardo
          <span role="img" aria-label="waving-hand" className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Passion for technology.
        </p>
      </div>
      {/* ThreeJS object */}
      <div className="w-full h-full absolute inset-0">
        {/* <Leva /> */}
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HackerRoom
              position={sizes.deskPosition as Vector3}
              rotation={[0, -Math.PI, 0]}
              scale={sizes.deskScale}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Hero