import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// store
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthentication,
  getIsOfficine,
  verifyToken,
} from "./store/slices/user.slice";
import { setColdRooms } from "./store/slices/coldRoom.slice";

//Views + components
import Header from "./components/Header";
import Log from "./views/Log";
import Home from "./views/Home";
import User from "./views/User";
import Menu2 from "./views/Menu2";
import Menu3 from "./views/Menu2";
import Toto from "./views/Toto";
import Admin from "./views/Admin";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuthentication);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector(state => state.user.user.role)
  console.log(role)
  useEffect(() => {
    const controlToken = async () => {
      await dispatch(verifyToken());
    };

    controlToken();
  }, [dispatch, isLoggedIn]);

  return (
    <>
      {!isAuthenticated ? (
        <Log />
      ) : (
        // <Toto/>
        <>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" >
                {role==="administrateur" || role==="technicien" ? <Admin /> : <Home />}
              </Route>
              <Route path="/menu1" >
                <User />
              </Route>
              <Route path="/menu2" >
                <Menu2 />
              </Route>
              <Route>
                <Home />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
