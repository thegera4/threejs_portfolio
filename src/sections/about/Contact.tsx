import {useState} from "react"

const Contact = () => {

  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = (): void => {
    navigator.clipboard.writeText("thegera4@hotmail.com").then(r => r)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <div className="xl:col-span-1 xl:row-span-2">
      <div className="grid-container">
        <img src="/assets/grid4.png" alt="grid4"
             className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"/>
        <div className="space-y-2">
          <p className="grid-subtext text-center">Contact Me (copy my email)</p>
          <div className="copy-container" onClick={handleCopy}>
            <img src={isCopied ? "assets/tick.svg" : "assets/copy.svg"} alt="copy"/>
            <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">thegera4@hotmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact