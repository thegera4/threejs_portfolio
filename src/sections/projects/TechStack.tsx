import {ProjectTag, TechStackProps} from "../../types.ts"

const TechStack = ({currentProject}: TechStackProps) => {
  return (
    <div className="flex items-center gap-3">
      { currentProject.tags.map((tag: ProjectTag, index: number) => (
        <div key={index} className="tech-logo">
          <img src={tag.path} alt={tag.name} className={tag.name === "Mongo" ? "w-4 h-8" : tag.name === "Express" ? "scale-150" : undefined}/>
        </div>
      ))}
    </div>
  )
}

export default TechStack