import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOfficines,
  getUserColdRooms
} from "../store/slices/user.slice";
import Card from "react-bootstrap/Card";
import coldroom from "../img/coldroom.png";
import { icone_check } from "../img/icones/icones.svg";
import styled from "styled-components";
import {
  gc_grey_middle,
  gc_blue,
  fc_blue,
  fs_24_bold,
  gc_white,
  gc_orange,
  gc_grey_dark,
} from "../styles/index.module.css";
import SimpleSlider from "../components/SimpleSlider";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/react_data_picker.css"; //override orginal style for the calendar view

const Toto = () => {
 
    const user_officine = useSelector(getUserOfficines);
    const user_coldRoom = useSelector(getUserColdRooms);

    console.log("user_officine",user_officine)
    console.log("user_coldRoom",user_coldRoom)


  

  

  return (
    <>
     <div>ceci est une page vide </div>
    </>
  );
};

const ColdRoomCard = (props) => {
  const handleChange = (e) => {
    let response = {
      dateTocheck: e,
      title: props.title,
    };
    return props.handleCalendar(response);
  };

  return (
    <ColdRoomCardContainer>
      <Card style={{ width: "214px", height: "287px", border: "none" }}>
        <Card.Img
          variant="top"
          src={coldroom}
          style={{ width: "100%", height: "138px" }}
        />
        <Card.Body>
          <Card.Title className={`${fc_blue} ${fs_24_bold}`}>
            {props.title}
          </Card.Title>
          {/* <IconeContainer > */}
          {/* {icone_calendar(80, 80)} popperClassName="data_picker" */}

          <DatePicker
            className="react-datepicker-popper "
            selected={props.startDate}
            onChange={handleChange}
          />

          {/* </IconeContainer> */}
        </Card.Body>
      </Card>
    </ColdRoomCardContainer>
  );
};

const RenderLineChart = ({ data }) => {
  return (
    <>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke={gc_blue} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  );
};

const Graph = ({ data, title }) => {
  return (
    <GraphContainer>
      <div>
        <h3>{title}</h3>
      </div>
      <RenderLineChart data={data} />
    </GraphContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1398px;
  height: 440px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${gc_grey_middle};
`;

const ColdRoomCardContainer = styled.div`
  margin-left: 100px;
`;

const ColdRoomContainer = styled.div`
  background-color: ${gc_white};
  width: 1398px;
  height: 440px;
  margin-left: auto;
  margin-right: auto;
`;

const ColdRoomInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  h2 {
    color: ${gc_orange};
  }
`;

const Chart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GraphContainer = styled.div`
  /* margin-left: 50px; */
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: ${gc_grey_dark};
  }
  /* justify-content: center; */
`;

const IconeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  svg:hover {
    path {
      fill: ${gc_orange};
    }
  }
`;
export default Toto;
