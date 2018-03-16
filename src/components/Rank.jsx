import React from "react";
import "../styles/Rank.scss";

const Rank = ({ username }) => {
  return (
    <div className="rank">
      <p>{username || "random person"} your current rank is...</p>
      <br />
      <p>#5</p>
    </div>
  );
};

export default Rank;
