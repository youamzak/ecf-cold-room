import React from "react";
import styled from "styled-components";
import logo from "../img/logo_sans_nom.png";
import Nav from "./Nav";

const Header = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <ImgContainer>
          <img src={logo} alt="logo" />
        </ImgContainer>
        {/* <NavContainer> */}
          <Nav />
        {/* </NavContainer> */}
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  height: 102px;
  width: 1398px;
`;

const ImgContainer = styled.div`
  margin-left: 24px;

  height: 80px;
  width: 100px;
  img {
    height: 100%;
    width: 100%;
  }
`;

export default Header;
