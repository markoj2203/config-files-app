import React, { useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import { changeTab } from "../functions/main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  const test = false;

  useEffect(() => {
    changeTab("tab-1");
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto p-0">
            <div className="card">
              <div className="login-box">
                <div className="login-snip">
                  <input
                    id="tab-1"
                    type="radio"
                    name="tab"
                    className="sign-in"
                  />
                  <Link
                    to="/login"
                    htmlFor="tab-1"
                    className="tab"
                    onClick={() => changeTab("tab-1")}
                  >
                    Login
                  </Link>
                  <input
                    id="tab-2"
                    type="radio"
                    name="tab"
                    className="sign-up"
                  />
                  <Link
                    to="/signup"
                    htmlFor="tab-2"
                    className="tab"
                    onClick={() => changeTab("tab-2")}
                  >
                    Sign Up
                  </Link>
                  <Switch>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/signup">
                      <SignUp />
                    </Route>
                    <Route exact path="/">
                      {test === true ? <Home /> : <Redirect to="/login" />}
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
