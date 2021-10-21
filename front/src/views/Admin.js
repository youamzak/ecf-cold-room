import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gc_grey_middle } from "../styles/index.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/index.module.css";
import PopupError from "../components/PopupMsg";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getUserInfos,
  updatePassword,
  signUp,
  resetInfos as userResetInfos,
} from "../store/slices/user.slice";
import {
  createOfficine,
  getOfficines,
  resetInfos as officineResetInfos,
} from "../store/slices/officine.slice";
import {
  createColdRoom,
  getColdRooms,
  addMesurementToColdroom,
  resetInfos as coldRoomResetInfos,
} from "../store/slices/coldRoom.slice";

const Admin = () => {
  const dispatch = useDispatch();

  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const userInfos = useSelector(getUserInfos);
  const userRole = useSelector((state) => state.user.user.role);

  const userList = useSelector((state) => state.user.userList);
  const coldRoomList = useSelector((state) => state.coldRoom.coldRooms);
  const officineList = Object.entries(
    useSelector((state) => state.officine.officines)
  );
  const [userOfficine, setUserOfficine] = useState([]);
  const [userTechnician, setUserTechnician] = useState([]);

  //Change password
  const [psw1, setPsw1] = useState("");
  const [psw2, setPsw2] = useState("");

  //Change tech password
  const [psw3, setPsw3] = useState("");
  const [psw4, setPsw4] = useState("");
  const [technician, setTechnician] = useState("");

  //Create user
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const isErrorUser = useSelector((state) => state.user.isError);
  const errMsgUser = useSelector((state) => state.user.errorMessage);
  const isCreatedUser = useSelector((state) => state.user.isCreated);

  //Create officine
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [owner, setOwner] = useState("");
  const isErrorOfficine = useSelector((state) => state.officine.isError);
  const errMsgOfficine = useSelector((state) => state.officine.errorMessage);
  const isSuccessOfficine = useSelector((state) => state.officine.isSuccess);

  //Create cold room
  const [reference, setReference] = useState("");
  const [officine, setOfficine] = useState("");
  const isErrorColdRoom = useSelector((state) => state.coldRoom.isError);
  const errMsgColdRoom = useSelector((state) => state.coldRoom.errorMessage);
  const isSuccessColdRoom = useSelector((state) => state.coldRoom.isSuccess);

  //Upload measure
  const [coldRoom, setColdRoom] = useState("");
  const [fileToUp, setFileToUp] = useState("");

  // Use effects
  useEffect(() => {
    dispatch(userResetInfos());
    dispatch(officineResetInfos());
    dispatch(coldRoomResetInfos());
    resetLocalState();

    dispatch(getUser());
    dispatch(getColdRooms());
    dispatch(getOfficines());
  }, [dispatch]);

  //useEffect to update the list
  useEffect(() => {
    dispatch(getUser());
    if (isCreatedUser) setIsSuccess(true);
    setSuccessMsg("Utilisateur créé");
  }, [isCreatedUser]);

  useEffect(() => {
    dispatch(getOfficines());
    if (isSuccessOfficine) setIsSuccess(true);
    setSuccessMsg("Officine créée");
  }, [isSuccessOfficine]);

  useEffect(() => {
    dispatch(getOfficines());
    if (isSuccessColdRoom) setIsSuccess(true);
    setSuccessMsg("Chambre froide créée/mise à jour");
  }, [isSuccessColdRoom]);

  //Every time the userList has changed
  useEffect(() => {
    setUserOfficine(userList.filter((el) => el.role === "officine"));
    setUserTechnician(userList.filter((el) => el.role === "technicien"));
  }, [userList]);

  useEffect(() => {
    if (isErrorUser) setIsErr(true);
    setErrMsg(errMsgUser);
  }, [isErrorUser]);

  useEffect(() => {
    if (isErrorOfficine) setIsErr(true);
    setErrMsg(errMsgOfficine);
  }, [isErrorOfficine]);

  useEffect(() => {
    if (isErrorColdRoom) setIsErr(true);
    setErrMsg(errMsgColdRoom);
  }, [isErrorColdRoom]);

  const resetLocalState = () => {
    setIsErr(false);
    setErrMsg("");
    setIsSuccess(false);
    setSuccessMsg("");
  };
  /**Change password function */
  const handleChangePsw = async (e) => {
    e.preventDefault();
    resetLocalState();
    dispatch(userResetInfos());
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
        setIsSuccess(true);
        setSuccessMsg("Mot de passe modifié");
      })
      
  };

  /**Change tech password function */
  const handleChangeTechPsw = async (e) => {
    e.preventDefault();
    resetLocalState();
    dispatch(userResetInfos());
    if (psw3.length < 8 || psw4.length < 8) {
      setIsErr(true);
      setErrMsg("Mots de passes trop court");
      return;
    }

    if (psw3 !== psw4) {
      setIsErr(true);
      setErrMsg("Mots de passes différents");
      return;
    }

    await dispatch(updatePassword({ userId: technician, password: psw3 }))
      .then((docs) => {
        setPsw1("");
        setPsw2("");
        setIsSuccess(true);
        setSuccessMsg("Mot de passe modifié");
      })
      
  };

  /**Create user function */
  const handleCreateUser = async (e) => {
    e.preventDefault();
    resetLocalState();
    dispatch(userResetInfos());
    await dispatch(signUp({ login, password, role }));
  };

  /**Create officine function */
  const handleCreateOfficine = async (e) => {
    e.preventDefault();
    resetLocalState();
    dispatch(officineResetInfos());
    await dispatch(createOfficine({ name, address, city, phone, owner }));
  };

  /**Create cold room function */
  const handleCreateColdRoom = async (e) => {
    e.preventDefault();
    resetLocalState();
    dispatch(coldRoomResetInfos());
    await dispatch(createColdRoom({ reference, officine }));
  };

  /**upload measure function */
  const handleUploadMeasure = async (e) => {
    e.preventDefault();
    resetLocalState();
    dispatch(coldRoomResetInfos());
    const data = new FormData();
    data.append("upload", fileToUp);
    data.append("coldRoom", coldRoom);
    await dispatch(addMesurementToColdroom(data));
  };

  /**Creation of the officine dropdown list */
  const dropDownOfficinelist = () => {
    if (officineList !== undefined && officineList.length !== 0) {
      return officineList.map((officine) =>
        officine.map((el) => (
          <Dropdown.Item eventKey={el._id}>{el.name}</Dropdown.Item>
        ))
      );
    }
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
          <PopupError isSuccess={isSuccess} message={successMsg} />
        </>
      ) : null}
      <UserContainer>
        <FormContainer>
          <TitleContainer>
            <p className={`${styles.fs_16_bold} ${styles.fc_white}`}>
              Changer mot de passe
            </p>
          </TitleContainer>
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
        </FormContainer>
        {userRole === "administrateur" ? (
          <>
            <FormContainer>
              <TitleContainer>
                <p className={`${styles.fs_16_bold} ${styles.fc_white}`}>
                  Changer mot de passe <br />
                  technicien
                </p>
              </TitleContainer>
              <Container
                className={`${styles.bk_grey_dark} ${styles.fc_white} ${styles.br_5} ${styles.fs_13}`}
              >
                <Form onSubmit={handleChangeTechPsw}>
                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Nouveau mot de passe</Form.Label>
                    <Form.Control
                      className={styles.fs_13}
                      type="password"
                      placeholder="Nouveau mot de passe"
                      value={psw3}
                      onChange={(e) => {
                        setPsw3(e.target.value);
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
                      value={psw4}
                      onChange={(e) => {
                        setPsw4(e.target.value);
                        setIsErr(false);
                      }}
                    />
                  </Form.Group>

                  <Dropdown onSelect={(key, e) => setTechnician(key)}>
                    <Dropdown.Toggle
                      className="w-100"
                      variant="success"
                      id="dropdown-basic"
                    >
                      Technicien
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {userTechnician.map((user) => (
                        <Dropdown.Item eventKey={user._id}>
                          {user.login}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    className={`w-100 mt-3 ${styles.fs_13}`}
                    variant="primary"
                    type="submit"
                  >
                    Valider
                  </Button>
                </Form>
              </Container>
            </FormContainer>
            <FormContainer>
              <TitleContainer>
                <p className={`${styles.fs_16_bold} ${styles.fc_white}`}>
                  Créer utilisateur
                </p>
              </TitleContainer>
              <Container
                className={`${styles.bk_grey_dark} ${styles.fc_white} ${styles.br_5} ${styles.fs_13}`}
              >
                <Form onSubmit={handleCreateUser}>
                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                      className={styles.fs_13}
                      type="text"
                      placeholder="Nom utilisateur"
                      value={login}
                      onChange={(e) => {
                        setLogin(e.target.value);
                        setIsErr(false);
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
                        setPassword(e.target.value);
                        setIsErr(false);
                      }}
                    />
                  </Form.Group>
                  <Dropdown onSelect={(key, e) => setRole(key)}>
                    <Dropdown.Toggle
                      className="w-100 "
                      variant="success"
                      id="dropdown-basic"
                    >
                      Rôle
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="officine">
                        Officine
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="technicien">
                        Techicien
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="administrateur">
                        Administrateur
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    className={`w-100 mt-3 ${styles.fs_13}`}
                    variant="primary"
                    type="submit"
                  >
                    Valider
                  </Button>
                </Form>
              </Container>
            </FormContainer>
            <FormContainer>
              <TitleContainer>
                <p className={`${styles.fs_16_bold} ${styles.fc_white}`}>
                  Ajouter une officine
                </p>
              </TitleContainer>
              <Container
                className={`${styles.bk_grey_dark} ${styles.fc_white} ${styles.br_5} ${styles.fs_13}`}
              >
                <Form onSubmit={handleCreateOfficine}>
                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      className={styles.fs_13}
                      type="text"
                      placeholder="Nom de l'officine"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      className={styles.fs_13}
                      type="text"
                      placeholder="Adresse"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control
                      className={styles.fs_13}
                      type="text"
                      placeholder="Ville"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Numéro de téléphone</Form.Label>
                    <Form.Control
                      className={styles.fs_13}
                      type="text"
                      placeholder="Numéro de téléphone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Dropdown onSelect={(key, e) => setOwner(key)}>
                    <Dropdown.Toggle
                      className="w-100"
                      variant="success"
                      id="dropdown-basic"
                    >
                      Liste client
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {userOfficine.map((user) => (
                        <Dropdown.Item eventKey={user._id}>
                          {user.login}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    className={`w-100 mt-3 ${styles.fs_13}`}
                    variant="primary"
                    type="submit"
                  >
                    Ajouter
                  </Button>
                </Form>
              </Container>
            </FormContainer>
            <FormContainer>
              <TitleContainer>
                <p className={`${styles.fs_16_bold} ${styles.fc_white}`}>
                  Ajouter une chambre froide
                </p>
              </TitleContainer>
              <Container
                className={`${styles.bk_grey_dark} ${styles.fc_white} ${styles.br_5} ${styles.fs_13}`}
              >
                <Form onSubmit={handleCreateColdRoom}>
                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Référence</Form.Label>
                    <Form.Control
                      className={styles.fs_13}
                      type="text"
                      placeholder="Référence"
                      value={reference}
                      onChange={(e) => {
                        setReference(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Dropdown onSelect={(key, e) => setOfficine(key)}>
                    <Dropdown.Toggle
                      className="w-100"
                      variant="success"
                      id="dropdown-basic"
                    >
                      Officine
                    </Dropdown.Toggle>

                    <Dropdown.Menu>{dropDownOfficinelist()}</Dropdown.Menu>
                  </Dropdown>

                  <Button
                    className={`w-100 mt-3 ${styles.fs_13}`}
                    variant="primary"
                    type="submit"
                  >
                    Ajouter
                  </Button>
                </Form>
              </Container>
            </FormContainer>
          </>
        ) : (
          <>
            <FormContainer>
              <TitleContainer>
                <p className={`${styles.fs_16_bold} ${styles.fc_white}`}>
                  Upload mesures
                </p>
              </TitleContainer>
              <Container
                className={`${styles.bk_grey_dark} ${styles.fc_white} ${styles.br_5} ${styles.fs_13}`}
              >
                <Form onSubmit={handleUploadMeasure}>
                  <Form.Group
                    onChange={(e) => setFileToUp(e.target.files[0])}
                    controlId="formFile"
                    className="mb-3"
                  >
                    <Form.Label>Fichier de mesures</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>

                  <Dropdown onSelect={(key, e) => setColdRoom(key)}>
                    <Dropdown.Toggle
                      className="w-100"
                      variant="success"
                      id="dropdown-basic"
                    >
                      Chambre froide
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {coldRoomList.map((coldRoom) => (
                        <Dropdown.Item eventKey={coldRoom._id}>
                          {coldRoom.reference}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    className={`w-100 mt-3 ${styles.fs_13}`}
                    variant="primary"
                    type="submit"
                  >
                    Valider
                  </Button>
                </Form>
              </Container>
            </FormContainer>
          </>
        )}
      </UserContainer>
    </div>
  );
};

const TitleContainer = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;
const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  padding: 20px;
`;

const UserContainer = styled.div`
  padding-top: 20px;
  background-color: ${gc_grey_middle};
  width: 1398px;
  height: 800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
  @media (max-width: 960px) {
    width: 100%;
    height: auto;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Admin;
