import {STRINGS} from "../../constants/Strings.ts"
import FooterLink from "../../components/FooterLink.tsx"
import CvLink from "../../components/CvLink.tsx"

const Footer = () => {
  return (
    <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <FooterLink  text="Mobile-Apps Privacy Policy" urlName={STRINGS.PRIVACY} />
      <CvLink />
      <FooterLink  text="Alternative Portfolio" urlName={STRINGS.OLD} />
    </section>
  )
}

export default Footer