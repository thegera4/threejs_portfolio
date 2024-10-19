import {LinkTextIconProps} from "../types.ts"
const LinkTextIcon = ({href, text, image}: LinkTextIconProps) => {
  return (
    <a className="flex items-center gap-2 cursor-pointer text-white-600" href={href} target="_blank" rel="noreferrer">
      <p>{text}</p>
      <img src={image} alt="check-demo" className="w-3 h3"/>
    </a>
  )
}
export default LinkTextIcon