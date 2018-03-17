import React from "react";
import "../styles/ImageLinkForm.scss";

const ImageLinkForm = ({ getImageLink, checkFace, box }) => {
  return (
    <div className="imageLinkFormContainer">
      <p>
        SmartBrain needs food for thought in order to automagically recognize
        your face! Insert URL here:
      </p>
      <input type="text" onChange={getImageLink} />
      <button onClick={checkFace}>Feed!</button>
    </div>
  );
};

export default ImageLinkForm;
