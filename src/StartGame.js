import React from "react";
import style from "./style.css";

export default function StartGame() {
  return (
    <div className="gameArea">
      <div className="ship"/>
      <div className="orbit">
        <div className="planet" />
      </div>
    </div>
  );
}
