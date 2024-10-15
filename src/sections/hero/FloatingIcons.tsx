import Target from "../../components/Target.tsx"
import {FloatingIconsProps} from "../../types.ts"

const FloatingIcons = ({sizes}: FloatingIconsProps) => {

  return (
    <group>
      <Target position={sizes.targetPosition} />
    </group>
  )
}

export default FloatingIcons