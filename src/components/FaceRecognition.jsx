import React from "react";
import "../styles/FaceRecognition.scss";

const FaceRecognition = ({ imageURL, box }) => {
  const imageContainerStyle = {
    margin: "1.5em auto",
    left: "50%",
    transform: "translate(-50%, 0)",
    position: "absolute"
  };

  console.log("box", box);

  const imageStyle = {
    top: box.topRow,
    left: box.leftCol,
    right: box.rightCol,
    bottom: box.bottomRow
  };
  return (
    <div style={imageContainerStyle}>
      <img id="ImgContainer" src={imageURL} alt="Image" />
      <div className="bounding-box" style={imageStyle} />
    </div>
  );
};

export default FaceRecognition;
