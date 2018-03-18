import React from "react";
import "../styles/SignIn.scss";

const SignIn = ({ handleSignIn }) => {
  return (
    <div>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">E-mail Address</label>
        <input
          type="email"
          placeholder="E-mail adress"
          name="email"
          id="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
