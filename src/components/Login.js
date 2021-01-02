import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { validateEmail } from "../functions/main";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [checkErr, setCheckErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();

    if (email === "" || pass === "") {
      setCheckErr(true);
      setErrorMessage("You have a empty fields, all fields are required!");
    } else {
      if (validateEmail(email) === false) {
        setCheckErr(true);
        setErrorMessage("You have entered an invalid email address!");
      } else {
        axios({
          method: "post",
          url:
            "https://l5ov8zep98.execute-api.us-west-2.amazonaws.com/api/login",
          data: { email: email, password: pass },
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            //handle success
            dispatch({ type: "GET_AUTH_TOKEN", token: response.data.token });
          })
          .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              setCheckErr(true);
              setErrorMessage(error.response.data.Message);
              console.log(error.response.data.Message);
              //console.log(error.response.headers);
            }
          });
      }
    }
  };

  return (
    <div className="login-space">
      <div className="login">
        <div className="group">
          {" "}
          <label htmlFor="user" className="label">
            Email
          </label>{" "}
          <input
            id="user"
            type="text"
            className="input"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </div>
        <div className="group">
          {" "}
          <label htmlFor="pass" className="label">
            Password
          </label>{" "}
          <input
            id="pass"
            type="password"
            className="input"
            data-type="password"
            placeholder="Enter your password"
            onChange={(e) => setPass(e.target.value)}
          />{" "}
        </div>
        <div className="group">
          {" "}
          <input
            type="submit"
            className="button"
            value="Sign In"
            onClick={loginUser}
          />{" "}
        </div>
        <div className={checkErr === true ? "text-danger" : "text-success"}>
          {errorMessage}
        </div>
        <div className="hr"></div>
      </div>
    </div>
  );
}
