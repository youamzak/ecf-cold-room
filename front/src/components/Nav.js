import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../img/logo_sans_nom.png";



const Nav = () => {
  return (
    <nav>
      <NavLink to="/" activeClassName="selected">
        <NavButton icone={logo} />
      </NavLink>
      <NavLink to="/menu1">Menu1</NavLink>
      <NavLink to="/menu2">Menu2</NavLink>
    </nav>
  );
};

const NavButton = (props) => (
  <img src={props.icone} alt="icone" />
)


export default Nav;
