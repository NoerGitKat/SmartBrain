import React from "react";
import "../styles/Rank.scss";

const Rank = ({ username, entries }) => {
  return (
    <div className="rank">
      <p>
        {username || "random person"}, you currently have the following number
        of entries...
      </p>
      <br />
      <p>{entries}</p>
    </div>
  );
};

export default Rank;
