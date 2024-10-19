import {ProjectTag, TechStackProps} from "../../types.ts"

const TechStack = ({currentProject}: TechStackProps) => {
  return (
    <div className="flex items-center gap-3">
      { currentProject.tags.map((tag: ProjectTag, index: number) => (
        <div key={index} className="tech-logo">
          <img src={tag.path} alt={tag.name}/>
        </div>
      ))}
    </div>
  )
}

export default TechStack