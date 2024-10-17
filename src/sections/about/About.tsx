import Name from "./Name.tsx"
import TechStack from "./TechStack.tsx"
import Earth from "./Earth.tsx"
import Passion from "./Passion.tsx"
import Contact from "./Contact.tsx"

const About = () => {
  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <Name />
        <TechStack />
        <Earth />
        <Passion />
        <Contact />
      </div>
    </section>
  )
}
export default About