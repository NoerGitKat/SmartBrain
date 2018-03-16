import React from "react";
import smartBrain from "../static/images/brain.png";
import Tilt from "react-tilt";
import "../styles/Logo.scss";

const Logo = () => {
  return (
    <div className="logo">
      <Tilt>
        <img src={smartBrain} alt="SmartBrain Logo" />
      </Tilt>
    </div>
  );
};

export default Logo;
