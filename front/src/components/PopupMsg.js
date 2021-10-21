import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import { fc_red, gc_red, fc_blue } from "../styles/index.module.css";

const PopupMsg = ({ isError, isSuccess, message }) => {
  let msgList = [];
  if (isError) {
    if (message.reference) msgList.push("Référence : " + message.reference);
    if (message.officine) msgList.push("Officine : " + message.officine);

    if (message.address) msgList.push("Adresse : " + message.address);
    if (message.city) msgList.push("Ville : " + message.city);
    if (message.name) msgList.push("Nom : " + message.name);
    if (message.owner) msgList.push("Officine : " + message.owner);
    if (message.phone) msgList.push("Téléphone : " + message.phone);

    if (message.password) msgList.push("Mot de passe : " + message.password);
    if (message.login) msgList.push("Identifiant : " + message.login);
    if (
      !message.password &&
      !message.login &&
      !message.address &&
      !message.city &&
      !message.name &&
      !message.owner &&
      !message.phone &&
      !message.reference &&
      !message.officine
    )
      msgList.push("Erreur : " + message);
  }else{
    msgList.push(message);
  }

  return (
    <StyledPopup open={isError || isSuccess} modal>
      {msgList.map((e) => (
        <>
          <div className={isError ? fc_red : fc_blue}>{e}</div> <br />
        </>
      ))}
    </StyledPopup>
  );
};

const StyledPopup = styled(Popup)`
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;

    width: 30%;
    padding: 0px;
    border: none;
    border-radius: 5px;
    /* background-color: ${gc_red}; */
  }
`;

export default PopupMsg;
