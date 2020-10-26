import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function StartMenu() {
  return (
    <ul className="nav flex-column">
      <li>
        <Link className="nav-link" to="/teams">Vereine</Link>
      </li>
    </ul>
  );
}
