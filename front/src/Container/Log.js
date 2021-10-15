import {setUserInfo, resetUserInfo}  from "../store"

import { connect } from "react-redux";
import Log from "../views/Log";

const mapStateToProps = (state) => {
  return {
    id: state.id,
    email: state.email,
    firstname: state.firstname,
    name: state.name,
    group: state.group,
    service: state.service,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userInfos) => {
      dispatch(setUserInfo(userInfos));
    },
    logoutUser: () => {
      dispatch(resetUserInfo());
    },
  };
};

const LogContainer = connect(mapStateToProps, mapDispatchToProps)(Log);

export default LogContainer;