import React from "react";
import "../styles/Register.scss";

const Register = ({ handleSubmit }) => {
  return (
    <div id="registerComponent">
      <h1>Register</h1>
      <p>Here you can register for a new account:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First name..." required />
        <input type="email" placeholder="Email..." required />
        <input type="password" placeholder="Password..." />
        <input type="submit" value="Create!" />
      </form>
    </div>
  );
};

export default Register;
