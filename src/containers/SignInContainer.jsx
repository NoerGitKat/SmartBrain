import React from "react";
import SignIn from "../components/SignIn";
import Register from "../components/Register";

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggingIn: e => {
        e.preventDefault();
        fetch("http://localhost:3001/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: e.target[0].value,
            password: e.target[1].value
          })
        })
          .then(response => response.json(response))
          .then(data => {
            const { logUserIn, loggingOut } = this.props;
            console.log("response data", data);
            if (
              data.message === "Submitted wrong credentials!" ||
              data.message === "database empty" ||
              data.length === 0
            ) {
              console.log("logging outttttt");
              loggingOut();
              this.setState({
                errorMsg: data.message
              });
            } else {
              logUserIn(data[0]);
            }
          })
          .catch(err => {
            console.log("err", err);
            this.setState({
              errorMsg: err.message
            });
          });
      },
      registerSubmit: e => {
        e.preventDefault();
        console.log("register user", e.target[0].value);
        fetch("http://localhost:3001/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: {
              name: e.target[0].value,
              email: e.target[1].value,
              password: e.target[2].value
            }
          })
        })
          .then(response => response.json(response))
          .then(user => {
            console.log("user register", user);
            if (user.name === "error") {
              this.setState({
                registerErr: "Unable to register!"
              });
            } else {
              this.setState({
                registered: true
              });
            }
          })
          .catch(err => console.log("err", err));
      },
      registering: false,
      registered: false,
      errorMsg: "",
      registerErr: "",
      toRegister: () => {
        this.setState({
          registering: true
        });
      }
    };
  }

  render() {
    const {
      loggingIn,
      registerSubmit,
      toRegister,
      registering,
      registered,
      errorMsg,
      registerErr
    } = this.state;
    const registerBtnStyle = {
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
      <div>
        <SignIn handleSignIn={loggingIn} />
        <div style={errorMsg ? errorMsgStyle : {}}>
          <p>{errorMsg}</p>
        </div>
        {registering ? (
          <Register
            handleSubmit={registerSubmit}
            registered={registered}
            err={registerErr}
          />
        ) : (
          <button style={registerBtnStyle} onClick={toRegister}>
            Register
          </button>
        )}
      </div>
    );
  }
}

export default SignInContainer;
