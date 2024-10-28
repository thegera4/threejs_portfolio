import Button from "./Button.tsx"
const ContactButton = () => {
  return (
    <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
      <Button name="Let's work together" isBeam={true} containerClass="sm:w-fit w-full sm:min-w-96"/>
    </div>
  )
}
export default ContactButton