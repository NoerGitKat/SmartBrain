import React from "react";

const FaceRecognition = ({ imageURL }) => {
  const imageStyle = {
    margin: "1.5em auto 0",
    width: "100%",
    textAlign: "center"
  };
  return (
    <div style={imageStyle}>
      <img src={imageURL} alt="Image" />
    </div>
  );
};

export default FaceRecognition;
