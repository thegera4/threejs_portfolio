import Target from "../../components/Target.tsx"
import {FloatingIconsProps} from "../../types.ts"
import ReactLogo from "../../components/ReactLogo.tsx";
import Cube from "../../components/Cube.tsx";
import Rings from "../../components/Rings.tsx";

const FloatingIcons = ({sizes}: FloatingIconsProps) => {

  return (
    <group>
      <Target position={sizes.targetPosition as [number, number, number]} />
      <ReactLogo position={sizes.reactLogoPosition as [number, number, number]} />
      <Cube position={sizes.cubePosition as [number, number, number]} />
      <Rings position={sizes.ringPosition as [number, number, number]} />
    </group>
  )
}

export default FloatingIcons