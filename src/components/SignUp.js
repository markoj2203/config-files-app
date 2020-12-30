import React, { useState } from "react";
import axios from "axios";
import { validateEmail } from "../functions/main";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [checkErr, setCheckErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    if (email === "" || pass === "" || pass2 === "") {
      setCheckErr(true);
      setErrorMessage("You have a empty fields, all fields are required!");
    } else {
      if (validateEmail(email) === false) {
        setCheckErr(true);
        setErrorMessage("You have entered an invalid email address!");
      } else if (pass !== pass2) {
        setCheckErr(true);
        setErrorMessage("Passwords are not equal!");
      } else {
        axios({
          method: "post",
          url:
            "https://l5ov8zep98.execute-api.us-west-2.amazonaws.com/api/register",
          data: { email: email, password: pass, password2: pass2 },
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            //handle success
            setCheckErr(false);
            setErrorMessage("User succesfully registred!Login to start app!");
          })
          .catch(function (error) {
            //handle error
            if (error.response) {
              // Request made and server responded
              setCheckErr(true);
              setErrorMessage(error.response.data.Message);
            }
          });
      }
    }
  };

  return (
    <div className="login-space">
      <div className="sign-up-form">
        <div className="group">
          <label htmlFor="pass" className="label">
            Email Address
          </label>
          <input
            id="pass"
            type="text"
            className="input"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Password
          </label>
          <input
            id="pass"
            type="password"
            className="input"
            data-type="password"
            placeholder="Create your password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Repeat Password
          </label>
          <input
            id="pass"
            type="password"
            className="input"
            data-type="password"
            placeholder="Repeat your password"
            onChange={(e) => setPass2(e.target.value)}
          />
        </div>
        <div className="group">
          <input
            type="submit"
            className="button"
            value="Sign Up"
            onClick={registerUser}
          />
        </div>
        <div className={checkErr === true ? "text-danger" : "text-success"}>
          {errorMessage}
        </div>
        <div className="hr"></div>
      </div>
    </div>
  );
}
