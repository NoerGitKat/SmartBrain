import React from "react";

const FaceRecognition = ({ imageURL, box }) => {
  const imageContainerStyle = {
    margin: "1.5em auto 0",
    width: "100%",
    textAlign: "center"
  };

  console.log("box", box);

  const imageStyle = {};
  return (
    <div style={imageContainerStyle}>
      <img src={imageURL} alt="Image" />
    </div>
  );
};

export default FaceRecognition;
