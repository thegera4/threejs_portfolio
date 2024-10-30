import {openTab} from "../utils/footer.ts"
import {FooterLinkProps} from "../types.ts"
const FooterLink = ({text, urlName}: FooterLinkProps) => {
  return (
    <div className="text-white-500 flex gap-2 cursor-pointer hover:text-white-800" onClick={() => openTab(urlName)}>
      <p>{text}</p>
    </div>
  )
}
export default FooterLink