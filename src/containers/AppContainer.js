import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import Rank from "../components/Rank";
import FaceRecognition from "../components/FaceRecognition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "../styles/Global.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      faceURL: "",
      box: {},
      getImageLink: event => {
        this.setState({
          faceURL: event.target.value
        });
      },
      calcFaceLocation: data => {
        this.setState({
          box: data.outputs[0].data.regions[0].region_info.bounding_box
        });
      },
      checkFace: () => {
        const app = new Clarifai.App({
          apiKey: "d3060b13869446c880c2106864843b4f"
        });
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.faceURL).then(
          response => {
            this.state.calcFaceLocation(response);
          },
          err => {
            // there was an error
            console.log("err", err);
          }
        );
      }
    };
  }

  render() {
    const { getImageLink, faceURL, user, checkFace, box } = this.state;

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
        <Navigation />
        <Logo />
        <Rank username={user.username} />
        <ImageLinkForm getImageLink={getImageLink} checkFace={checkFace} />
        {faceURL ? <FaceRecognition imageURL={faceURL} box={box} /> : <div />}
      </div>
    );
  }
}

export default App;
