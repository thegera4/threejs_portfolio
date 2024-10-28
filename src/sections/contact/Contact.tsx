import React, {useRef, useState} from "react"
import {ContactFormData, ToastType} from "../../types.ts"
import Form from "./Form.tsx"
import emailjs from "@emailjs/browser"
import Toast from "../../components/Toast.tsx"
import {showToast} from "../../utils/contact.ts"

const Contact = () => {

  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' })
  const [toast, setToast] = useState<ToastType>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    try{
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID!,
        import.meta.env.VITE_TEMPLATE_ID!,
        {from_name: formData.name, to_name: "Gerardo", from_email: formData.email, to_email: "thegera4@hotmail.com", message: formData.message},
        import.meta.env.VITE_PUBLIC_KEY!
      )
      showToast("success", "Thanks for your message!", setToast)
      setFormData({ name: '', email: '', message: '' })
    } catch (e) {
      console.error("Error in email service: " + e)
      showToast("error", "Error with email service, try again later.", setToast)
    } finally {
      setIsLoading(false)
    }
    formRef!.current!.reset()
    setIsLoading(false)
  }

  return (
    <section className="c-space my-20" id="contact">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen"/>
        <div className="contact-container">
          <h3 className="head-text">Let's Talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you're looking to build something new, or just need some help with what you already have, I'm here
            to help.
          </p>
          <Form formData={formData} isLoading={isLoading} formRef={formRef} handleSubmit={handleSubmit} handleChange={handleChange}/>
        </div>
      </div>
      { toast && <Toast type={toast.type} text={toast.text} /> }
    </section>
  )
}

export default Contact