import CV from '../assets/CV8.pdf'

const CvLink = () => {
  return (
    <a download href={CV} className="text-white-500 hover:text-white-800 hover:animate-pulse cursor-pointer">
      Made with ❤️ Juan Gerardo Medellin Ibarra
    </a>
  )
}
export default CvLink