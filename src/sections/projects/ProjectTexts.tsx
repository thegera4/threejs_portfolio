import {ProjectTextsProps} from "../../types.ts"
const ProjectTexts = ({currentProject}: ProjectTextsProps) => {
  return (
    <div className="flex flex-col gap-5 text-white-600 my-5">
      <p className="animatedText">{currentProject.title}</p>
      <p className="animatedText">{currentProject.desc}</p>
      <p className="animatedText">{currentProject.subdesc}</p>
    </div>
  )
}
export default ProjectTexts