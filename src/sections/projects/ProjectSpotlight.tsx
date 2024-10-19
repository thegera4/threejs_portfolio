import {ProjectSpotlightProps} from "../../types.ts"
const ProjectSpotlight = ({currentProject}: ProjectSpotlightProps) => {
  return (
    <div className="absolute top-0 right-0">
      <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl"/>
    </div>
  )
}
export default ProjectSpotlight;