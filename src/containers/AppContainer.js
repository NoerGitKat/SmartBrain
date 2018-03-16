import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import Rank from "../components/Rank";
import Particles from "react-particles-js";
import "../styles/Global.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      faceURL: "",
      getImageLink: event => {
        this.setState({
          faceURL: event.target.value
        });
      },
      checkFace: () => {}
    };
  }

  render() {
    const { getImageLink, faceURL, user } = this.state;
    return (
      <div>
        <Particles className="particles" />
        <Navigation />
        <Logo />
        <Rank username={user.username} />
        <ImageLinkForm getImageLink={getImageLink} faceURL={faceURL} />
      </div>
    );
  }
}

export default App;
