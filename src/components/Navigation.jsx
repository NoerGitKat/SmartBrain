import React from "react";
import "../styles/Navigation.scss";

const Navigation = ({ loggedIn, handleSignIn }) => {
  console.log("loggedIn Nav", loggedIn);
  return (
    <nav>
      <ul>
        {!loggedIn ? (
          <ul>
            <li>Login</li>
            <li>Register</li>
          </ul>
        ) : (
          <li onClick={handleSignIn}>Signout</li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
