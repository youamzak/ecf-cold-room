import React, { useState } from "react";
import styled from "styled-components";
import {
  gc_grey_middle,
 } from "../styles/index.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/index.module.css";
import PopupError from "../components/PopupMsg";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfos, updatePassword } from "../store/slices/user.slice";

const User = () => {
  const [psw1, setPsw1] = useState("");
  const [psw2, setPsw2] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const userInfos = useSelector(getUserInfos);

  const handleChangePsw = async (e) => {
    e.preventDefault();
    if (psw1.length < 8 || psw2.length < 8) {
      setIsErr(true);
      setErrMsg("Mots de passes trop court");
      return;
    }

    if (psw1 !== psw2) {
      setIsErr(true);
      setErrMsg("Mots de passes différents");
      return;
    }

    await dispatch(updatePassword({ userId: userInfos._id, password: psw1 }))
      .then((docs) => {
        setPsw1("");
        setPsw2("");
        setIsSuccess(true)
      })
      
  };
  
  return (
    <div>
      {isErr ? (
        <>
          <PopupError isError={isErr} message={errMsg} />
        </>
      ) : null}
      {isSuccess ? (
        <>
          <PopupError isSuccess={isSuccess} message="Mot de passe modifié" />
        </>
      ) : null}
      <UserContainer>
        <div> 
          <p className={`${styles.fs_24_bold} ${styles.fc_white}`}>Changer mot de passe</p> 
        </div>
        <Container
          className={`${styles.bk_grey_dark} ${styles.fc_white} ${styles.br_5} ${styles.fs_13}`}
        >
          
          <Form onSubmit={handleChangePsw}>
            <Form.Group className="mb-3" controlId="formBasicLogin">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                className={styles.fs_13}
                type="password"
                placeholder="Nouveau mot de passe"
                value={psw1}
                onChange={(e) => {
                  setPsw1(e.target.value);
                  setIsErr(false);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control
                className={styles.fs_13}
                type="password"
                placeholder="Confirmer mot de passe"
                value={psw2}
                onChange={(e) => {
                  setPsw2(e.target.value);
                  setIsErr(false);
                }}
              />
            </Form.Group>

            <Button
              className={`w-100 ${styles.fs_13}`}
              variant="primary"
              type="submit"
            >
              Valider
            </Button>
          </Form>
        </Container>
      </UserContainer>
    </div>
  );
};

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  padding: 20px;
`;

const UserContainer = styled.div`
  background-color: ${gc_grey_middle};
  width: 1398px;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default User;
