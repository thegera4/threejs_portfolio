import { openTab } from "../utils/footer.ts"
import {STRINGS} from "../constants/Strings.ts"

const SocialMedia = () => {
  return (
    <div className="flex gap-3">
      <div className="social-icon cursor-pointer hover:bg-black-500" onClick={(): void => openTab(STRINGS.GITHUB)}>
        <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2"/>
      </div>
      <div className="social-icon cursor-pointer hover:bg-black-500" onClick={(): void => openTab(STRINGS.LINKEDIN)}>
        <img src="/assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2"/>
      </div>
      <div className="social-icon cursor-pointer hover:bg-black-500" onClick={(): void => openTab(STRINGS.PLAYSTORE)}>
        <img src="/assets/playstore.svg" alt="playstore" className="w-1/2 h-1/2"/>
      </div>
    </div>
  )
}

export default SocialMedia