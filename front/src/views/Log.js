import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
// store
import { useDispatch, useSelector } from "react-redux";
// Components + styled-component
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import {
  getError,
  signIn,
  resetState,
  getErrorMessage,
} from "../store/slices/user.slice";
import logo from "../img/logo.png";
import styles from "../styles/index.module.css";
import PopupError from "../components/PopupMsg";

const Log = () => {
  const dispatch = useDispatch();
  const isErr = useSelector(getError);
  const errMsg = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  return (
    <div>
      {isErr ? (
        <>
          <div >
            <PopupError isError={isErr} message={errMsg} />
          </div>
        </>
      ) : null}
      <Router>
        <FormLogin />
      </Router>
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
    dispatch(resetState());
    await dispatch(signIn({ login, password }))
      .then((docs) => {
        history.push("/");
      })
      
  };

  return (
    <MainContainer>
      <ImgContainer>
        <img src={logo} alt="logo" />
      </ImgContainer>

      <Container
        className={`${styles.bk_grey_dark} ${styles.fc_white} ${styles.br_5} ${styles.fs_13}`}
      >
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Identifiant</Form.Label>
            <Form.Control
              className={styles.fs_13}
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
              className={styles.fs_13}
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => {
                dispatch(resetState());
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button
            className={`w-100 ${styles.fs_13}`}
            variant="primary"
            type="submit"
          >
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

export default Log;
