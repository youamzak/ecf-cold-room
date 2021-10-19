import React from 'react'
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import {fc_white, fc_red, gc_red,fc_blue} from '../styles/index.module.css';

const PopupMsg = ({isError, isSuccess, message}) => {

  return (
    <StyledPopup open={isError || isSuccess} modal>
      <span className={isError ? fc_red : fc_blue}>{message}</span>
    </StyledPopup>
  )
}

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
    /* background-color: ${gc_red}; */
  }
`;

export default PopupMsg
