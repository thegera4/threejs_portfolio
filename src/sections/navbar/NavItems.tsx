import { navLinks } from "../../constants";

const NavItems = () => {
  return (
    <ul className="nav-ul">
      { navLinks.map((link) => (
        <li key={link.id} className="nav-li">
          <a href={link.href} className="nav-li_a" onClick={() => {}}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default NavItems