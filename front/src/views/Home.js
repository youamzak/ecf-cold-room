import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getColdRoomMeasurement,
  switchValidationDayColdroom,
} from "../store/slices/coldRoom.slice";
import { getUserColdRooms } from "../store/slices/user.slice";
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
import { ResponsiveContainer } from "recharts/lib/component/ResponsiveContainer";

const Home = () => {
  const [coldRoomRef, setColdRoomRef] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dataTemperature, setDataTemperature] = useState([]);
  const [dataHumidity, setDataHumidity] = useState([]);
  const [idMeasurement, setIdMeasurement] = useState("");
  const [isValidMeasurement, setIsValidMeasurement] = useState(false);

  const coldRoomsList = useSelector(getUserColdRooms);

  const dispatch = useDispatch();

  /**Show the graph */
  const handleCalendar = async (e) => {
    const myDate = e.dateTocheck.toString().split(" ");
    const newDate =
      Date.parse(`${myDate[2]} ${myDate[1]} ${myDate[3]} 00:00:00 GMT+0200`) /
      1000;

    await dispatch(
      getColdRoomMeasurement({
        reference: e.title,
        uploadDay: newDate.toString(),
      })
    )
      .unwrap()
      .then((docs) => {
        if (docs.length === 0) return;
        const tmpHygrometry = [];
        const tmpTemperature = [];

        setIdMeasurement(docs[0]._id);
        setIsValidMeasurement(docs[0].isValid);

        docs[0].hygrometry.forEach((element) => {
          const newDate = new Date(element.timestamp * 1000);
          const name = `${newDate.getHours()}:${newDate.getMinutes()}`;
          tmpHygrometry.push({
            name,
            uv: element.measure,
            pv: 2400,
            amt: 2400,
          });
        });

        docs[0].temperatures.forEach((element) => {
          const newDate = new Date(element.timestamp * 1000);
          const name = `${newDate.getHours()}:${newDate.getMinutes()}`;
          tmpTemperature.push({
            name,
            uv: element.measure,
            pv: 2400,
            amt: 2400,
          });
        });

        setColdRoomRef(e.title);
        setStartDate(e.dateTocheck);

        setDataHumidity(tmpHygrometry);
        setDataTemperature(tmpTemperature);
      })
      
  };

  /**Switch the validation of the day */
  const handleValid = (e) => {
    e.preventDefault();
    dispatch(switchValidationDayColdroom({ idMeasurement }));
  };

  /**Generate the list of the card */
  const listColdRooms = coldRoomsList.map((el) => (
    <ColdRoomCard
      key={el.toString()}
      title={el.reference}
      handleCalendar={handleCalendar}
      startDate={startDate}
    />
  ));

  return (
    <>
      <CardContainer>
        <SimpleSlider list={listColdRooms} />
      </CardContainer>

      {coldRoomRef ? (
        <ColdRoomContainer>
          <ColdRoomInfoContainer>
            <h2>
              {`${coldRoomRef} : ${startDate.toLocaleDateString("fr-FR")}`}
            </h2>
            <IconeContainer onClick={handleValid}>
              {icone_check(
                46,
                46,
                isValidMeasurement ? gc_orange : gc_grey_middle
              )}
            </IconeContainer>
          </ColdRoomInfoContainer>
          <Chart>
            {/* <GraphContainer> */}
            <Graph data={dataTemperature} title="Température" />
            {/* </GraphContainer> */}
            {/* <GraphContainer> */}
            <Graph data={dataHumidity} title="Humidité" />
            {/* </GraphContainer> */}
          </Chart>
        </ColdRoomContainer>
      ) : (
        ""
      )}
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
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        
        
        data={data}
        margin={{ top: 5, right: 25, bottom: 5, left: -20 }}
      >
        <Line type="monotone" dataKey="uv" stroke={gc_blue} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
      </ResponsiveContainer>
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

  @media (max-width: 960px) {
    width: 100%;
    height: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
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
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    
    }
  @media (max-width: 960px) {
    width: 100%;
    height: auto;
  }
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
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    h2 {
      width: 200px;
    }
  }
  @media (max-width: 960px) {
    width: 100%;
    height: auto;
  }
`;

const Chart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    
    }
  @media (max-width: 960px) {
    width: 100%;
    height: auto;
    flex-wrap: wrap;
  }
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
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    
    }
  @media (max-width: 960px) {
    width: 100%;
    height: auto;
  }
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
export default Home;
