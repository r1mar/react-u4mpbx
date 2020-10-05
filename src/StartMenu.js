import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function StartMenu() {
  return (
    <ul>
      <li>
        <Link to="/start-game">Neues Spiel</Link>
      </li>
    </ul>
  );
}
