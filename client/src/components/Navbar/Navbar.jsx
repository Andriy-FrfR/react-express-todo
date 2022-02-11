import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink to="/" className="brand-logo center">React Todo</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/logout">Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
