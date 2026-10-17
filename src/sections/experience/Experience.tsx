import {useState, useEffect} from "react"
import PersonalAvatar from "./PersonalAvatar.tsx"
import JobsTimeline from "./JobsTimeline.tsx"
import {useMediaQuery} from "react-responsive"

const Experience = () => {

  const isTablet: boolean = useMediaQuery({ maxWidth: 1024 })
  const [animationName, setAnimationName] = useState<string>('idle')

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleAnimation = (e: Event) => {
      const customEvent = e as CustomEvent<{ animation: string }>;
      if (customEvent.detail?.animation) {
        setAnimationName(customEvent.detail.animation);
        clearTimeout(timer);
        timer = setTimeout(() => setAnimationName('idle'), 4500);
      }
    };
    window.addEventListener('trigger-avatar-animation', handleAnimation);
    return () => {
      window.removeEventListener('trigger-avatar-animation', handleAnimation);
      clearTimeout(timer);
    };
  }, []);


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