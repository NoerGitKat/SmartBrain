// Libraries
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import React from "react";

// Components
import Navigation from "../components/Navigation";
import Register from "../components/Register";
import Logo from "../components/Logo";

// Containers
import SignInContainer from "../containers/SignInContainer";
import FaceCheckContainer from "../containers/FaceCheckContainer";

// Styles
import "../styles/Global.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loggedIn: false,
      logUserIn: user => {
        this.setState({
          user: user,
          loggedIn: true
        });
      },
      loggingOut: () => {
        this.setState({
          loggedIn: false
        });
      },

      updateUser: user => {
        this.setState({
          user: user
        });
      }
    };
  }

  render() {
    const { user, loggedIn, logUserIn, loggingOut, updateUser } = this.state;

    const particlesOptions = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        }
      }
    };

    return (
      <div>
        <Particles className="particles" params={particlesOptions} />
        <Navigation loggedIn={loggedIn} logout={loggingOut} />
        <Logo />
        {!loggedIn ? (
          <div>
            <SignInContainer logUserIn={logUserIn} loggingOut={loggingOut} />
          </div>
        ) : (
          <div>
            <FaceCheckContainer user={user} updateUser={updateUser} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
