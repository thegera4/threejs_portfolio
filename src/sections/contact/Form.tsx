import { FormProps } from "../../types.ts"

const Form = ({ formData, isLoading, formRef, handleSubmit, handleChange, isMobile }: FormProps) => {
  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`flex flex-col ${isMobile ? "mt-4 space-y-5" : "mt-6 space-y-7"}`}>
      <label className="flex flex-col space-y-2">
        <span className="field-label">Full Name:</span>
        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="field-input" placeholder="John Doe" />
      </label>
      <label className="flex flex-col space-y-2">
        <span className="field-label">Email:</span>
        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="field-input" placeholder="johndoe@email.com" />
      </label>
      <label className="flex flex-col space-y-2">
        <span className="field-label">Your message:</span>
        <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="field-input" placeholder="Hi, I'm interested in working with you..." />
      </label>
      <button className="field-btn w-full !mt-10" type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
        <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
      </button>
    </form>
  )
}
export default Form