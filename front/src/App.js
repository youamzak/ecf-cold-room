import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// store
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthentication,
    verifyToken,
} from "./store/slices/user.slice";

//Views + components
import Header from "./components/Header";
import Log from "./views/Log";
import Home from "./views/Home";
import User from "./views/User";
import Admin from "./views/Admin";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuthentication);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector(state => state.user.user.role)

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
