import { Link, NavLink } from "react-router-dom";
import "../style/styles.css";

export const NavBar = () => {
  // d-flex = enable flexbox
  // justify-content-end: justify links to right-hand side
  return (
    <nav className="styled-navbar navbar d-flex justify-content-end navbar-expand-lg navbar-light">
      <NavLink className="navlink text-dark" to="/thoughts">
        Thoughts
      </NavLink>
      <NavLink className="navlink text-dark" to="/about">
        About
      </NavLink>
      <NavLink className="navlink text-dark" to="#">
        🔒
      </NavLink>
    </nav>
  );
};
