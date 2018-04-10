import React from "react";

// Components
import Rank from "../components/Rank";
import ImageLinkForm from "../components/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition";

// Utilities
import isImage from "../utils/isImage";

class FaceCheckContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faceURL: "",
      validImg: false,
      box: {},
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
            const { calcFaceLocation, displayFaceBox } = this.state;
            const { user, updateUser } = this.props;
            if (response) {
              fetch("http://localhost:3001/image", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: user.id
                })
              })
                .then(response => response.json(response))
                .then(user => updateUser(user));
            }
            displayFaceBox(calcFaceLocation(response));
          });
      }
    };
  }

  render() {
    const { user } = this.props;
    const { getImageLink, checkFace, faceURL, box, validImg } = this.state;
    return (
      <div>
        <Rank username={user.name} entries={user.entries} />
        <ImageLinkForm getImageLink={getImageLink} checkFace={checkFace} />
        {validImg ? (
          <FaceRecognition imageURL={faceURL} box={box} />
        ) : (
          <p className="noValidImg">Please insert a valid image!</p>
        )}
      </div>
    );
  }
}

export default FaceCheckContainer;
