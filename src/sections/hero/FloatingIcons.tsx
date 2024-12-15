import {FloatingIconsProps} from "../../types.ts"
import ReactLogo from "../../components/ReactLogo.tsx"
import JavascriptLogo from "../../components/JavascriptLogo.tsx"
import JavaLogo from "../../components/JavaLogo.tsx"
import PythonLogo from "../../components/PythonLogo.tsx"

const FloatingIcons = ({sizes}: FloatingIconsProps) => {
    return (
    <group>
      <JavascriptLogo position={sizes.jsLogoPosition as [number, number, number]} />
      <ReactLogo position={sizes.reactLogoPosition as [number, number, number]} />
      <PythonLogo position={sizes.pythonLogoPosition as [number, number, number]} />
      <JavaLogo position={sizes.javaLogoPosition as [number, number, number]} />
    </group>
  )
}

export default FloatingIcons