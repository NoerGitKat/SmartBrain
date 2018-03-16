import React from "react";
import "../styles/ImageLinkForm.scss";

const ImageLinkForm = ({ getImageLink, faceURL }) => {
  return (
    <div className="imageLinkFormContainer">
      <p>
        SmartBrain needs food for thought in order to automagically recognize
        your face! Insert URL here:
      </p>
      <input type="text" onChange={getImageLink} />
      <p>this value: {faceURL}</p>
      <button>Feed!</button>
    </div>
  );
};

export default ImageLinkForm;
