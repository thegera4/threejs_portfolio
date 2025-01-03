import {useState} from "react"
import PersonalAvatar from "./PersonalAvatar.tsx"
import JobsTimeline from "./JobsTimeline.tsx"
import {useMediaQuery} from "react-responsive"

const Experience = () => {

  const isTablet: boolean = useMediaQuery({ maxWidth: 1024 })
  const [animationName, setAnimationName] = useState<string>('idle')

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <h3 className="head-text">My Work Experience</h3>
        <div className={isTablet ? "work-container-mobile" : "work-container"}>
          <PersonalAvatar animationName={ animationName }/>
          <JobsTimeline setAnimationName={ setAnimationName } />
        </div>
      </div>
    </section>
  )
}

export default Experience