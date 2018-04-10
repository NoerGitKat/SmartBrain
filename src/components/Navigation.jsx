import React from "react";
import "../styles/Navigation.scss";

const Navigation = ({ loggedIn, logout }) => {
  console.log("loggedIn Nav", loggedIn);
  return (
    <nav>
      <ul>{!loggedIn ? <li>Login</li> : <li onClick={logout}>Signout</li>}</ul>
    </nav>
  );
};

export default Navigation;
