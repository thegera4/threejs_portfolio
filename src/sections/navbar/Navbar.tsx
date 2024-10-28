import {useState} from "react"
import NavItems from "./NavItems.tsx";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      {/* Desktop navbar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="#home" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Gerardo
          </a>
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img src={isMenuOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className="w-6 h-6" />
          </button>
          {/* Desktop menu */}
          <nav className="sm:flex hidden"> <NavItems /> </nav>
        </div>
      </div>
      {/* Mobile navbar */}
      <div className={`nav-sidebar ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        {/* Mobile menu */}
        <nav className="p-5"> <NavItems toggleMenu={toggleMenu}/> </nav>
      </div>
    </header>
  )
}

export default Navbar