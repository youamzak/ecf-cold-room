import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/user.slice";
import styled from "styled-components";
import { icone_user, icone_logout } from "../img/icones/icones.svg";
import { gc_orange, fs_24_bold, fc_middle } from "../styles/index.module.css";

const Nav = () => {
  const userRole = useSelector((state) => state.user.user.role);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout())
      .unwrap()
      .then((docs) => {
        history.push("/");
      })
      
  };

  return (
    <>
      <NavHome>
        <NavLink to="/">
          <h1 className={`${fs_24_bold} ${fc_middle}`}>rd temp</h1>
        </NavLink>
      </NavHome>
      <NavContainer>
        {userRole==="officine" ? (
          <NavLink to="/menu1">
          <IconeContainer>{icone_user(32, 32)}</IconeContainer>
        </NavLink>
        ) : ""}
        
        <NavLink to="/">
          <IconeContainer onClick={handleLogout}>
            {icone_logout(32, 32)}
          </IconeContainer>
        </NavLink>
      </NavContainer>
    </>
  );
};

const IconeContainer = styled.div`
  margin-right: 10px;
  svg:hover {
    path {
      fill: ${gc_orange};
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 100%;
`;

const NavHome = styled.div`
  padding-left: 50px;
  width: 300px;
  height: 28px;
  a {
    text-decoration: none;
    &:hover{
      h1 {
        color: ${gc_orange};
      }
      
    }
  }

  @media (max-width: 768px) {
    padding-left: 10px;
  }
`;
export default Nav;
