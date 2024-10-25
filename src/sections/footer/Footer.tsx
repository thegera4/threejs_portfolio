import { openTab } from '../../utils/footer.ts'

const Footer = () => {
  return (
    <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2 cursor-pointer hover:text-white-800" onClick={():void => openTab('privacy')}>
        <p>Mobile-Apps Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        <div className="social-icon cursor-pointer hover:bg-black-500" onClick={():void => openTab('github')} >
          <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
        </div>
        <div className="social-icon cursor-pointer hover:bg-black-500" onClick={():void => openTab('linkedin')} >
          <img src="/assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2" />
        </div>
        <div className="social-icon cursor-pointer hover:bg-black-500" onClick={():void => openTab('playstore')}>
          <img src="/assets/playstore.svg" alt="playstore" className="w-1/2 h-1/2" />
        </div>
      </div>
      <p className="text-white-500">Made with ❤️ Juan Gerardo Medellin Ibarra</p>
    </section>
  )
}

export default Footer