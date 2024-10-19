import {STRINGS} from "../../constants/Strings.ts"
import {handleNavigation} from "../../utils/projects.ts"
import {NavigationControlsProps} from "../../types.ts";

const NavigationControls = ({setCurrentProjectIndex, projects}: NavigationControlsProps) => {

  return (
    <div className="flex justify-between items-center mt-7">
      <button className="arrow-btn" onClick={(): void => handleNavigation(STRINGS.PREVIOUS,setCurrentProjectIndex, projects)}>
        <img src="/assets/left-arrow.png" alt="previous-project" className="w-4 h-4"/>
      </button>
      <button className="arrow-btn" onClick={(): void => handleNavigation(STRINGS.NEXT, setCurrentProjectIndex, projects)}>
        <img src="/assets/right-arrow.png" alt="next-project" className="w-4 h-4"/>
      </button>
    </div>
  )
}

export default NavigationControls