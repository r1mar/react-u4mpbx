import React from "react";
import style from "./style.css";
import RoundQueue from "./RoundQueue";

export default function StartGame() {
  return (
    <div className="gameArea">
      <RoundQueue />
      <div className="orbit">
        <div className="planet" />
      </div>
    </div>
  );
}
