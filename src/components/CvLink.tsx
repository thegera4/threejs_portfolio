import CV from '../assets/CV8.pdf'

const CvLink = () => {
  return (
    <a download href={CV} className="text-white-500 hover:text-white-800 hover:animate-pulse cursor-pointer">
      Download my CV
    </a>
  )
}
export default CvLink