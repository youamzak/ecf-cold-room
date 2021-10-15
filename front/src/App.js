import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// store
import { useDispatch, useSelector } from "react-redux";
import { getAuthentication, verifyToken } from "./store/slices/user.slice";

import Header from "./components/Header";

//Views + components
import Log from "./views/Log";
import Home from "./views/Home";
import Menu1 from "./views/Menu1";
import Menu2 from "./views/Menu2";
import Nav from "./components/Nav";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuthentication);
  useEffect(() => {
    const controlToken = async () => {
      await dispatch(verifyToken());
    };

    controlToken();
  }, [dispatch, isAuthenticated]);

  return (
    <>
      {!isAuthenticated ? (
        <Log />
      ) : (
        <>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home}>
                <Home />
              </Route>
              <Route path="/menu1" component={Menu1}>
                <Menu1 />
              </Route>
              <Route path="/menu2" component={Menu2}>
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
