import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import Rank from "../components/Rank";
import FaceRecognition from "../components/FaceRecognition";
import SignIn from "../components/SignIn";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import isImage from "../utils/isImage";
import "../styles/Global.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      faceURL: "",
      validImg: false,
      box: {},
      loggedIn: false,
      getImageLink: event => {
        if (isImage(event.target.value)) {
          this.setState({
            faceURL: event.target.value,
            validImg: true
          });
        } else {
          this.setState({
            faceURL: "",
            validImg: false
          });
        }
      },
      calcFaceLocation: data => {
        const faceLocation =
          data.outputs[0].data.regions[0].region_info.bounding_box;
        const ImgContainer = document.getElementById("ImgContainer");
        const widthImgContainer = Number(ImgContainer.width);
        const heightImgContainer = Number(ImgContainer.height);
        console.log("faceLocation", faceLocation);
        return {
          leftCol: faceLocation.left_col * widthImgContainer,
          rightCol:
            widthImgContainer - faceLocation.right_col * widthImgContainer,
          topRow: faceLocation.top_row * heightImgContainer,
          bottomRow:
            heightImgContainer - faceLocation.bottom_row * heightImgContainer
        };
      },
      displayFaceBox: box => {
        this.setState({
          box: box
        });
      },
      checkFace: () => {
        const app = new Clarifai.App({
          apiKey: "d3060b13869446c880c2106864843b4f"
        });
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.faceURL).then(
          response => {
            const { calcFaceLocation, displayFaceBox } = this.state;
            displayFaceBox(calcFaceLocation(response));
          },
          err => {
            // there was an error
            console.log("err", err);
          }
        );
      },
      routeChange: e => {
        e.preventDefault();
        this.setState({
          loggedIn: !this.state.loggedIn
        });
      }
    };
  }

  render() {
    const {
      getImageLink,
      faceURL,
      user,
      checkFace,
      box,
      validImg,
      loggedIn,
      routeChange
    } = this.state;

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

    console.log("loggedIn", loggedIn);

    return (
      <div>
        <Particles className="particles" params={particlesOptions} />
        <Navigation loggedIn={loggedIn} handleSignIn={routeChange} />
        <Logo />
        {!loggedIn ? (
          <SignIn handleSignIn={routeChange} />
        ) : (
          <div>
            <Rank username={user.username} />
            <ImageLinkForm getImageLink={getImageLink} checkFace={checkFace} />
            {validImg ? (
              <FaceRecognition imageURL={faceURL} box={box} />
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
