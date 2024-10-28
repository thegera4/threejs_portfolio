import { navLinks } from "../../constants"
import {NavItemsProps} from "../../types.ts"

const NavItems = ({toggleMenu}: NavItemsProps) => {

  return (
    <ul className="nav-ul">
      { navLinks.map((link) => (
        <li key={link.id} className="nav-li">
          <a href={link.href} className="nav-li_a" onClick={toggleMenu}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default NavItems