import React, { useState , useEffect} from "react";
import { useHistory } from "react-router-dom";
// Popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// store
import { useDispatch, useSelector } from "react-redux";
// Components + styled-component
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { getError, signIn, resetState, getErrorMessage } from "../store/slices/user.slice";
import logo from "../img/logo.png";

const Log = () => {
  const dispatch = useDispatch(); 
  const isErr = useSelector(getError);
  const errMsg = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(resetState());
   
  }, [dispatch])

  const PopupError = () => (
    <StyledPopup open={isErr} modal>
      <span className="fc-white">{errMsg}</span>
    </StyledPopup>
  );

  return (
    <div>
      {isErr ? (
        <>
          <PopupError />
        </>
      ) : null}
      <FormLogin />
    </div>
  );
};

const FormLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(signIn({ login, password }))
      .unwrap()
      .then((docs) => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <MainContainer>
      <ImgContainer>
        <img src={logo} alt="logo" />
      </ImgContainer>

      <Container className="bk-grey-dark fc-white br-5 fs-13">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Identifiant</Form.Label>
            <Form.Control
              className="fs-13"
              type="text"
              placeholder="Entrer un identifiant"
              value={login}
              onChange={(e) => {
                dispatch(resetState());
                setLogin(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              className="fs-13"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => {
                dispatch(resetState());
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button className="w-100 fs-13" variant="primary" type="submit">
            Se connecter
          </Button>
        </Form>
      </Container>
    </MainContainer>
  );
};

const Container = styled.div`
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  padding: 20px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  margin-top: 50px;
`;

const StyledPopup = styled(Popup)`
  &-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100px;
    
    width: 25%;
    padding: 0px;
    border: none;
    border-radius: 5px;
    background-color: #ef353e; //red from CSS
  }
`;

export default Log;
