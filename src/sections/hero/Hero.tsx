import Texts from "./Texts.tsx"
import ThreeDModels from "./ThreeDModels.tsx"
import {useMediaQuery} from "react-responsive"
import {calculateSizes} from "../../constants"
import ContactButton from "../../components/ContactButton.tsx"

const Hero = () => {
  const isSmall: boolean = useMediaQuery({ maxWidth: 440 })
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 })
  const isTablet: boolean = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
  const sizes = calculateSizes({ isSmall, isMobile, isTablet })

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <Texts />
      <ThreeDModels sizes={sizes} isMobile={isMobile} />
      <ContactButton />
    </section>
  )
}

export default Hero