import React from "react";
import SignIn from "../components/SignIn";
import Register from "../components/Register";

class SignInContainer extends React.Component {
  render() {
    const { handleSignIn, handleSubmit } = this.props;
    return (
      <div>
        <SignIn handleSignIn={handleSignIn} />
        <Register handleSubmit={handleSubmit} />
      </div>
    );
  }
}

export default SignInContainer;
