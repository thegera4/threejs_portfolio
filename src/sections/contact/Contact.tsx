import React, {useRef, useState} from "react"
import {ContactFormData} from "../../types.ts"
import Form from "./Form.tsx"

const Contact = () => {

  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setIsLoading(true)
    console.log(formData) // Change this line when the logic is implemented
    formRef!.current!.reset()
    setIsLoading(false)
  }

  return (
    <section className="c-space my-20">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen"/>
        <div className="contact-container">
          <h3 className="head-text">Let's Talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you're looking to build something new, or just need some help with what you already have, I'm here to help.
          </p>
          <Form formData={formData} isLoading={isLoading} formRef={formRef} handleSubmit={handleSubmit} handleChange={handleChange}/>
        </div>
      </div>
    </section>
  )
}

export default Contact