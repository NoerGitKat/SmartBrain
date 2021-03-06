import React from "react";
import "../styles/Register.scss";

const Register = ({ handleSubmit, registered, err }) => {
  const registeredMsgStyle = {
    display: "flex",
    margin: "5em auto 0"
  };

  const errorMsgStyle = {
    display: "flex",
    backgroundColor: "black",
    color: "red",
    justifyContent: "center"
  };
  return (
    <div id="registerComponent">
      {registered ? (
        <p style={registeredMsgStyle}>Please sign in above!</p>
      ) : (
        <div>
          <h1>Register</h1>
          <p>Here you can register for a new account:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="registerName"
              placeholder="First name..."
              required
            />
            <input
              type="email"
              name="registerEmail"
              placeholder="Email..."
              required
            />
            <input
              type="password"
              name="registerPassword"
              placeholder="Password..."
            />
            <input type="submit" value="Create!" />
          </form>
          <div style={err ? errorMsgStyle : {}}>{err}</div>
        </div>
      )}
    </div>
  );
};

export default Register;
