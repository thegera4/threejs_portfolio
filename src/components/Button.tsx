import {ButtonProps} from "../types.ts"

const Button = ({name, isBeam, containerClass}: ButtonProps) => {
  return (
    <button className={`btn ${containerClass}`}>
      <a href="#about" className="w-fit">
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