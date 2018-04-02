import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import Rank from "../components/Rank";
import FaceRecognition from "../components/FaceRecognition";
import SignInContainer from "../containers/SignInContainer";
import Register from "../components/Register";
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

        app.models
          .predict(Clarifai.FACE_DETECT_MODEL, this.state.faceURL)
          .then(response => {
            const { calcFaceLocation, displayFaceBox, user } = this.state;
            if (response) {
              fetch("http://localhost:3001/image", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: user.id
                })
              })
                .then(response => response.json(response))
                .then(user => {
                  this.setState({
                    user: user
                  });
                });
            }
            displayFaceBox(calcFaceLocation(response));
          });
      },
      loggingIn: e => {
        e.preventDefault();

        this.setState({
          user: {
            name: e.target[0].value
          }
        });

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
            this.setState({
              user: data,
              loggedIn: true
            });
          })
          .catch(err => console.log("err", err));
      },
      loggingOut: () => {
        this.setState({
          loggedIn: false
        });
      },
      registerSubmit: e => {
        e.preventDefault();
        alert("registered! Well not really");
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
      loggingIn,
      registerSubmit,
      loggingOut
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

    return (
      <div>
        <Particles className="particles" params={particlesOptions} />
        <Navigation loggedIn={loggedIn} logout={loggingOut} />
        <Logo />
        {!loggedIn ? (
          <div>
            <SignInContainer
              handleSignIn={loggingIn}
              handleSubmit={registerSubmit}
            />
          </div>
        ) : (
          <div>
            <Rank username={user.name} entries={user.entries} />
            <ImageLinkForm getImageLink={getImageLink} checkFace={checkFace} />
            {validImg ? (
              <FaceRecognition imageURL={faceURL} box={box} />
            ) : (
              <p className="noValidImg">Please insert a valid image!</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
