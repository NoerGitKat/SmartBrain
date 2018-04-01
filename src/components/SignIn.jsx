import React from "react";
import "../styles/SignIn.scss";

const SignIn = ({ handleSignIn }) => {
  return (
    <div id="signInComponent">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="E-mail..."
          name="email"
          id="email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password..."
          required
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
