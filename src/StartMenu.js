import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function StartMenu() {
  return (
    <ul>
      <li>
        <Link to="/teams">Vereine</Link>
      </li>
    </ul>
  );
}
