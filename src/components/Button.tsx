import {ButtonProps} from "../types.ts"

const Button = ({name, isBeam, containerClass, href}: ButtonProps) => {
  return (
    <button className={`btn ${containerClass}`}>
      <a href={href} className="w-full flex items-center justify-center">
        <div className="flex items-center">
        { isBeam &&
          <span className="relative flex h-3 w-3 mr-1">
            <span className="btn-ping"/>
            <span className="btn-ping_dot"/>
          </span>
        }
        {name}
        </div>
      </a>
    </button>
  )
}
export default Button