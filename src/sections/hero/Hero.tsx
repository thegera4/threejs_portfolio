import Texts from "./Texts.tsx";
import ThreeDModel from "./ThreeDModel.tsx";
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../../constants";
import FloatingIcons from "./FloatingIcons.tsx";

const Hero = () => {

  const isSmall: boolean = useMediaQuery({ maxWidth: 440 })
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 })
  const isTablet: boolean = useMediaQuery({ maxWidth: 1024, minWidth: 768 })

  const sizes = calculateSizes({ isSmall, isMobile, isTablet })

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <Texts />
      <ThreeDModel sizes={sizes} />
      <FloatingIcons sizes={sizes} />
    </section>
  )
}

export default Hero