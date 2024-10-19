import {ProjectLogoProps} from "../../types.ts"
const ProjectLogo = ({currentProject}: ProjectLogoProps) => {
  return (
    <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
      <img src={currentProject.logo} alt="logo" className="w-10 h-10 shadow-sm"/>
    </div>
  )
}
export default ProjectLogo